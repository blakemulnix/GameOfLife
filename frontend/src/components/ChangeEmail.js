import React, { useState, useContext } from 'react'
import { AccountContext } from './Account';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

const ChangeEmail = () => {
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const { getSession, authenticate } = useContext(AccountContext);

  const onSubmit = (event) => {
    event.preventDefault();

    getSession()
      .then(({ user, email }) => {
        authenticate(email, password).then(() => {
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
        }).catch((err) => {
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
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Change Password</button>
      </form>
    </div>
  )
}


export default ChangeEmail;