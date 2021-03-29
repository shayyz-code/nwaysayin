import { useState } from 'react';

import CommentSection from './CommentSection';

const OtherSurvey = ({ data }) => {
  const [commentsCol, setCommentsCol] = useState(false);
  return (
    <div>
      <div className="btnContainer">
        <a
          className="btn btnComments"
          onClick={() => setCommentsCol(!commentsCol)}
        >
          {data.comments.length > 0
            ? `${data.comments.length} Comments`
            : `${data.comments.length} Comment`}
        </a>
      </div>
      {commentsCol && <CommentSection data={data} />}
      <style jsx>
        {`
          .btnContainer {
            display: flex;
            justify-content: flex-end;
            font-family: monospace;
          }

          .btn {
            font-size: 12px;
            text-align: center;
            text-decoration: none;
            border-radius: 3px;
            border: none;
            color: #666;
            padding: 5px;
            margin-left: 5px;
            transition: 0.1s;
            cursor: pointer;
          }

          .btnComments {
            background: rgba(40, 40, 40, 0.8);
          }
          .btn:hover {
            background: rgba(50, 50, 50, 0.8);
          }
        `}
      </style>
    </div>
  );
};

export default OtherSurvey;
