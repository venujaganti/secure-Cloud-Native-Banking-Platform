resource "aws_secretsmanager_secret" "banking" {
  name                    = "${local.name_prefix}/application"
  description             = "Application secrets for Secure Cloud-Native Banking Platform"
  kms_key_id              = aws_kms_key.main.arn
  recovery_window_in_days = 7

  tags = {
    Name = "${local.name_prefix}-application-secrets"
  }
}

resource "aws_secretsmanager_secret_version" "banking" {
  secret_id = aws_secretsmanager_secret.banking.id

  secret_string = jsonencode({
    database_host     = aws_db_instance.postgres.address
    database_port     = 5432
    database_name     = var.database_name
    database_username = var.database_username
    database_password = var.database_password

    redis_endpoint = aws_elasticache_replication_group.redis.primary_endpoint_address
    redis_port     = 6379

    jwt_secret = var.jwt_secret
  })
}
