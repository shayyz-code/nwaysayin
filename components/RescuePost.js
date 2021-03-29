import { useContext } from 'react';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from './AuthProvider';
import RescueSurvey from './RescueSurvey';

const RescuePost = ({ data }) => {
  const currentUser = useContext(AuthContext);
  const { addedBy, location, content, tags, addedTime } = data;
  return (
    <li className="rescueForm">
      {!addedBy.verified ? (
        <div className="input-addedBy">
          <strong>#{addedBy.username}</strong>
        </div>
      ) : (
        <div className="input-addedBy username">
          <strong>#{addedBy.username}</strong>
          <FontAwesomeIcon icon={faCheckCircle} />
          {currentUser && currentUser.displayName === addedBy.username && (
            <strong className="you">(You)</strong>
          )}
        </div>
      )}
      <div className="addedTime">{addedTime}</div>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>
            <span>#{tag}</span>
          </li>
        ))}
      </ul>
      <div className="input-location">(Location): {location}</div>
      <div className="input-content">{content}</div>
      <RescueSurvey data={data} />
      <style jsx>
        {`
          .rescueForm {
            width: 300px;
            border-radius: 10px;
            color: #aaa;
            background: rgba(20, 20, 20, 0.8);
            padding: 15px;
            margin-bottom: 10px;
          }
          .input-addedBy,
          .input-location,
          .input-content,
          .addedTime {
            display: block;
            word-wrap: break-word;
            width: 290px;
            font-size: 16px;
            border-radius: 0;
            background: transparent;
            padding: 5px;
            outline: none;
            border: none;
            margin-bottom: 5px;
          }
          .input-location,
          .input-content {
            word-wrap: break-word;
            font-size: 13px;
          }
          .input-content {
            max-height: 100px;
            overflow-y: auto;
          }
          .addedTime {
            font-size: 10px;
            color: #666;
          }
          .username {
            font-size: 14px;
            font-family: 'Raleway', sans-serif;
            line-height: 14px;
            color: #f00;
            text-transform: uppercase;
            letter-spacing: 5px;
          }
          .you {
            color: #666;
            margin-left: 5px;
          }

          ul {
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            padding: 0;
            margin: 0;
          }
          ul > li {
            display: flex;
            align-items: center;
            height: 5px;
            line-height: 5px;
            font-size: 12px;
            color: #666;
            border-radius: 15px;
            background: rgba(40, 40, 40, 0.8);
            padding: 10px;
            margin-right: 5px;
            margin-bottom: 5px;
          }

          .btnContainer {
            display: flex;
            justify-content: flex-end;
          }

          .btn {
            width: 50px;
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

          .btn:hover {
            background: rgba(50, 50, 50, 0.8);
          }
        `}
      </style>
    </li>
  );
};

export default RescuePost;
