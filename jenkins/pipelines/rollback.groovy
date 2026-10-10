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

echo 'Starting Kubernetes rollback...'

services.each { service ->

    echo "Rolling back ${service}"

    sh """
        set -eu

        kubectl rollout undo \
            deployment/${service} \
            -n ${KUBE_NAMESPACE}

        kubectl rollout status \
            deployment/${service} \
            -n ${KUBE_NAMESPACE} \
            --timeout=180s
    """
}

echo 'Kubernetes rollback completed successfully.'