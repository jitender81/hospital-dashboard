pipeline {
   agent {
    label 'hosptal-agent'
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