pipeline {
    agent any
    
    stages {
        // stage('checkout'){
        //     steps{
        //         checkout scm
        //     }
        // }
        stage('Build') {
            steps {
                
                
                withCredentials([file(credentialsId: 'user_service_env', variable: 'myenvfile')]) {
                    
                        sh "pwd"
                        sh "ls -la"
                    
                        sh "cp $myenvfile .env"

                        sh "docker compose build"

                        sh 'docker compose up -d'


                        cleanWs()


                }
            }
        }
    }
}
