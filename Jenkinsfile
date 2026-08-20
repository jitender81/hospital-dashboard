pipeline {
   agent {
    label 'hospital-agent'
   }

    stages {

        stage('Checkout') {
            steps {
                echo 'Hospital Dashboard CI/CD started!'
            }
        }

        stage('Frontend Build') {
            steps {
                   dir('hospital-frontend') {
                    sh '''
                        echo "VITE_API_URL=/api" > .env
                        npm ci
                        npm run build
                    '''
               }
            }
        }

        stage('Backend Build') {
            steps {
                dir('hospital-backend') {
                  sh 'python3 -m venv venv'
                  sh 'venv/bin/pip install -r requirements.txt'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build --build-arg VITE_API_URL=/api -t hospital-frontend ./hospital-frontend'
                sh 'docker build -t hospital-backend ./hospital-backend'
            }
        }
        stage('DockerHub Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'DockerhubCred',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {

                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

                        docker tag hospital-frontend:latest jiender/hospital-dashboard-frontend:latest
                        docker tag hospital-backend:latest jiender/hospital-dashboard-backend:latest

                        docker push jiender/hospital-dashboard-frontend:latest
                        docker push jiender/hospital-dashboard-backend:latest

                        docker logout
                    '''
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Test stage will be added next.'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying Hospital Dashboard...'

                    sh '''
                        docker pull jiender/hospital-dashboard-frontend:latest
                        docker pull jiender/hospital-dashboard-backend:latest

                        docker stop hospital-frontend || true
                        docker rm hospital-frontend || true

                        docker stop hospital-backend || true
                        docker rm hospital-backend || true

                        docker run -d \
                            --name hospital-frontend \
                            -p 3000:80 \
                            --restart unless-stopped \
                            jiender/hospital-dashboard-frontend:latest

                        docker run -d \
                            --name hospital-backend \
                            -p 5000:8000 \
                            --restart unless-stopped \
                            jiender/hospital-dashboard-backend:latest
                    '''
                }
            }
        }
    

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}