resource "aws_instance" "app_instance" {
  ami           = "ami-0c55b159cbfafe1f0"  # Use a valid AMI for your region
  instance_type = var.instance_type

  tags = {
    Name = "AppInstance"
  }
}
