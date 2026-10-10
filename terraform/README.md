# Phase 8 — Terraform + AWS

This directory contains the AWS infrastructure for the
Secure Cloud-Native Banking Platform.

## AWS Region

Default region:

    ap-south-1

## Infrastructure

The Terraform configuration creates:

- VPC
- Internet Gateway
- Public subnets
- Private subnets
- Public route table
- Private route tables
- NAT Gateway
- Elastic IP
- Security Groups
- IAM roles
- EC2 application server
- Application Load Balancer
- Auto Scaling Group
- Amazon EKS
- EKS managed node group
- Amazon RDS PostgreSQL
- Amazon ElastiCache Redis
- AWS KMS
- AWS Secrets Manager
- Amazon CloudWatch
- Optional Route 53 DNS

## EC2

Instance type:

    m7i-flex.large

Storage:

    40 GB gp3

The instance uses an automatically generated RSA SSH key.

Terraform creates:

    pem.key

The private key is ignored by Git.

## EKS

Kubernetes version:

    1.36

Worker node type:

    m7i-flex.large

Worker node storage:

    40 GB

Default node configuration:

    Minimum:  1
    Desired:  2
    Maximum:  3

## Database

Engine:

    PostgreSQL 16

Default instance:

    db.t3.micro

Default storage:

    20 GB gp3

The RDS instance is private and is accessible only through
the configured security group.

## Redis

Engine:

    Redis

Default node:

    cache.t3.micro

Redis is deployed privately inside the VPC.

## Key Management

AWS KMS is used for encryption of:

- RDS
- Secrets Manager
- CloudWatch log groups

## Secrets

Application secrets are stored in:

    AWS Secrets Manager

Do not commit:

    terraform.tfvars
    pem.key
    *.tfstate

## Route 53

Route 53 is optional.

Leave:

    domain_name = ""

to disable Route 53 application records.

If a domain is supplied, the configuration can create or
use a public hosted zone and point the domain to the ALB.

## SSH

The generated key is:

    terraform/pem.key

Use the EC2 public IP from Terraform output.

Example:

    ssh -i pem.key ec2-user@PUBLIC_IP

Restrict `ec2_ssh_cidr` to your own public IP before deployment.

## Terraform workflow

Initialize:

    terraform init

Format:

    terraform fmt -recursive

Validate:

    terraform validate

Review:

    terraform plan -var-file="terraform.tfvars"

Apply:

    terraform apply -var-file="terraform.tfvars"

Show outputs:

    terraform output

## EKS access

After the cluster is created, configure kubectl using:

    aws eks update-kubeconfig \
      --region ap-south-1 \
      --name secure-banking-dev-eks

Verify:

    kubectl get nodes

## Important

This infrastructure creates billable AWS resources.

Especially:

- m7i-flex EC2
- NAT Gateway
- ALB
- EKS
- EKS worker nodes
- RDS
- ElastiCache
- CloudWatch
- KMS
- public IPv4 resources

Destroy the infrastructure when it is no longer required:

    terraform destroy -var-file="terraform.tfvars"

Always review the Terraform plan before applying it.