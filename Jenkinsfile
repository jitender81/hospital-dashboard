pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Hospital Dashboard CI/CD started!'
            }
        }

        stage('Frontend Build') {
            steps {
                   dir('hospital-frontend') {
                    bat 'npm ci'
                    bat 'npm run build'
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