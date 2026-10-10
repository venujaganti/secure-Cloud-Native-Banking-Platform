locals {
  name_prefix = "${var.project_name}-${var.environment}"

  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }

  public_subnet_map = {
    for index, az in var.availability_zones :
    az => var.public_subnet_cidrs[index]
  }

  private_subnet_map = {
    for index, az in var.availability_zones :
    az => var.private_subnet_cidrs[index]
  }

  database_subnet_ids = [
    for az in var.availability_zones :
    aws_subnet.private[az].id
  ]
}