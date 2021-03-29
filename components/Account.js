import Link from 'next/link';

import { useState, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { firestore } from '../firebase/firebase';
import Services from '../firebase/services';
import AccountsList from './AccountsList';

const Account = ({ col }) => {
  const currentUser = useContext(AuthContext);
  const handleSignOut = () => {
    Services.signOut();
  };
  return (
    <div
      className="container"
      style={{
        display: !col ? 'none' : 'flex',
      }}
    >
      <div className="accountContainer">
        <div className="accountSection">
          {currentUser ? (
            <Link href="/account/details">
              <a className="accountName">
                #<strong className="username">{currentUser.displayName}</strong>
              </a>
            </Link>
          ) : (
            <div className="noAccountName">
              Sign in to connect to your account...
            </div>
          )}
          {currentUser ? (
            <div className="signContainer">
              <a className="sign signout" onClick={handleSignOut}>
                Sign out
              </a>
            </div>
          ) : (
            <div className="signContainer">
              <Link href="/account/signin">
                <a className="sign btnSignin">Sign in</a>
              </Link>
              <Link href="/account/signup">
                <a className="sign btnSignup">Sign up</a>
              </Link>
            </div>
          )}
        </div>
        <AccountsList />
      </div>
      <style jsx>
        {`
          .container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            backdrop-filter: blur(5px);
            background: rgba(40, 40, 40, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2;
          }

          .accountContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 300px;
            border-radius: 10px;
          }

          .accountSection {
            width: 300px;
            border-radius: 10px;
            background: rgba(20, 20, 20, 0.8);
            padding: 15px;
            margin-bottom: 10px;
          }

          .accountName {
            font-family: 'Raleway', sans-serif;
            font-size: 20px;
            text-transform: uppercase;
            text-decoration: none;
            letter-spacing: 5px;
            color: #666;
            padding: 5px;
            margin-bottom: 10px;
          }

          .username {
            font-weight: 500;
          }
          .username:hover {
            text-decoration: underline;
          }

          .noAccountName {
            font-size: 16px;
            border-radius: 10px;
            background: rgba(40, 40, 40, 0.8);
            color: #666;
            padding: 10px;
            margin-bottom: 5px;
          }

          .signContainer {
            display: flex;
            justify-content: flex-end;
          }

          .sign {
            width: 60px;
            font-size: 12px;
            text-align: center;
            text-decoration: none;
            border-radius: 3px;
            background: rgba(40, 40, 40, 0.8);
            color: #666;
            padding: 5px;
            margin-left: 5px;
            transition: 0.1s;
            cursor: pointer;
          }

          .sign:hover {
            background: rgba(50, 50, 50, 0.8);
          }

          .footer {
            display: block;
            width: 300px;
            height: 100px;
            background: #fff;
          }
        `}
      </style>
    </div>
  );
};

export default Account;
