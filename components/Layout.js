import Head from 'next/head';
import { Fragment } from 'react';
import Navbar from './Navbar';
import Footbar from './Footbar';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Head>
        <title>Nway Sayin</title>
      </Head>
      <Navbar />
      <Footbar />
      {children}
    </Fragment>
  );
};

export default Layout;
