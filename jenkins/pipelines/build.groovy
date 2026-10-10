echo 'Starting Maven build...'

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

    echo "Building ${servicePath}"

    dir(servicePath) {
        sh '''
            set -eu

            mvn -B \
              -DskipTests \
              -Dmaven.test.skip=true \
              clean package
        '''
    }
}

echo 'Maven build completed successfully.'