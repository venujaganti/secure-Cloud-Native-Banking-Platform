echo 'Starting automated tests...'

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

    echo "Testing ${servicePath}"

    dir(servicePath) {
        sh '''
            set -eu

            mvn -B test
        '''
    }
}

echo 'All automated tests completed.'