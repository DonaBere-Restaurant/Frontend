pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-2'
        S3_BUCKET = 'bere-frontend'
        REPO_LINK = 'https://github.com/DonaBere-Restaurant/Frontend'
        BRANCH_NAME = 'iacdevelop'
    }

    stages {
        stage('Limpiar workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Clonar repositorio desde Git Hub') {
            steps {
                sh "git clone --branch ${BRANCH_NAME} ${REPO_LINK} Front"
            }
        }
        
        stage('Construir el proyecto') {
            steps {
                sh '''
                cd Front/RestaurantBere
                npm install
                npm run build 
                '''
            }
        }

        stage('Desplegar en S3') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: '39206086-4a1c-45d1-bedb-429efa07421c'
                ]]) {
                        sh '''
                            if [ -d "Front/RestaurantBere/dist" ]; then
                                aws s3 sync Front/RestaurantBere/dist/restaurant-bere/browser s3://${S3_BUCKET} --region ${AWS_REGION} --delete --cache-control "no-cache, no-store, must-revalidate"
                            else
                                echo "Directorio de salida no encontrado, abortando."
                                exit 1
                            fi
                        '''
                }
            }
        }
    }

    post {
        success {
            echo 'Frontend construido y desplegado exitosamente en S3.'
        }
        failure {
            echo 'Hubo un error durante el proceso de despliegue.'
        }

    }
}


