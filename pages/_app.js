import { AuthProvider } from '../components/AuthProvider';
import '../styles/global.css';

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
