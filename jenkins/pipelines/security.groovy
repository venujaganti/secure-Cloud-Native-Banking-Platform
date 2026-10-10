echo 'Starting security validation...'

stage('Secret Pattern Scan') {
    sh '''
        set -eu
        echo "Scanning source tree for obvious secret patterns..."

        if grep -RInE             --exclude-dir=.git             --exclude='*.lock'             --exclude='*.log'             --exclude='pom.xml'             '(BEGIN (RSA|OPENSSH) PRIVATE KEY|aws_access_key_id|aws_secret_access_key)'             .; then
            echo "Potential secret detected."
            exit 1
        fi

        echo "No obvious private-key or AWS credential patterns detected."
    '''
}

stage('Trivy Filesystem Scan') {
    sh '''
        set -eu

        if ! command -v trivy >/dev/null 2>&1; then
            echo "ERROR: Trivy is not installed on this Jenkins agent."
            exit 1
        fi

        trivy fs --config security/trivy/trivy.yaml .

        trivy config --config security/trivy/trivy.yaml deployment/kubernetes
    '''
}

stage('Maven Dependency Verification') {
    def services = [
        'services/api-gateway',
        'services/auth-service',
        'services/user-service',
        'services/account-service',
        'services/transaction-service',
        'services/payment-service',
        'services/notification-service',
        'services/audit-service'
    ]

    services.each { servicePath ->
        dir(servicePath) {
            sh '''
                set -eu
                mvn -B -ntp -DskipTests dependency:tree
            '''
        }
    }
}

echo 'Security validation completed.'


stage('SonarQube Analysis') {
    withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
        sh """
            set -eu
            test -n "${SONAR_HOST_URL:-}" || { echo "SONAR_HOST_URL is not configured on the Jenkins agent."; exit 1; }
            mvn -B -ntp sonar:sonar -Dsonar.host.url="$SONAR_HOST_URL" -Dsonar.token="$SONAR_TOKEN"
        """
    }
}
