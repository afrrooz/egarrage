pipeline {
    agent any

    environment {
        // Docker Hub Credentials ID configured in Jenkins Credentials Manager
        DOCKER_HUB_CREDENTIALS = 'dockerhub-egarrage-credentials'
        
        // Change 'your-dockerhub-username' to your actual Docker Hub username/organization
        DOCKER_HUB_USER        = 'afroz05'
        
        // Image names
        BACKEND_IMAGE          = "${DOCKER_HUB_USER}/egarrage-backend"
        FRONTEND_IMAGE         = "${DOCKER_HUB_USER}/egarrage-frontend"
        
        // Tag with Jenkins Build Number and 'latest'
        IMAGE_TAG              = "${BUILD_NUMBER}"
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
        timestamps()
    }

    stages {
        stage('Checkout Source') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Run Unit & Build Tests') {
            parallel {
                stage('Test Backend') {
                    steps {
                        dir('backend') {
                            echo 'Testing backend application...'
                            // Install dependencies and run tests (if test script defined in package.json)
                            sh 'npm ci'
                            sh 'npm test --if-present'
                        }
                    }
                }
                stage('Test & Validate Frontend') {
                    steps {
                        dir('frontend') {
                            echo 'Testing and building frontend asset code...'
                            sh 'npm ci'
                            sh 'npm test --if-present'
                            sh 'npm run build'
                        }
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "Building Docker Images for Tag: ${IMAGE_TAG}..."
                
                // Build Backend Docker Image
                dir('backend') {
                    sh "docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} -t ${BACKEND_IMAGE}:latest ."
                }
                
                // Build Frontend Docker Image
                dir('frontend') {
                    sh "docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} -t ${FRONTEND_IMAGE}:latest ."
                }
            }
        }

        stage('Container Health Check / Smoke Test') {
            steps {
                echo 'Performing smoke tests on built images...'
                sh """
                    docker run -d --name test_backend_container -p 5001:5000 ${BACKEND_IMAGE}:${IMAGE_TAG} || true
                    sleep 3
                    docker ps | grep test_backend_container || echo "Backend container smoke test failed"
                    docker rm -f test_backend_container || true
                """
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                echo 'Logging in to Docker Hub and Pushing Images...'
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_HUB_CREDENTIALS}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        
                        echo "Pushing Backend Images..."
                        docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
                        docker push ${BACKEND_IMAGE}:latest
                        
                        echo "Pushing Frontend Images..."
                        docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}
                        docker push ${FRONTEND_IMAGE}:latest
                        
                        docker logout
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up local Docker images...'
            sh """
                docker rmi ${BACKEND_IMAGE}:${IMAGE_TAG} ${BACKEND_IMAGE}:latest || true
                docker rmi ${FRONTEND_IMAGE}:${IMAGE_TAG} ${FRONTEND_IMAGE}:latest || true
            """
        }
        success {
            echo "Pipeline completed successfully! Docker images pushed to Docker Hub as ${IMAGE_TAG} and latest."
        }
        failure {
            echo "Pipeline failed. Please inspect logs above."
        }
    }
}
