import { useState } from 'react';

import RescueGoingDoneBy from './RescueGoingDoneBy';
import RescueSurveyBtns from './RescueSurveyBtns';
import RescueGoingSubmit from './RescueGoingSubmit';
import RescueDoneSubmit from './RescueDoneSubmit';
import CommentSection from './CommentSection';

const RescueSurvey = ({ data }) => {
  const [goingCol, setGoingCol] = useState(false);
  const [doneCol, setDoneCol] = useState(false);
  const [commentsCol, setCommentsCol] = useState(false);
  const [goingSubmit, setGoingSubmit] = useState(false);
  const [doneSubmit, setDoneSubmit] = useState(false);
  return (
    <div>
      <RescueGoingDoneBy data={data} />
      <RescueSurveyBtns
        data={data}
        setGoingCol={setGoingCol}
        setDoneCol={setDoneCol}
        setCommentsCol={setCommentsCol}
        commentsCol={commentsCol}
        goingSubmit={goingSubmit}
        doneSubmit={doneSubmit}
      />
      {goingCol && (
        <RescueGoingSubmit
          data={data}
          setGoingCol={setGoingCol}
          setGoingSubmit={setGoingSubmit}
        />
      )}
      {doneCol && (
        <RescueDoneSubmit
          data={data}
          setDoneCol={setDoneCol}
          setDoneSubmit={setDoneSubmit}
        />
      )}
      {commentsCol && <CommentSection data={data} />}
    </div>
  );
};

export default RescueSurvey;
