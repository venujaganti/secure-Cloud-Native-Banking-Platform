resource "aws_cloudwatch_log_group" "eks" {
  name              = "/aws/eks/${local.name_prefix}/cluster"
  retention_in_days = 30

  kms_key_id = aws_kms_key.main.arn

  tags = {
    Name = "${local.name_prefix}-eks-logs"
  }
}

resource "aws_cloudwatch_log_group" "application" {
  name              = "/aws/ec2/${local.name_prefix}/application"
  retention_in_days = 30

  kms_key_id = aws_kms_key.main.arn

  tags = {
    Name = "${local.name_prefix}-application-logs"
  }
}

resource "aws_cloudwatch_metric_alarm" "ec2_cpu" {
  alarm_name          = "${local.name_prefix}-ec2-cpu"
  alarm_description   = "EC2 CPU utilization alarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 300
  statistic           = "Average"
  threshold           = 80

  dimensions = {
    InstanceId = aws_instance.app.id
  }

  treat_missing_data = "notBreaching"
}

resource "aws_cloudwatch_metric_alarm" "alb_5xx" {
  alarm_name          = "${local.name_prefix}-alb-5xx"
  alarm_description   = "ALB HTTP 5xx error alarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "HTTPCode_ELB_5XX_Count"
  namespace           = "AWS/ApplicationELB"
  period              = 300
  statistic           = "Sum"
  threshold           = 5

  dimensions = {
    LoadBalancer = aws_lb.app.arn_suffix
  }

  treat_missing_data = "notBreaching"
}