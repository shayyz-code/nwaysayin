import Link from 'next/link';

import { useState, useContext, useEffect } from 'react';
import { firestore } from '../firebase/firebase';
import { AuthContext } from './AuthProvider';

const AccountsList = () => {
  const currentUser = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    firestore
      .collection('users')
      .get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          username: doc.data().username,
        }));
        setUsers(data);
      });
  }, []);
  return (
    <div className="container">
      <h1 className="title">#verified accounts</h1>
      <div className="usersContainer">
        {users.map(user => (
          <Link href="/account/details">
            <a className="accountName">
              #
              <strong className="username">
                {user.username}{' '}
                {currentUser && currentUser.uid === user.id && `(You)`}
              </strong>
            </a>
          </Link>
        ))}
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            width: 300px;
            border-radius: 10px;
            padding: 15px;
            background: rgba(20, 20, 20, 0.8);
          }
          .usersContainer {
            display: flex;
            flex-direction: column;
            max-height: 350px;
            overflow-y: auto;
          }

          .title,
          .accountName {
            font-family: 'Raleway', sans-serif;
            font-size: 12px;
            text-transform: uppercase;
            text-decoration: none;
            letter-spacing: 5px;
            color: #666;
            padding: 5px;
          }
          .title {
            font-size: 16px;
            margin: 0;
            margin-bottom: 10px;
          }

          .username {
            font-weight: 500;
          }
          .username:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </div>
  );
};

export default AccountsList;
