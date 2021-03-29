import { useState, useContext } from 'react';
import { AuthContext } from './AuthProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faCheckCircle,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const RescueDoneSubmit = ({ data, setDoneCol, setDoneSubmit }) => {
  const currentUser = useContext(AuthContext);
  const [inputDone, setInputDone] = useState('');
  const handleSubmit = () => {
    if (inputDone === 'DONE') {
      setDoneSubmit(true);
      setDoneCol(false);
    }
  };
  return (
    <div className="container">
      <div className="doneForm">
        <div className="headerContainer">
          <a className="goBackToHomePage" onClick={() => setDoneCol(false)}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </a>
          <h1 className="title">Please Submit</h1>
        </div>
        <div className="input-addedBy username">
          {currentUser.displayName}
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
        <div className="input-content">
          သင်လက်ခံထားသော {data.addedBy.username} ၏ အကူအညီတောင်းခံမှုကို
          ဆောင်ရွက်ပြီးပြီ သေချာပါက `DONE` ဟု အတိအကျ ရိုက်ထည့်ပေးပါ။
        </div>
        <div className="inputContainer">
          <input
            type="text"
            className="input-done"
            placeholder="Input here"
            onChange={e => setInputDone(e.target.value)}
            value={inputDone}
          />
          <a className="input-submit" onClick={handleSubmit}>
            <FontAwesomeIcon icon={faChevronRight} />
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
            background: rgba(30, 30, 30, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 3;
          }

          .doneForm {
            width: 300px;
            border-radius: 10px;
            background: rgba(20, 20, 20, 0.8);
            padding: 15px;
          }

          .title {
            height: 30px;
            font-family: 'Raleway', sans-serif;
            font-size: 16px;
            font-weight: 500;
            letter-spacing: 5px;
            color: #666;
            padding: 5px;
            margin: 0;
            margin-left: 30px;
          }
          .input-content {
            display: block;
            width: 290px;
            font-size: 13px;
            font-family: Myanmar3, Yunghkio;
            color: #666;
            border-radius: 0;
            background: transparent;
            margin-top: 5px;
            margin-bottom: 5px;
            overflow-y: auto;
          }
          .username {
            font-size: 14px;
            line-height: 14px;
            color: #f00;
            text-transform: uppercase;
            letter-spacing: 5px;
          }
          .input-content:focus {
            border-left: 2px solid #666;
          }

          .inputContainer {
            width: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .input-done {
            height: 15px;
            font-size: 13px;
            color: #666;
            border-radius: 0;
            border-bottom: 2px solid #666;
            background: transparent;
            margin-top: 5px;
            margin-bottom: 5px;
            overflow-y: auto;
          }
          .input-submit {
            font-size: 13px;
            text-align: center;
            text-decoration: none;
            border-radius: 3px;
            border: none;
            background: rgba(30, 30, 30, 0.8);
            color: #666;
            padding: 5px;
            margin-left: 5px;
            transition: 0.1s;
            cursor: pointer;
          }
          .input-submit:hover {
            background: rgba(40, 40, 40, 0.8);
          }
        `}
      </style>
    </div>
  );
};

export default RescueDoneSubmit;
