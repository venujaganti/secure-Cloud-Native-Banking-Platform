echo 'Starting Docker image build...'
sh '''
    set -eu
    command -v docker >/dev/null 2>&1 || { echo "ERROR: Docker is not installed on the Jenkins agent."; exit 1; }
    docker --version
'''
def services = ['gateway', 'auth', 'user', 'account', 'transaction', 'payment', 'notification', 'audit']
services.each { service ->
    def image = "banking/banking-${service}:1.0.0"
    def dockerfile = "deployment/docker/Dockerfile.${service}"
    if (!fileExists(dockerfile)) { error("Dockerfile not found: ${dockerfile}") }
    sh "docker build --file '${dockerfile}' --tag '${image}' ."
}
echo 'All Docker images built successfully.'
