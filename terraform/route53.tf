data "aws_route53_zone" "existing" {
  count = var.domain_name != "" && !var.create_route53_zone ? 1 : 0

  name         = var.domain_name
  private_zone = false
}

resource "aws_route53_zone" "main" {
  count = var.domain_name != "" && var.create_route53_zone ? 1 : 0

  name = var.domain_name

  tags = {
    Name = "${local.name_prefix}-zone"
  }
}

locals {
  route53_zone_id = var.domain_name == "" ? null : (
    var.create_route53_zone
    ? aws_route53_zone.main[0].zone_id
    : data.aws_route53_zone.existing[0].zone_id
  )
}

resource "aws_route53_record" "app" {
  count = var.domain_name != "" ? 1 : 0

  zone_id = local.route53_zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_lb.app.dns_name
    zone_id                = aws_lb.app.zone_id
    evaluate_target_health = true
  }
}