pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Hospital Dashboard CI/CD started!'
            }
        }

        stage('Build') {
            steps {
                echo 'Build stage will be added next.'
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