resource "aws_eks_node_group" "main" {
  cluster_name = aws_eks_cluster.main.name
  node_group_name = "${local.name_prefix}-nodes"

  node_role_arn = aws_iam_role.eks_node.arn

  subnet_ids = [
    for az in var.availability_zones :
    aws_subnet.private[az].id
  ]

  instance_types = [
    var.eks_node_instance_type
  ]

  disk_size = var.eks_node_disk_size

  capacity_type = "ON_DEMAND"

  scaling_config {
    desired_size = var.eks_desired_nodes
    min_size     = var.eks_min_nodes
    max_size     = var.eks_max_nodes
  }

  update_config {
    max_unavailable = 1
  }

  labels = {
    role        = "banking-worker"
    environment = var.environment
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_worker_node,
    aws_iam_role_policy_attachment.eks_cni,
    aws_iam_role_policy_attachment.eks_ecr_readonly
  ]

  tags = {
    Name = "${local.name_prefix}-eks-node"
  }
}