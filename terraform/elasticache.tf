resource "aws_elasticache_subnet_group" "redis" {
  name = "${local.name_prefix}-redis-subnet-group"

  subnet_ids = [
    for az in var.availability_zones :
    aws_subnet.private[az].id
  ]

  tags = {
    Name = "${local.name_prefix}-redis-subnet-group"
  }
}

resource "aws_elasticache_replication_group" "redis" {
  replication_group_id = "${local.name_prefix}-redis"
  description          = "Redis cache for Secure Cloud-Native Banking Platform"

  engine         = "redis"
  node_type      = var.redis_node_type
  num_cache_clusters = 1

  port = 6379

  subnet_group_name = aws_elasticache_subnet_group.redis.name

  security_group_ids = [
    aws_security_group.redis.id
  ]

  at_rest_encryption_enabled = true
  transit_encryption_enabled = true

  automatic_failover_enabled = false
  multi_az_enabled           = false

  snapshot_retention_limit = 1
  snapshot_window          = "02:00-03:00"

  apply_immediately = true

  tags = {
    Name = "${local.name_prefix}-redis"
  }
}