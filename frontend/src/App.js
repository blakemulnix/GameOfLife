import './App.css';

import {Amplify} from 'aws-amplify';
import awsConfig from "./awsCognitoConfig"
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  Auth: {
      region: awsConfig.AWS_REGION.value,
      userPoolId: awsConfig.AUTH_USER_POOL_ID.value,
      userPoolWebClientId: awsConfig.AUTH_USER_POOL_WEB_CLIENT_ID.value,
      cookieStorage: {
        domain: process.env.REACT_APP_AUTH_COOKIE_STORAGE_DOMAIN,
        path: "/",
        expires: 365,
        sameSite: "strict",
        secure: true,
    },
    authenticationFlowType: "USER_SRP_AUTH",
  }
})

function App() {
  return (
      <Authenticator>
          {({ signOut, user }) => (
              <div>
                  <p>Welcome {user.username}</p>
                  <button onClick={signOut}>Sign out</button>
              </div>
          )}
      </Authenticator>
  );
}

export default App;
