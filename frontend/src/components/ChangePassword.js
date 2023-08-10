import React, { useState, useContext } from 'react'
import { AccountContext } from './Account';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { getSession } = useContext(AccountContext);

  const onSubmit = (event) => {
    event.preventDefault();

    getSession().then(({ user }) => {
      user.changePassword(password, newPassword, (err, result) => {
        if (err) {
          console.error(`Error changing password: ${err}`)
        } else {
          console.log(`Password change result: ${result}`);
        }
      });
    }).catch((err) => {
      console.error(`Error getting session: ${err}`);
    });;
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Password</label>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label>New Password</label>
        <input
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  )
}

export default ChangePassword