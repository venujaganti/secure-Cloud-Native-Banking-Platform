variable "aws_region" {
  description = "AWS region."
  type        = string
  default     = "ap-south-1"
}

variable "project_name" {
  description = "Project name."
  type        = string
  default     = "secure-banking"
}

variable "environment" {
  description = "Deployment environment."
  type        = string
  default     = "dev"
}

variable "vpc_cidr" {
  description = "VPC CIDR."
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "Availability zones."
  type        = list(string)

  default = [
    "ap-south-1a",
    "ap-south-1b"
  ]
}

variable "public_subnet_cidrs" {
  description = "Public subnet CIDRs."
  type        = list(string)

  default = [
    "10.0.1.0/24",
    "10.0.2.0/24"
  ]
}

variable "private_subnet_cidrs" {
  description = "Private subnet CIDRs."
  type        = list(string)

  default = [
    "10.0.11.0/24",
    "10.0.12.0/24"
  ]
}

variable "ec2_instance_type" {
  description = "EC2 instance type."
  type        = string
  default     = "m7i-flex.large"
}

variable "ec2_root_volume_size" {
  description = "EC2 root volume size in GB."
  type        = number
  default     = 40
}

variable "ec2_ssh_cidr" {
  description = "CIDR allowed to SSH to EC2. Change this to your public IP/32."
  type        = string
  default     = "0.0.0.0/0"
}

variable "app_repository_url" {
  description = "Git repository containing the banking platform."
  type        = string
  default     = "https://github.com/venujaganti/secure-cloud-native-banking-platform.git"
}

variable "app_repository_branch" {
  description = "Git branch for application deployment."
  type        = string
  default     = "main"
}

variable "app_port" {
  description = "Gateway application port."
  type        = number
  default     = 8080
}

variable "eks_version" {
  description = "EKS Kubernetes version."
  type        = string
  default     = "1.36"
}

variable "eks_node_instance_type" {
  description = "EKS node instance type."
  type        = string
  default     = "m7i-flex.large"
}

variable "eks_node_disk_size" {
  description = "EKS node root disk size."
  type        = number
  default     = 40
}

variable "eks_desired_nodes" {
  description = "Desired EKS node count."
  type        = number
  default     = 2
}

variable "eks_min_nodes" {
  description = "Minimum EKS node count."
  type        = number
  default     = 1
}

variable "eks_max_nodes" {
  description = "Maximum EKS node count."
  type        = number
  default     = 3
}

variable "rds_instance_class" {
  description = "RDS instance class."
  type        = string
  default     = "db.t3.micro"
}

variable "rds_engine_version" {
  description = "PostgreSQL engine version."
  type        = string
  default     = "16"
}

variable "rds_storage_size" {
  description = "RDS storage size in GB."
  type        = number
  default     = 20
}

variable "database_name" {
  description = "PostgreSQL database name."
  type        = string
  default     = "banking"
}

variable "database_username" {
  description = "PostgreSQL master username."
  type        = string
  default     = "bankingadmin"
}

variable "database_password" {
  description = "PostgreSQL master password."
  type        = string
  sensitive   = true

  validation {
    condition     = length(var.database_password) >= 12
    error_message = "database_password must contain at least 12 characters."
  }
}

variable "redis_node_type" {
  description = "ElastiCache Redis node type."
  type        = string
  default     = "cache.t3.micro"
}

variable "domain_name" {
  description = "Optional Route 53 domain name. Leave empty to skip DNS record creation."
  type        = string
  default     = ""
}

variable "create_route53_zone" {
  description = "Create a Route 53 hosted zone when domain_name is provided."
  type        = bool
  default     = false
}

variable "enable_deletion_protection" {
  description = "Enable ALB deletion protection."
  type        = bool
  default     = false
}

variable "jwt_secret" {
  description = "JWT signing secret. Use a random value of at least 32 characters."
  type        = string
  sensitive   = true

  validation {
    condition     = length(var.jwt_secret) >= 32
    error_message = "jwt_secret must contain at least 32 characters."
  }
}
