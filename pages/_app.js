import '../styles/globals.css';
import Head from 'next/head';
import React from 'react';
import { createStore, StoreProvider } from 'easy-peasy';
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import main from '../easy-peasy/models/_main';
import theme from '../theme';

const store = createStore(main);

export default function App(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
        <Head>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            <link
                rel="preload"
                href="/fonts/Montserrat.ttf"
                as="font"
                crossOrigin=""
            />
        </Head>
        <StoreProvider store={store}>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </StoreProvider>
    </React.Fragment>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
