import React, { createContext, ReactNode } from 'react';
import { CognitoUser, AuthenticationDetails, CognitoUserAttribute, CognitoUserSession } from 'amazon-cognito-identity-js';
import Pool from '../UserPool';

interface SessionAttributes {
  [key: string]: string;
}

interface SessionInfo {
  user: CognitoUser;
  session: CognitoUserSession;
  sessionAttributes: SessionAttributes;
}

interface AccountContextValue {
  authenticate: (Username: string, Password: string) => Promise<any>;
  getSession: () => Promise<SessionInfo>;
  logout: () => void;
}

const AccountContext = createContext<AccountContextValue | undefined>(undefined);

const Account: React.FC<{ children: ReactNode }> = (props) => {
  const getSession = async () => {
    return await new Promise<any>((resolve, reject) => {
      const user = Pool.getCurrentUser();

      if (user) {
        user.getSession((err: Error | null, session: CognitoUserSession | null) => {
          if (err) {
            reject(err);
          } else {
            user.getUserAttributes((err: Error | undefined, attributes: CognitoUserAttribute[] | undefined) => {
              if (err) {
                reject(err);
              } else {
                const sessionAttributes: SessionAttributes = {};
                for (let attribute of attributes || []) {
                  const { Name, Value } = attribute;
                  sessionAttributes[Name] = Value;
                }

                resolve({ user, session, sessionAttributes });
              }
            });
          }
        });
      } else {
        reject('No current user logged in');
      }
    });
  };

  const authenticate = async (Username: string, Password: string) => {
    return await new Promise<any>((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log('onSuccess:', data);
          resolve(data);
        },
        onFailure: (err) => {
          console.error('onFailure:', err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log('newPasswordRequired:', data);
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      console.log('User logged out');
      user.signOut();
    }
  };

  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
export type { AccountContextValue, SessionInfo };
