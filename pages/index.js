import { useState } from 'react';

import Layout from '../components/Layout';
import LossList from '../components/LossList';
import Welcome from '../components/Welcome';

const Home = () => {
  const [welcomeCol, setWelcomeCol] = useState(true);
  return (
    <Layout>
      <LossList />
      {welcomeCol && (
        <Welcome welcomeCol={welcomeCol} setWelcomeCol={setWelcomeCol} />
      )}
    </Layout>
  );
};

export default Home;
