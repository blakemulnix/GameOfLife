#!/bin/bash

deploy() {
  local environment="$1"

  case "$environment" in
    local)
      echo "Deploying locally..."
      
      ;;
    dev)
      echo "Deploying to dev environment..."
      # 
      ;;
    *)
      echo "Invalid environment: $environment"
      exit 1
      ;;
  esac
}

main() {
  local command="$1"
  shift

  case "$command" in
    deploy)
      deploy "$@"
      ;;
    # Add other commands here
    *)
      echo "Invalid command: $command"
      exit 1
      ;;
  esac
}

# Call the main function with provided arguments
main "$@"
