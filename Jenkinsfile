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
                            credentialId = 'user_service_env'
			    serviceName = 'dev'
			    servicePort = '5000'
			    targetPort = '5000'
                            break
                        case 'qa':
                            composeFile = 'docker-compose.qa.yml'
                            credentialId = 'qa_env'
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
                    withCredentials([file(credentialsId: credentialId, variable: 'envFile')]) {
                        sh """
			    echo ${servicePort}
                            chmod +w \$envFile
                            cp \$envFile .env                         
			    sed -i "s/{SERVICE_NAME}/${serviceName}/g" docker-compose.yml
			    sed -i "s/{SERVICE_PORT}/${servicePort}/g" docker-compose.yml
       			    sed -i "s/{TARGET_PORT}/${targetPort}/g" docker-compose.yml
                            docker compose build
                            docker compose up -d
                        """
                        cleanWs()
                    }
                }
            }
        }
    }
}
