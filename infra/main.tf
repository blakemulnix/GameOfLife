# Steps for initializing Terraform S3 backend
# 1. Remove any existing state resources (delete S3 bucket and DynamoDB table)
#    from AWS console
# 2. Comment out terraform backend config
# 3. Use below S3 bucket, S3 versioning, DynamoDB table Terraform resources to 
#    create necessary infrastructure for backend
# 4. Run 'terraform init' to setup temporary local state
# 5. Reun 'terraform apply' to create resources for backend
# 6. Uncomment Terraform backend config
# 7. Run 'terraform init' once more to replace the existing local backend with
#    the newly created S3 backend
# 8. Remove existing local state files (terraform.tfstate and terraform.tfstate.backup)
#
# https://www.youtube.com/watch?v=FTgvgKT09qM

provider "aws" {
  region = "us-east-1"
}

# Terraform S3 Backend config and resources
terraform {
  backend "s3" {
    bucket         = "terraform-state-gameoflife-bmulnix"
    key            = "global/s3/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-locking"
    encrypt        = true
  }
}

resource "aws_s3_bucket" "terraform_state" {
  bucket = "terraform-state-gameoflife-bmulnix"
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "terraform_s3_versioning" {
  bucket = aws_s3_bucket.terraform_state.bucket
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_s3_ecryption" {
  bucket = aws_s3_bucket.terraform_state.bucket
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_dynamodb_table" "terraform_locks" {
  name         = "terraform-state-locking"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}

# Cognito User Pool and Client
resource "aws_cognito_user_pool" "pool" {
  name = "congnito-gameoflife-user-pool"

  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]
  password_policy {
    minimum_length                   = 6
    temporary_password_validity_days = 7
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_subject        = "Account Confirmation"
    email_message        = "Your confirmation code is {####}"
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "email"
    required                 = true

    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  }
}

# enable USER_SRP_AUTH for this client
resource "aws_cognito_user_pool_client" "client" {
  name         = "cognito-gameoflife-user-pool-app-client"
  user_pool_id = aws_cognito_user_pool.pool.id

  generate_secret               = false
  refresh_token_validity        = 90
  prevent_user_existence_errors = "ENABLED"
  explicit_auth_flows = [
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_ADMIN_USER_PASSWORD_AUTH"
  ]

  


}

resource "aws_cognito_user_pool_domain" "cognito-domain" {
  domain       = "gameoflife-bmulnix"
  user_pool_id = aws_cognito_user_pool.pool.id
}

# Cognito User Pool info outputs
output "AWS_REGION" {
  value     = "us-east-1"
  sensitive = false
}

output "AUTH_USER_POOL_ID" {
  value     = aws_cognito_user_pool.pool.id
  sensitive = false
}

output "AUTH_USER_POOL_WEB_CLIENT_ID" {
  value     = aws_cognito_user_pool_client.client.id
  sensitive = false
}
