import React, { createContext, useState } from 'react';
import { CognitoUserPool, CognitoUser, AuthenticationDetails  } from 'amazon-cognito-identity-js';
const AuthContext = createContext();

const userPool = new CognitoUserPool({
  UserPoolId: 'us-east-1_ewGyto3V4',
  ClientId: '1gngvbkbetno5uu573s6tibsot',
});


const Account = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const getSession = () => 
        new Promise((resolve, reject) => {
            const user = userPool.getCurrentUser();
            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(session);
                        setIsLoggedIn(true);
                    }
                });
            } else {
                reject();
            }
        }).catch(err => {
            // console.error(err);
        });
    const changeLoggedIn = () =>{
        setIsLoggedIn(true)
    }
    const authenticate = (Username, Password) => 
        new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool: userPool });
            const authDetails = new AuthenticationDetails({ Username, Password });

            user.authenticateUser(authDetails, {
                onSuccess: data => {
                    console.log('onSuccess:', data);
                    setIsLoggedIn(true);
                    resolve(data);
                },

                onFailure: err => {
                    console.error('onFailure:', err);
                    reject(err);
                },

                newPasswordRequired: data => {
                    console.log('newPasswordRequired:', data);
                    resolve(data);
                }
            });
        }).catch(err => {
            console.error(err);

        });

    const logout = () => {
        const user = userPool.getCurrentUser();
        if (user) {
            user.signOut();
            setIsLoggedIn(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            authenticate,
            getSession,
            logout,
            isLoggedIn,
            changeLoggedIn
        }}>
                      {props.children}
        </AuthContext.Provider>
    );
};

export { Account as AuthProvider, AuthContext };
