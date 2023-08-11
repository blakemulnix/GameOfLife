import React, { useState, useContext, FormEvent } from 'react';
import { AccountContext, AccountContextValue, SessionInfo } from './Account';

const ChangePassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { getSession } = useContext(AccountContext) as AccountContextValue;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    getSession()
      .then((sessionInfo: SessionInfo) => {
        const { user } = sessionInfo;
        user.changePassword(password, newPassword, (err, result) => {
          if (err) {
            console.error(`Error changing password: ${err}`);
          } else {
            console.log(`Password change result: ${result}`);
          }
        });
      })
      .catch((err) => {
        console.error(`Error getting session: ${err}`);
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;