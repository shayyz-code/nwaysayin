import Head from 'next/head';

import { Fragment } from 'react';

const AddNewBtn = ({ col, colHandler }) => {
  return (
    <Fragment>
      <Head>
        <script
          src="https://kit.fontawesome.com/c7ca0c1faa.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <a className="footBtn" onClick={colHandler}>
        <strong
          style={{
            color: !col ? '#fff' : '#f00',
          }}
        >
          <i className="fas fa-plus"></i>
        </strong>
      </a>
    </Fragment>
  );
};

export default AddNewBtn;
