pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        skipDefaultCheckout(false)

        buildDiscarder(
            logRotator(
                numToKeepStr: '20',
                artifactNumToKeepStr: '10'
            )
        )

        timeout(time: 60, unit: 'MINUTES')
    }

    environment {
        APP_NAME = 'secure-cloud-native-banking'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        MAVEN_OPTS = '-Dmaven.repo.local=.m2/repository'

        KUBE_NAMESPACE = 'banking'
        KUBE_CONTEXT = 'secure-cloud-native-banking'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    load 'jenkins/pipelines/build.groovy'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    load 'jenkins/pipelines/test.groovy'
                }
            }
        }

        stage('Security Scan') {
            steps {
                script {
                    load 'jenkins/pipelines/security.groovy'
                }
            }
        }

        stage('Container Build') {
            steps {
                script {
                    load 'jenkins/pipelines/container.groovy'
                }
            }
        }

        stage('Deploy') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }

            steps {
                script {
                    load 'jenkins/pipelines/deploy.groovy'
                }
            }
        }
    }

    post {

        success {
            echo '=========================================='
            echo 'Jenkins pipeline completed successfully.'
            echo '=========================================='
        }

        failure {
            echo '=========================================='
            echo 'Jenkins pipeline failed.'
            echo 'Check the failed stage and Jenkins console log.'
            echo '=========================================='
        }

        unstable {
            echo 'Jenkins pipeline completed with unstable status.'
        }

        always {
            junit(
                testResults: '**/target/surefire-reports/*.xml',
                allowEmptyResults: true
            )

            archiveArtifacts(
                artifacts: '**/target/*.jar',
                allowEmptyArchive: true
            )
        }
    }
}