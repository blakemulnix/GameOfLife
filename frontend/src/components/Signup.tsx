import React, { useState } from "react";
import UserPool from "../UserPool";
import { ISignUpResult } from "amazon-cognito-identity-js";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    UserPool.signUp(email, password, [], [], (err: Error | undefined, data: ISignUpResult | undefined) => {
      if (err) {
        console.error(`Error signing up: ${err}`);
      } else {
        console.log(`Data from signup: ${data}`);
      }
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;