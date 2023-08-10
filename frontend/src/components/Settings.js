import React, { useContext, useState } from 'react'
import { AccountContext } from './Account'
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';

const Settings = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const { getSession } = useContext(AccountContext);

  getSession().then(() => {
    setLoggedIn(true);
  }).catch((err) => {
    console.error(`Error getting session: ${err}`);
  });

  return (
    <div>
      {loggedIn && (
        <>
          <h2>Settings</h2>
          <ChangePassword />
          <ChangeEmail />
        </>
      )}
    </div>
  )
}

export default Settings