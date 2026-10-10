# DevSecOps Security

This directory contains the security configuration and scanning components
for the Secure Cloud-Native Banking Platform.

## Security Tools

The platform uses multiple security layers:

- SonarQube - Static Application Security Testing (SAST)
- Trivy - Container and filesystem vulnerability scanning
- Gitleaks - Secret and credential detection
- Semgrep - Static code analysis
- OWASP Dependency-Check - Dependency vulnerability analysis
- Kubernetes security policies
- Kubernetes NetworkPolicy
- Kubernetes RBAC
- Kubernetes security contexts

## Security Scanning

The security pipeline performs:

1. Source code analysis
2. Secret detection
3. Dependency vulnerability scanning
4. Filesystem vulnerability scanning
5. Container image scanning
6. Kubernetes security validation

## Security Principles

The project follows:

- Least privilege
- Defense in depth
- Secure-by-default configuration
- Non-root containers
- Read-only filesystems where possible
- Dropped Linux capabilities
- Kubernetes RBAC
- Kubernetes NetworkPolicies
- Secret management
- Dependency vulnerability management
- Container vulnerability scanning
- Static application security testing

## Security Directory

### SonarQube

Contains SonarQube project configuration.

### Trivy

Contains Trivy scanning configuration and generated reports.

### Gitleaks

Contains secret scanning rules and configuration.

### Semgrep

Contains static analysis rules.

### Dependency Check

Contains OWASP Dependency-Check configuration.

### Policies

Contains Kubernetes security policies.

### Scripts

Contains local security scanning scripts.

## Running Security Scans

From the project root:

```bash
bash security/scripts/security-scan.sh