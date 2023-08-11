import React, { useContext, useState, useEffect } from 'react';
import { AccountContext, AccountContextValue } from './Account';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';

const Settings: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const { getSession } = useContext(AccountContext) as AccountContextValue;

  useEffect(() => {
    getSession()
      .then(() => {
        setLoggedIn(true);
      })
      .catch((err) => {
        console.error(`Error getting session: ${err}`);
      });
  }, [getSession]);

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
  );
};

export default Settings;