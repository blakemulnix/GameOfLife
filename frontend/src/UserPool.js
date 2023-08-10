import { CognitoUserPool } from 'amazon-cognito-identity-js';
import awsConfig from "./awsCognitoConfig"

const poolData = {
    UserPoolId: awsConfig.AUTH_USER_POOL_ID.value,
    ClientId: awsConfig.AUTH_USER_POOL_WEB_CLIENT_ID.value,
}

export default new CognitoUserPool(poolData);