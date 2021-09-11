import type { VFC } from 'react';
import type { AppProps } from 'next/app';
import '../styles/global.css';

const App: VFC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

App.displayName = 'App';
export default App;
