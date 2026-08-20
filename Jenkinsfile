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
                    sh 'npm ci'
                    sh 'npm run build'
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

        stage('Test') {
            steps {
                echo 'Test stage will be added next.'
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