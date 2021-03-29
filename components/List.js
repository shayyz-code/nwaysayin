import { useContext, useState } from 'react';
import { AuthContext } from './AuthProvider';

import Survey from './Survey';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

const List = ({ data }) => {
  const currentUser = useContext(AuthContext);
  const {
    gender,
    name,
    fatherName,
    age,
    job,
    id,
    address,
    where,
    when,
    contact,
    additionalContent,
    confirmed,
    survey,
    imageURL,
    time,
    addedBy,
  } = data;
  const CASE = data.case;
  const [col, setCol] = useState(false);
  return (
    <li className="list-item">
      <ul className="head">
        <li className="name">
          {`${
            gender === 'ko'
              ? 'ကို'
              : gender === 'oo'
              ? 'ဦး'
              : gender === 'ma'
              ? 'မ'
              : 'ဒေါ်'
          }${name}`}
        </li>
        <li className="age">{age}</li>

        <ul className="trueOrFalse" style={{ display: !col ? 'flex' : 'none' }}>
          <li>မှန်ကန်မှု: {survey.true}</li>
          <li>မှားယွင်းမှု: {survey.false}</li>
        </ul>
        <button className="btnCol" onClick={() => setCol(!col)}>
          {col ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </button>
      </ul>
      <ul className="tail" style={{ display: col ? 'block' : 'none' }}>
        {imageURL && <img src={imageURL} width="200px" alt="photo" />}
        <li>အဖအမည်: {fatherName}</li>
        <li>အလုပ်အကိုင်: {job}</li>
        <li>မှတ်ပုံတင်အမှတ်: {id}</li>
        <li>နေရပ်လိပ်စာ: {address}</li>
        {CASE === 'loss' ? (
          <li>ဖမ်းဆီးခံရသည့်နေရာ: {where}</li>
        ) : (
          <li>သေဆုံးသည့်နေရာ: {where}</li>
        )}
        {CASE === 'loss' ? (
          <li>ဖမ်းဆီးခံရသည့်အချိန်: {when}</li>
        ) : (
          <li>သေဆုံးသည့်အချိန်: {when}</li>
        )}
        {contact && <li>ပြန်လည်ဆက်သွယ်နိုင်ရန်: {contact}</li>}

        <li>အခြားအကြောင်းအရာ: {additionalContent}</li>
        <li>
          Added by:
          {!addedBy.verified ? (
            <strong className="addedBy"> #{addedBy.username}</strong>
          ) : (
            <div className="username">
              <strong>#{addedBy.username}</strong>
              <FontAwesomeIcon icon={faCheckCircle} />
              {currentUser && currentUser.displayName === addedBy.username && (
                <strong className="you">(You)</strong>
              )}
            </div>
          )}
        </li>
        <li className="time">{time}</li>
        {confirmed ? (
          <li className="confirmedList">Confirmed</li>
        ) : (
          <li>
            Survey:
            <ul className="trueOrFalse">
              <li>မှန်ကန်မှု: {survey.true}</li>
              <li>မှားယွင်းမှု: {survey.false}</li>
            </ul>
            <Survey data={data} />
          </li>
        )}
      </ul>
      <style jsx>
        {`
          li {
            margin-bottom: 5px;
          }

          .list-item {
            width: 280px;
            border-radius: 10px;
            background: rgba(20, 20, 20, 0.8);
            font-family: Myanmar3, Yunghkio;
            font-size: 12px;
            color: #666;
            margin-top: 5px;
            padding: 10px;
            padding-top: 10px;
            padding-bottom: 0;
          }

          .head {
            position: relative;
            list-style: none;
            width: 270px;
            padding: 5px;
          }
          .name {
            font-size: 14px;
            font-weight: bold;
            color: #777;
          }
          .age {
            font-size: 12px;
          }
          .time {
            font-size: 10px;
          }
          .addedBy {
            font-weight: normal;
            color: #777;
          }
          .username {
            font-size: 9px;
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
          .trueOrFalse {
            display: flex;
            width: 270px;
            padding: 0;
            list-style: none;
            justify-content: space-evenly;
          }

          .btnCol {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 27px;
            height: 27px;
            font-weight: bold;
            font-size: 11px;
            text-align: center;
            line-height: 50%;
            color: #666;
            border-radius: 50%;
            border: none;
            background: rgba(40, 40, 40, 0.8);
            outline: none;
            cursor: pointer;
            transition: 0.1s;
          }
          .btnCol:hover {
            background: rgba(50, 50, 50, 0.8);
          }

          .tail {
            list-style: none;
            width: 290px;
            padding: 5px;
          }
          .tail > li {
            width: 270px;
            word-wrap: break-word;
            margin-bottom: 10px;
          }

          img {
            border-radius: 5px;
            margin-left: 35px;
            margin-bottom: 10px;
          }

          .confirmedList {
            font-family: monospace;
            height: 25px;
            text-align: center;
            color: #666;
            line-height: 25px;
            border-radius: 5px;
            background: rgba(40, 40, 40, 0.8);
          }
        `}
      </style>
    </li>
  );
};

export default List;
