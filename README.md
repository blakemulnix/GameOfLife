# GameOfLife
Conway's Game of Life


### TODO
Set up infra for static react + cloud front
Create react deploy script
Deploy react
Setup DNS for react app (maybe use terraform)
setup hosted ui for cognito
... 
set up custom ui for cognito



### Notes
Deployment pipeline:

1. Checkout code
2. Deploy Frontend / Cognito Aith
    1. Deploy Infra
        3.1 Deploy cognito pool
        3.2 Deploy react app with environment variables set to use that cognito pool
    2. Build
        2.1 Build react app
    3. Deploy Code

terraform_remote_state can be used to grab state values from a differnt state
so infra1 could be run, then infra2 could use infra1s state

Instructions:
Local Deploy:
Run 'source local_deploy.sh'


