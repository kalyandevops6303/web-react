pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'qa', 'prod'], description: 'Select deployment environment')
    }

    stages {
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    def composeFile
                    def credentialId
		    def serviceName
		    def servicePort
		    def targetPort

                    // Docker Compose file & Credential ID based on selected environment
                    switch (params.ENVIRONMENT) {
                        case 'dev':
                            composeFile = 'docker-compose.dev.yml'
			    envFile     = '.env.test.local'
                            credentialId = 'fe_env_file'
			    serviceName = 'dev'
			    servicePort = '5000'
			    targetPort = '5000'
                            break
                        case 'qa':
                            composeFile = 'docker-compose.qa.yml'
			    envFile  = '.env.qa.local'
                            credentialId = 'fe_env_qa'
			    serviceName = 'qa'
			    servicePort = '3012'
			    targetPort  = '3012'
                            break
                        default:
                            composeFile = 'docker-compose.yml'
                            credentialId = 'credential_id'
                    }
                    echo "${composeFile}"
                    echo "${credentialId}"
	            echo "${serviceName}"
                    echo "${servicePort}"
		    echo "${envFile}"
                   withCredentials([file(credentialsId: credentialId, variable: 'envFile')]) {
                        sh """
                            chmod +w \$envFile
                            cp \$envFile .env                         
			    sed -i "s/{SERVICE_NAME}/${serviceName}/g" docker-compose.yml
			    sed -i "s/{SERVICE_PORT}/${servicePort}/g" docker-compose.yml
       			    sed -i "s/{TARGET_PORT}/${targetPort}/g" docker-compose.yml
                            docker compose --env-file ${envFile} build
                            docker compose up -d
                        """
                        cleanWs()
                    }
                }
            }
        }
    }
}
