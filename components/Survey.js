import { Fragment, useState } from 'react';
import Services from '../firebase/services';

import {
  faExclamation,
  faMailBulk,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Survey = props => {
  const [reportCol, setReportCol] = useState(false);
  const [reportText, setReportText] = useState('');
  const { data } = props;
  const handleTrue = () => {
    Services.update(data.key, {
      ...data,
      survey: { ...data.survey, true: data.survey.true + 1 },
    }).catch(e => {
      console.log(e);
    });
  };

  const handleFalse = () => {
    Services.update(data.key, {
      ...data,
      survey: { ...data.survey, false: data.survey.false + 1 },
    }).catch(e => {
      console.log(e);
    });
  };

  const handleReport = () => {
    setReportCol(!reportCol);
  };

  const handleReportText = e => {
    setReportText(e.target.value);
  };

  const handleReportSubmit = e => {
    e.preventDefault();
    const time = new Date().toString();
    Services.addReport(data, { content: reportText, time })
      .then(() => {
        alert('Report sent!');
        handleReport();
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <Fragment>
      <div className="surveyContainer">
        <button onClick={handleTrue} className="surveyBtns" id="surveyTrue">
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>
        <button onClick={handleFalse} className="surveyBtns" id="surveyFalse">
          <FontAwesomeIcon icon={faThumbsDown} />
        </button>
        <button onClick={handleReport} className="surveyBtns" id="surveyReport">
          <FontAwesomeIcon icon={faExclamation} />
        </button>
      </div>
      <form
        className="surveyReportInputContainer"
        style={{ display: !reportCol ? 'none' : 'flex' }}
        onSubmit={handleReportSubmit}
      >
        <textarea
          className="surveyReportInput"
          name="reportText"
          placeholder="Say something..."
          onChange={e => handleReportText(e)}
          value={reportText}
          required
        ></textarea>
        <div className="surveyReportSubmit">
          <FontAwesomeIcon icon={faMailBulk} />
        </div>
      </form>
      <style jsx>
        {`
          .surveyContainer {
            display: flex;
            width: 270px;
            align-items: center;
            justify-content: space-evenly;
            margin-top: 5px;
          }

          .surveyBtns {
            width: 25px;
            height: 25px;
            font-size: 11px;
            line-height: 50%;
            text-align: center;
            color: #fff;
            border-radius: 50%;
            background: rgba(40, 40, 40, 0.8);
            border: none;
            outline: none;
            cursor: pointer;
            transition: 0.3s;
          }
          .surveyBtns:hover {
            background: rgba(50, 50, 50, 0.8);
          }

          #surveyTrue {
            color: rgb(0, 132, 255);
          }

          #surveyFalse {
            color: #f00;
          }
          #surveyReport {
            color: rgb(255, 217, 0);
          }

          .surveyReportInputContainer {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width: 270px;
            height: 40px;
            margin-top: 10px;
            border-radius: 10px;
            background: rgba(30, 30, 30, 0.8);
          }

          .surveyReportInput,
          .surveyReportSubmit {
            font-size: 11px;
            padding: 5px;
            border: none;
            outline: none;
          }

          .surveyReportInput {
            width: 200px;
            height: 10px;
            line-height: 10px;
            background: #eee;
            border-radius: 5px;
            background: rgba(40, 40, 40, 0.8);
            padding: 10px;
            margin: 0;
          }

          .surveyReportSubmit {
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            color: rgb(255, 217, 0);
            border-radius: 50%;
            font-size: 14px;
            cursor: pointer;
            transition: 0.1s;
          }
          .surveyReportSubmit:hover {
            background: rgba(40, 40, 40, 0.8);
          }
        `}
      </style>
    </Fragment>
  );
};

export default Survey;
