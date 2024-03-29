import React, { useState, useContext, FormEvent } from 'react';
import { AccountContext, AccountContextValue, SessionInfo } from './Account';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

const ChangeEmail: React.FC = () => {
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const { getSession, authenticate } = useContext(AccountContext) as AccountContextValue;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    getSession()
      .then((sessionInfo: SessionInfo) => {
        const { user } = sessionInfo;
        const { email } = sessionInfo.sessionAttributes;

        authenticate(email, password)
          .then(() => {
            const attributes = [
              new CognitoUserAttribute({ Name: "email", Value: newEmail })
            ];

            user.updateAttributes(attributes, (err, result) => {
              if (err) {
                console.error(`Error updating email: ${err}`);
              } else {
                console.log(`Email update result: ${result}`);
              }
            });
          })
          .catch((err) => {
            console.error(`Error authenticating: ${err}`);
          });
      })
      .catch((err) => {
        console.error(`Error getting session: ${err}`);
      });
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>New Email</label>
        <input
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Change Password</button>
      </form>
    </div>
  )
}

export default ChangeEmail;