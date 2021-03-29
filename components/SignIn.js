import { useRouter } from 'next/router';
import Head from 'next/head';

import { useState, useContext } from 'react';
import Services from '../firebase/services';
import { AuthContext } from './AuthProvider';

const SignIn = () => {
  const router = useRouter();
  const currentUser = useContext(AuthContext);
  if (currentUser) {
    router.push('/');
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const handleOnChange = ({ target }) => {
    if (target.name === 'email') {
      setEmail(target.value);
    } else if (target.name === 'password') {
      setPassword(target.value);
    }
    setErr(null);
  };
  const handleSubmit = () => {
    if (email != '' && password != '') {
      Services.signIn(email, password).catch(error => {
        if (error) {
          setErr('Invalid email or password.');
        }
      });
    }
  };
  return (
    <div className="container">
      <Head>
        <title>Nway Sayin</title>
      </Head>
      <div className="signInForm">
        <h1 className="title">#Sign in</h1>
        <input
          type="email"
          name="email"
          className="input-field"
          placeholder="E-mail"
          onChange={handleOnChange}
          value={email}
        />
        <input
          type="password"
          name="password"
          className="input-field"
          placeholder="Password"
          onChange={handleOnChange}
          value={password}
        />
        <div
          className="output-field"
          style={{ display: err ? 'block' : 'none' }}
        >
          {err}
        </div>
        <div className="signContainer">
          <a className="sign btnSignin" onClick={handleSubmit}>
            Sign in
          </a>
          <a className="sign btnCancel" onClick={() => router.back()}>
            Cancel
          </a>
        </div>
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
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2;
          }

          .signInForm {
            width: 300px;
            border-radius: 10px;
            background: rgba(20, 20, 20, 0.8);
            padding: 15px;
          }

          .title {
            font-family: 'Raleway', sans-serif;
            font-size: 20px;
            font-weight: 500;
            text-decoration: none;
            letter-spacing: 5px;
            color: #666;
            padding: 5px;
            margin: 0;
            margin-bottom: 5px;
          }

          .input-field,
          .output-field {
            width: 280px;
            font-size: 13px;
            border-radius: 5px;
            background: rgba(40, 40, 40, 0.8);
            color: #666;
            padding: 10px;
            outline: none;
            border: none;
            margin-bottom: 5px;
          }
          .output-field {
            background: rgba(100, 0, 0, 0.8);
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
            border: none;
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
        `}
      </style>
    </div>
  );
};

export default SignIn;
