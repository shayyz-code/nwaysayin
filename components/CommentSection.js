import { useState, useContext } from 'react';
import { AuthContext } from './AuthProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';

import Services from '../firebase/services';

const CommentSection = ({ data }) => {
  const currentUser = useContext(AuthContext);
  const [inputUsername, setInputUsername] = useState('');
  const [inputComment, setInputComment] = useState('');
  const handleSubmit = () => {
    if (currentUser || inputUsername !== '')
      if (inputComment !== '')
        Services.update(data.key, {
          ...data,
          comments: [
            ...data.comments,
            {
              username: {
                displayName: currentUser
                  ? currentUser.displayName
                  : inputUsername,
                verified: currentUser ? true : false,
              },
              content: inputComment,
            },
          ],
        }).catch(error => {
          console.log(error);
        });
    setInputUsername('');
    setInputComment('');
  };
  return (
    <div className="container">
      <div className="inputContainer">
        {currentUser ? (
          <div className="username">
            {currentUser.displayName}
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
        ) : (
          <input
            type="text"
            className="input-username"
            placeholder="Your genXYZ name"
            onChange={e => setInputUsername(e.target.value)}
            value={inputUsername}
          />
        )}
        <input
          type="text"
          className="input-comment"
          placeholder="Something..."
          onChange={e => setInputComment(e.target.value)}
          value={inputComment}
        />
        <a className="input-submit" onClick={handleSubmit}>
          <FontAwesomeIcon icon={faChevronCircleRight} />
        </a>
      </div>
      <ul className="comments">
        {data.comments && data.comments.length > 0 ? (
          data.comments.map(({ username, content }, index) => (
            <li key={index} className="comment">
              {!username.verified ? (
                `#` + username.displayName
              ) : (
                <div className="username">
                  {username.displayName}
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
              )}
              - {content}
            </li>
          ))
        ) : (
          <li className="comment">--- no comment yet ---</li>
        )}
      </ul>
      <style jsx>{`
        .container {
          margin-top: 5px;
        }
        .comments {
          list-style: none;
          border-radius: 10px;
          background: rgba(35, 35, 35, 0.8);
          padding: 10px;
          padding-bottom: 5px;
          margin-bottom: 5px;
        }
        .comment {
          width: 260px;
          font-size: 12px;
          font-family: Myanmar3, Yunghkio;
          color: #777;
          border-radius: 10px;
          background: rgba(40, 40, 40, 0.8);
          padding: 10px;
          padding-bottom: 5px;
          margin-bottom: 5px;
        }
        .username {
          font-size: 10px;
          font-family: 'Raleway', sans-serif;
          line-height: 14px;
          color: #f00;
          text-transform: uppercase;
          letter-spacing: 5px;
        }
        .inputContainer {
          border-radius: 10px;
          background: rgba(35, 35, 35, 0.8);
          padding: 10px;
          margin-bottom: 5px;
        }
        .input-username,
        .input-comment {
          width: 240px;
        }
        .input-submit {
          margin-left: 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default CommentSection;
