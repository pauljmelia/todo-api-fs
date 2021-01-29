import { createMuiTheme, MuiThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from '../redux';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });

const { store, persistor } = configureStore(history);

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00C6DB',
    },
    secondary: {
      main: '#ff4f49',
    },
  },
  text: {
    primary: 'hsla(0,0%,100%,.45)',
  },
  typography: {
    useNextVariants: true,
    body1: {
      fontSize: '1rem',
    },
  },
});

theme = responsiveFontSizes(theme);

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <div> Well here we are </div>
          </MuiThemeProvider>
        </StylesProvider>
      </Router>
    </PersistGate>
  </Provider>
);
