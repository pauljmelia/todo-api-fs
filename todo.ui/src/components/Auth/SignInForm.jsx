/* eslint-disable no-console */
import { Box, Button, Container, Grid, makeStyles, TextField } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { actionCreators } from '../../redux/authentication';
import { routes } from '../../routes';

const useStyles = makeStyles((theme) => ({
  spaced: {
    paddingBottom: theme.spacing(1),
  },
  header: {
    flexWrap: 'wrap',
  },
  stretched: {
    flexGrow: 100000,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  headline: {
    fontSize: '1.25rem',
    fontWeight: 600,
  },
}));

export const SignInForm = () => {
  const {
    registrationInProgress,
    registrationError,
    registrationSuccessful,
    signInInProgress,
    signInError,
  } = useSelector((state) => state.authentication);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [helperText, setHelperText] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEmailChanged = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChanged = (event) => {
    setPassword(event.target.value);
  };

  const handleRegisterClick = (event) => {
    event.preventDefault();

    dispatch(actionCreators.register(email, password))
      .then(() => dispatch(actionCreators.signIn(email, password)))
      .then(() => {
        history.push(routes.default);
      })
      .catch((error) => {
        console.log({ error });

        if (error.status === 422) {
          setHelperText('Email address is already in use, please try again.');
        } else {
          setHelperText('There was a problem with the registration, please try again later.');
        }
      });
  };

  const handleSignInClick = (event) => {
    event.preventDefault();
    dispatch(actionCreators.signIn(email, password))
      .then(() => {
        history.replace(routes.default);
      })
      .catch((error) => {
        console.log({ error });
        setHelperText('enail address and / or password was incorrect, please try again.');
      });
  };

  return (
    <Container maxWidth="xs">
      <Box className={classes.column}>
        <Box className={classes.row}>
          <Box className={classes.stretched}>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <Box sx={{ p: 2 }} className={clsx(classes.header, classes.row)}>
                  <Box className={clsx(classes.headline, classes.stretched)}>Login</Box>
                </Box>
                <Box sx={{ p: 2 }} className={classes.row}>
                  <form>
                    <Box className={classes.stretched}>
                      <TextField
                        error={!!(registrationError || signInError)}
                        helperText={helperText}
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={handleEmailChanged}
                        autoComplete="email"
                        variant="standard"
                        className={classes.spaced}
                      />
                      <TextField
                        error={!!(registrationError || signInError)}
                        fullWidth
                        label="Password"
                        value={password}
                        type="password"
                        onChange={handlePasswordChanged}
                        autoComplete="current-password"
                        variant="standard"
                        className={classes.spaced}
                      />
                      <Button
                        disabled={!(email && password) || registrationInProgress || signInInProgress}
                        variant="outlined"
                        color="primary"
                        onClick={handleSignInClick}
                      >
                        Sign in
                      </Button>
                      <Button
                        disabled={
                          !(email && password) || registrationInProgress || signInInProgress || registrationSuccessful
                        }
                        variant="outlined"
                        color="primary"
                        onClick={handleRegisterClick}
                      >
                        Register
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
