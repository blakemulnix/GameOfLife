import React, { useState, useContext, FormEvent } from "react";
import { AccountContext, AccountContextValue } from "./Account";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authenticate } = useContext(AccountContext) as AccountContextValue;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    authenticate(email, password)
      .then(() => {
        console.log("Logged in!");
      }).catch((err: Error) => {
        console.error(`Error logging in: ${err}`);
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;