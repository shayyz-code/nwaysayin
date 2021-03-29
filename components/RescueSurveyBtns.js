import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

import Services from '../firebase/services';

const RescueSurveyBtns = ({
  data,
  setGoingCol,
  setDoneCol,
  setCommentsCol,
  commentsCol,
  goingSubmit,
  doneSubmit,
}) => {
  const currentUser = useContext(AuthContext);
  const handleGoing = () => {
    !data.rescue.going && setGoingCol(true);
    const goingTime = new Date().toString();
    goingSubmit &&
      Services.update(data.key, {
        ...data,
        rescue: {
          ...data.rescue,
          by: currentUser.displayName,
          going: true,
          goingTime: goingTime,
        },
      }).catch(e => {
        console.log(e);
      });
  };
  const handleDone = () => {
    !data.rescue.done && setDoneCol(true);
    const doneTime = new Date().toString();
    doneSubmit &&
      Services.update(data.key, {
        ...data,
        rescue: {
          ...data.rescue,
          done: true,
          doneTime: doneTime,
        },
      }).catch(e => {
        console.log(e);
      });
  };
  return (
    <div className="btnContainer">
      {currentUser && currentUser.displayName === data.rescue.by && (
        <a
          className="btn"
          onClick={handleDone}
          style={{
            background: data.rescue.done
              ? 'rgba(100, 0, 0, 0.8)'
              : 'rgba(40, 40, 40, 0.8)',
          }}
        >
          Done
        </a>
      )}
      {currentUser && !data.rescue.done && (
        <a
          className="btn"
          onClick={handleGoing}
          style={{
            background: data.rescue.going
              ? 'rgba(100, 0, 0, 0.8)'
              : 'rgba(40, 40, 40, 0.8)',
          }}
        >
          Going
        </a>
      )}
      <a
        className="btn btnComments"
        onClick={() => setCommentsCol(!commentsCol)}
      >
        {data.comments.length > 0
          ? `${data.comments.length} Comments`
          : `${data.comments.length} Comment`}
      </a>
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

export default RescueSurveyBtns;
