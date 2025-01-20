pipeline {
    agent any

    options {
        disableConcurrentBuilds()
    }
    

    environment {
        CLIENT_ID = credentials('env_client_id')
        CLIENT_SECRET = credentials('env_client_secret')
        TENANT_ID = credentials('env_tenant_id')
        SITENAME = 'Trumio-env'
        SITE_ID = 'trumio.sharepoint.com,0702a39f-d261-4be5-b3d4-76525995bc85,b3578a0e-9132-47da-bf61-cc572bf23ced'
    }

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['tru-dev', 'tru-qa', 'qa', 'dev'], description: 'Select deployment environment')
        choice(name: 'DEPENDENCY', choices: ['No', 'Yes'], description: 'Force install dependencies')
    }

    stages {
        stage('Initializing branch') {
            steps {
                script {
                    // Determine which branch to check out based on the environment
                    def branchToCheckout = params.BRANCH // Default to user-selected branch
                    if (params.ENVIRONMENT == 'tru-qa') {
                        branchToCheckout = 'origin/tru-dev' // Override for tru-qa environment
                    }
                    echo "Branch selected: ${branchToCheckout}"
                    env.SELECTED_BRANCH = branchToCheckout 
                }
            }
        }

        stage('Checkout') {
            steps {
                script {
                    try {
                        echo "Checking out branch: ${env.SELECTED_BRANCH} for environment: ${params.ENVIRONMENT}"
                        checkout([$class: 'GitSCM', 
                            branches: [[name: "${env.SELECTED_BRANCH}"]],
                            userRemoteConfigs: [[url: 'git@github.com:trumio/trumio-web-react.git', credentialsId: 'github_access']]
                        ])
                    } catch (Exception e) {
                        error "Failed to checkout branch ${env.SELECTED_BRANCH}. Error: ${e.message}"
                    }
                }
            }
        }

        stage('Get SharePoint Access Token') {
            steps {
                script {
                    def filename
                    switch (params.ENVIRONMENT) {
                        case 'dev':
                            filename = '/Dev/env-dev.txt'
                            break
                        case 'qa':
                            filename = '/QA/env-qa.txt'
                            break
                        case 'qa-auto':
                            filename = '/QA-auto/env-qa-auto.txt'
                            break
                        case 'tru-dev':
                            filename = '/Dev/env-tru-dev.txt'
                            break
			case 'tru-qa':
                            filename = '/QA/env-tru-qa.txt'
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
                        "https://graph.microsoft.com/v1.0/sites/${env.SITE_ID}/drive/root:${env.FILENAME}"
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
                    sh "curl -L '${env.DOWNLOAD_URL}' --output env-${params.ENVIRONMENT}.txt"
                }
            }
        }

        stage('Archive the File') {
            steps {
                archiveArtifacts artifacts: "env-${params.ENVIRONMENT}.txt", allowEmptyArchive: false
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
                        case 'tru-dev':
                            composeFile = 'docker-compose.tru-dev.yml'
                            serviceName = 'tru-dev'
                            servicePort = '4112'
                            targetPort = '4112'
			    mode='trudev'
                            break
                        case 'tru-qa':
                            composeFile = 'docker-compose.tru-qa.yml'
                            serviceName = 'tru-qa'
                            servicePort = '9112'
                            targetPort = '9112'
			    mode='truqa'
                            break
                        default:
                            composeFile = 'docker-compose.yml'

                    }

                    echo composefile = "${composeFile}"
                    echo servicename = "${serviceName}"
                    echo serviceport = "${servicePort}"
                    echo targetport  = "${targetPort}"

	            def buildCommand = params.DEPENDENCY == 'Yes' ? 'docker compose build --no-cache' : 'docker compose build'


                    // Use the downloaded environment file for Docker Compose
                    sh """
			    sed -i "s/{SERVICE_NAME}/${serviceName}/g" docker-compose.yml
			    sed -i "s/{SERVICE_PORT}/${servicePort}/g" docker-compose.yml
       			    sed -i "s/{TARGET_PORT}/${targetPort}/g" docker-compose.yml
	             	    sed -i "s/5000/${targetPort}/g" Dockerfile
	     		    sed -i "s/'test'/'${mode}'/g" vite.config.ts
                            ${buildCommand}
                            docker compose up -d
                     """
                    cleanWs()
                }
            }
        }
    }
  post {
    always {
        script {
            def paramsSubtitle = "Build with parameters:"
            def paramsSummary = """
                JOB_NAME=${env.JOB_NAME}
                ENVIRONMENT=${params.ENVIRONMENT}
                BRANCH=${params.BRANCH}
            """.stripIndent().trim()
 
            currentBuild.description = "${paramsSubtitle}\n${paramsSummary}"
        }
     }
  }
}
