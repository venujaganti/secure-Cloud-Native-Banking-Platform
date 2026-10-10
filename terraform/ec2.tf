data "aws_ami" "amazon_linux" {
  most_recent = true

  owners = [
    "amazon"
  ]

  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }

  filter {
    name   = "state"
    values = ["available"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
}

resource "tls_private_key" "ssh" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "main" {
  key_name   = "${local.name_prefix}-pem-key"
  public_key = tls_private_key.ssh.public_key_openssh

  tags = {
    Name = "${local.name_prefix}-pem-key"
  }
}

resource "local_sensitive_file" "pem" {
  filename        = "${path.module}/pem.key"
  content         = tls_private_key.ssh.private_key_pem
  file_permission = "0600"
}

resource "aws_instance" "app" {
  ami                         = data.aws_ami.amazon_linux.id
  instance_type               = var.ec2_instance_type
  subnet_id                   = aws_subnet.public[var.availability_zones[0]].id
  vpc_security_group_ids      = [aws_security_group.app.id]
  key_name                    = aws_key_pair.main.key_name
  iam_instance_profile        = aws_iam_instance_profile.ec2.name
  associate_public_ip_address = true

  user_data = templatefile("${path.module}/user-data.sh", {
    app_repository_url    = var.app_repository_url
    app_repository_branch = var.app_repository_branch
    app_port              = var.app_port
  })

  root_block_device {
    volume_type           = "gp3"
    volume_size           = var.ec2_root_volume_size
    encrypted             = true
    delete_on_termination = true
  }

  metadata_options {
    http_endpoint = "enabled"
    http_tokens   = "required"
  }

  monitoring = true

  tags = {
    Name = "${local.name_prefix}-app"
    Role = "application"
  }

  depends_on = [
    local_sensitive_file.pem
  ]
}