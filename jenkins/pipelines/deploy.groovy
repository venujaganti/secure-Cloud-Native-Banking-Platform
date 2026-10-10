echo 'Starting Kubernetes deployment...'

sh '''
    set -eu

    if ! command -v kubectl >/dev/null 2>&1; then
        echo "ERROR: kubectl is not installed on the Jenkins agent."
        exit 1
    fi

    kubectl version --client
'''

sh '''
    set -eu

    kubectl apply \
        -f deployment/kubernetes/namespace/namespace.yaml

    kubectl apply \
        -f deployment/kubernetes/config/configmap.yaml

    kubectl apply \
        -f deployment/kubernetes/config/secret.yaml

    kubectl apply \
        -f deployment/kubernetes/rbac/service-accounts.yaml

    kubectl apply \
        -f deployment/kubernetes/rbac/roles.yaml

    kubectl apply \
        -f deployment/kubernetes/rbac/role-bindings.yaml

    kubectl apply \
        -f deployment/kubernetes/postgres/

    kubectl apply \
        -f deployment/kubernetes/redis/

    kubectl apply \
        -f deployment/kubernetes/kafka/

    kubectl apply \
        -f deployment/kubernetes/keycloak/
'''

def services = [
    'gateway',
    'auth',
    'user',
    'account',
    'transaction',
    'payment',
    'notification',
    'audit'
]
def deploymentNames = [gateway:'gateway', auth:'auth-service', user:'user-service', account:'account-service', transaction:'transaction-service', payment:'payment-service', notification:'notification-service', audit:'audit-service']

services.each { service ->

    echo "Deploying ${service} service"

    sh """
        set -eu

        kubectl apply \
            -f deployment/kubernetes/${service}/deployment.yaml

        kubectl apply \
            -f deployment/kubernetes/${service}/service.yaml
    """
}

sh '''
    set -eu

    kubectl apply \
        -f deployment/kubernetes/security/

    kubectl apply \
        -f deployment/kubernetes/network-policies/

    kubectl apply \
        -f deployment/kubernetes/ingress/ingress.yaml
'''

echo 'Waiting for Kubernetes deployments...'

services.each { service ->

    sh """
        set -eu

        kubectl rollout status \
            deployment/${deploymentNames[service]} \
            -n ${KUBE_NAMESPACE} \
            --timeout=180s
    """
}

echo 'Kubernetes deployment completed successfully.'