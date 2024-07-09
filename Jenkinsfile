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
		    def mode
		    def apiAuthEndpoint='1443'
		    def apiOnboardingEndpoint='3443'
		    def apiCreateProjectEndpoint='2443'
			
                    // Docker Compose file & Credential ID based on selected environment
                    switch (params.ENVIRONMENT) {
                        case 'dev':
                            composeFile = 'docker-compose.dev.yml'
			    credentialId = 'fe_env_file'
			    serviceName = 'dev'
			    servicePort = '5000'
			    targetPort = '5000'
			    mode='test'
                            break
                        case 'qa':
                            composeFile = 'docker-compose.qa.yml'
                            credentialId = 'fe_env_qa'
			    serviceName = 'qa'
			    servicePort = '3012'
			    targetPort  = '3012'
			    mode='qa'
			    apiAuthEndpoint='1553'
                            break
                        default:
                            composeFile = 'docker-compose.yml'
                            credentialId = 'credential_id'
                    }
                    echo "${composeFile}"
                    echo "${credentialId}"
	            echo "${serviceName}"
                    echo "${servicePort}"
	            //withCredentials([file(credentialsId: credentialId, variable: 'envFile')]) 
                     sh """                  
			    sed -i "s/{SERVICE_NAME}/${serviceName}/g" docker-compose.yml
			    sed -i "s/{SERVICE_PORT}/${servicePort}/g" docker-compose.yml
       			    sed -i "s/{TARGET_PORT}/${targetPort}/g" docker-compose.yml	     	
	     		    sed -i "s/'test'/'${mode}'/g" vite.config.js
	                    sed -i "s/'1443'/${apiAuthEndpoint}/g" src/configs/api/index.js		     	   
	                    cat vite.config.js
                            docker compose build
                            docker compose up -d
                        """
                        cleanWs()
                    
                }
            }
        }
    }
}
