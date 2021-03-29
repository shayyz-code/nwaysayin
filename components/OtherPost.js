import Link from 'next/link';

import { useContext } from 'react';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from './AuthProvider';

import OtherSurvey from './OtherSurvey';

const OtherPost = ({ data }) => {
  const currentUser = useContext(AuthContext);
  const { addedBy, title, content, addedTime, links } = data;
  return (
    <li className="rescueForm">
      <div className="input-title">{title}</div>
      <div className="addedTime">{addedTime}</div>
      <div className="input-content">- {content}</div>
      <span className="addedBy_span">- added by: </span>
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
      <ul>
        {links.length > 0 &&
          links.map((link, index) => {
            link = link.startsWith('https://') ? link : 'https://'.concat(link);
            return (
              <li key={index}>
                #
                <Link href={`https://` + link} passHref={true}>
                  <a className="link">{link}</a>
                </Link>
              </li>
            );
          })}
      </ul>
      <OtherSurvey data={data} />
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
          .input-title,
          .input-addedBy,
          .addedBy_span,
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
          .input-title {
            border-left: 2px solid #666;
          }
          .input-content {
            font-size: 12px;
            max-height: 100px;
            overflow-y: auto;
          }
          .input-title,
          .input-content {
            word-wrap: break-word;
          }
          .addedTime {
            font-size: 10px;
            color: #666;
          }
          .addedBy_span {
            font-size: 10px;
          }
          .input-addedBy {
            font-size: 11px;
          }

          .username {
            font-size: 11px;
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
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .link {
            color: #555;
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

export default OtherPost;
