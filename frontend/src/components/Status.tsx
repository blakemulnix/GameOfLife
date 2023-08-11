import React, { useState, useContext, useEffect } from "react";
import { AccountContext, AccountContextValue } from "./Account";

const Status: React.FC = () => {
  const [status, setStatus] = useState<boolean>(false);

  const { getSession, logout } = useContext(AccountContext) as AccountContextValue;

  useEffect(() => {
    getSession()
      .then((session: any) => {
        console.log("Session:", session);
        setStatus(true);
      })
      .catch((err: any) => {
        console.error(`Error getting session: ${err}`);
      });
  }, [getSession]);

  return (
    <div>
      {status ? <button onClick={logout}>Logout</button> : "Please login"}
    </div>
  );
};

export default Status;