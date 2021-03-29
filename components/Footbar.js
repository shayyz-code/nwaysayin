import { Fragment, useState, useContext } from 'react';

import AddNew from './AddNew';
import Account from './Account';
import FootBtnFeed from './FootBtnFeed';
import FootBtnAddNew from './FootBtnAddNew';
import FootBtnAccount from './FootBtnAccount';

const Footbar = () => {
  const [colFeed, setColFeed] = useState(true);
  const [colAddNew, setColAddNew] = useState(false);
  const [colAccount, setColAccount] = useState(false);
  const colFeedHandler = () => {
    setColFeed(true);
    setColAddNew(false);
    setColAccount(false);
  };
  const colAddNewHandler = () => {
    setColFeed(false);
    setColAddNew(true);
    setColAccount(false);
  };
  const colAccountHandler = () => {
    setColFeed(false);
    setColAddNew(false);
    setColAccount(true);
  };
  return (
    <Fragment>
      <AddNew col={colAddNew} />
      <Account col={colAccount} />
      <div className="footBtnsOuterContainer">
        <div className="footBtnsInnerContainer">
          <FootBtnFeed col={colFeed} colHandler={colFeedHandler} />
          <FootBtnAddNew col={colAddNew} colHandler={colAddNewHandler} />
          <FootBtnAccount col={colAccount} colHandler={colAccountHandler} />
        </div>
      </div>
      <style jsx>
        {`
          .footBtnsOuterContainer {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 55px;
            background: rgba(50, 50, 50, 0.8);
            backdrop-filter: blur(2px);
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            z-index: 3;
          }
          .footBtnsInnerContainer {
            display: flex;
            justify-content: space-evenly;
            width: 155px;
          }
        `}
      </style>
    </Fragment>
  );
};

export default Footbar;
