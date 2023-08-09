terraform {
  backend "s3" {
    bucket         = "terraform-state-bmulnix"
    key            = "global/s3/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-locking"
    encrypt        = true
  }
}

provider "aws" {
  region = "us-east-1"
}

# Terraform S3 Backend Infra
resource "aws_s3_bucket" "terraform_state" {
  bucket = "terraform-state-bmulnix"
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "terraform_s3_versionig" {
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

resource "aws_cognito_user_pool" "pool" {
  name = "congnito-gameoflife-user-pool"
}

resource "aws_cognito_user_pool_client" "client" {
  name         = "cognito-gameoflife-user-pool-app-client"
  user_pool_id = aws_cognito_user_pool.pool.id
}

# Cognito User Pool info output
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

# Static React S3 Cloudfront hosting
variable "domainName" {
  default = "react-test.blakemulnix.io"
  type    = string
}

variable "bucketName" {
  default = "react-test.blakemulnix.io"
  type    = string
}

resource "aws_s3_bucket" "static_react_bucket" {
  bucket = "gameoflife-react-bucket-bmulnix"
  acl    = "private"

}

resource "aws_s3_bucket_versioning" "react_s3_versioning" {
  bucket = aws_s3_bucket.static_react_bucket.bucket
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "block_public_access" {
  bucket = aws_s3_bucket.static_react_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}



// This command will set these outputs to environment variables
// export $(terraform output | sed 's/\s*=\s*/=/g' | xargs)

// aws cognito-idp admin-create-user  --user-pool-id us-east-1_CaMYEQajy  --username gameoflife-user-1
// aws cognito-idp admin-set-user-password --user-pool-id us-east-1_CaMYEQajy --username "gameoflife-user-1" --password 'Password1234#' --permanent
