pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = 'dockerhub-egarrage-credentials'
        DOCKER_USER = 'afroz05'
        BACKEND_IMAGE = "${DOCKER_USER}/egarrage-backend"
        FRONTEND_IMAGE = "${DOCKER_USER}/egarrage-frontend"
        TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }

                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Images') {
            steps {
                dir('backend') {
                    sh "docker build -t ${BACKEND_IMAGE}:${TAG} ."
                }

                dir('frontend') {
                    sh "docker build -t ${FRONTEND_IMAGE}:${TAG} ."
                }
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: DOCKERHUB_CREDS,
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {

                    sh '''
                    echo "$PASS" | docker login -u "$USER" --password-stdin

                    docker push '"${BACKEND_IMAGE}:${TAG}"'
                    docker push '"${FRONTEND_IMAGE}:${TAG}"'

                    docker logout
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker image prune -f || true'
        }
    }
}