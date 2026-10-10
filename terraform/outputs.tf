output "aws_region" {
  description = "AWS region."
  value       = var.aws_region
}

output "vpc_id" {
  description = "VPC ID."
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "Public subnet IDs."
  value = [
    for az in var.availability_zones :
    aws_subnet.public[az].id
  ]
}

output "private_subnet_ids" {
  description = "Private subnet IDs."
  value = [
    for az in var.availability_zones :
    aws_subnet.private[az].id
  ]
}

output "ec2_instance_id" {
  description = "Standalone application EC2 instance ID."
  value       = aws_instance.app.id
}

output "ec2_public_ip" {
  description = "Standalone application EC2 public IP."
  value       = aws_instance.app.public_ip
}

output "ec2_public_dns" {
  description = "Standalone application EC2 public DNS."
  value       = aws_instance.app.public_dns
}

output "ssh_key_name" {
  description = "AWS EC2 key pair name."
  value       = aws_key_pair.main.key_name
}

output "pem_key_path" {
  description = "Generated PEM private-key path."
  value       = local_sensitive_file.pem.filename
}

output "alb_dns_name" {
  description = "Application Load Balancer DNS name."
  value       = aws_lb.app.dns_name
}

output "application_url" {
  description = "Application URL through ALB."
  value       = "http://${aws_lb.app.dns_name}"
}

output "autoscaling_group_name" {
  description = "Application Auto Scaling Group."
  value       = aws_autoscaling_group.app.name
}

output "eks_cluster_name" {
  description = "EKS cluster name."
  value       = aws_eks_cluster.main.name
}

output "eks_cluster_endpoint" {
  description = "EKS cluster endpoint."
  value       = aws_eks_cluster.main.endpoint
}

output "eks_cluster_version" {
  description = "EKS Kubernetes version."
  value       = aws_eks_cluster.main.version
}

output "eks_node_group_name" {
  description = "EKS node group name."
  value       = aws_eks_node_group.main.node_group_name
}

output "rds_endpoint" {
  description = "RDS PostgreSQL endpoint."
  value       = aws_db_instance.postgres.address
}

output "rds_port" {
  description = "RDS PostgreSQL port."
  value       = aws_db_instance.postgres.port
}

output "redis_endpoint" {
  description = "ElastiCache Redis endpoint."
  value       = aws_elasticache_replication_group.redis.primary_endpoint_address
}

output "redis_port" {
  description = "ElastiCache Redis port."
  value       = 6379
}

output "kms_key_arn" {
  description = "Main KMS key ARN."
  value       = aws_kms_key.main.arn
}

output "secrets_manager_arn" {
  description = "Secrets Manager secret ARN."
  value       = aws_secretsmanager_secret.banking.arn
}

output "route53_record" {
  description = "Configured Route 53 application domain."
  value       = var.domain_name == "" ? null : var.domain_name
}