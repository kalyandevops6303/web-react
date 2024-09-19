pipeline {
    agent any

    environment {
        CLIENT_ID = credentials('env_client_id')
        CLIENT_SECRET = credentials('env_client_secret')
        TENANT_ID = credentials('env_tenant_id')
        SITENAME = 'Trumio-env'
        SITE_ID = 'trumio.sharepoint.com,0702a39f-d261-4be5-b3d4-76525995bc85,b3578a0e-9132-47da-bf61-cc572bf23ced'
    }

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'qa', 'qa-auto'], description: 'Select deployment environment')
    }

    stages {
        stage('Get SharePoint Access Token') {
            steps {
                script {
                    def filename
                    switch (params.ENVIRONMENT) {
                        case 'dev':
                            filename = 'env-dev.txt'
                            break
                        case 'qa':
                            filename = 'env-qa.txt'
                            break
                        case 'qa-auto':
                            filename = 'env-qa-auto.txt'
                            break
                        default:
                            error("Unknown environment: ${params.ENVIRONMENT}")
                    }
                    env.FILENAME = filename
                    def response = sh(script: """
                        curl -X POST -H "Content-Type: application/x-www-form-urlencoded" \
                        -d "client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials&resource=https://graph.microsoft.com" \
                        "https://login.microsoftonline.com/${TENANT_ID}/oauth2/token"
                    """, returnStdout: true).trim()
                    env.TOKEN = sh(script: "echo '${response}' | jq -r '.access_token'", returnStdout: true).trim()
                }
            }
        }

        stage('Fetch Download URL from SharePoint') {
            steps {
                script {
                    def fileResponse = sh(script: """
                        curl -H "Authorization: Bearer ${env.TOKEN}" \
                        "https://graph.microsoft.com/v1.0/sites/${env.SITE_ID}/drive/root:/${env.FILENAME}"
                    """, returnStdout: true).trim()
                    env.DOWNLOAD_URL = sh(script: "echo '${fileResponse}' | jq -r '.\"@microsoft.graph.downloadUrl\"'", returnStdout: true).trim()
                }
            }
        }

        stage('Display Download URL') {
            steps {
                echo "Download URL: ${env.DOWNLOAD_URL}"
            }
        }

        stage('Download File from SharePoint') {
            steps {
                script {
                    if (!env.DOWNLOAD_URL) {
                        error("Error: Download URL is empty")
                    }
                    sh "curl -L '${env.DOWNLOAD_URL}' --output ${env.FILENAME}"
                }
            }
        }

        stage('Archive the File') {
            steps {
                archiveArtifacts artifacts: "${env.FILENAME}", allowEmptyArchive: false
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    def composeFile
                    def serviceName
                    def servicePort
                    def targetPort
		    def mode

                    switch (params.ENVIRONMENT) {
                        case 'dev':
                            composeFile = 'docker-compose.dev.yml'
                            serviceName = 'dev'
                            servicePort = '5000'
                            targetPort = '5000'
 			    mode='test'
                            break
                        case 'qa':
                            composeFile = 'docker-compose.qa.yml'
                            serviceName = 'qa'
                            servicePort = '9012'
                            targetPort = '9012'
			    mode='qa'
                            break
                        case 'qa-auto':
                            composeFile = 'docker-compose.qa-auto.yml'
                            serviceName = 'qa-auto'
                            servicePort = '7012'
                            targetPort = '7012'
			    mode='qa-auto'
                            break
                        default:
                            composeFile = 'docker-compose.yml'

                    }

                    echo composefile = "${composeFile}"
                    echo servicename = "${serviceName}"
                    echo serviceport = "${servicePort}"
                    echo targetport  = "${targetPort}"
                    //echo envfile = "${env.FILENAME}"

                    // Use the downloaded environment file for Docker Compose
                    sh """
			    sed -i "s/{SERVICE_NAME}/${serviceName}/g" docker-compose.yml
			    sed -i "s/{SERVICE_PORT}/${servicePort}/g" docker-compose.yml
       			    sed -i "s/{TARGET_PORT}/${targetPort}/g" docker-compose.yml
	             	    sed -i "s/5000/${targetPort}/g" Dockerfile
	     		    sed -i "s/'test'/'${mode}'/g" vite.config.js
                            docker compose build
                            docker compose up -d
                     """
                    cleanWs()
                }
            }
        }
    }
}
