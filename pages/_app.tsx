import type { AppProps } from 'next/app';
import '../styles/global.css';
import { VFC } from 'react';

const App: VFC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

App.displayName = 'App';
export default App;
