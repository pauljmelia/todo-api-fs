import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { actionCreators } from '../redux/authentication';
import { routes } from '../routes';

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: 1,
  },
  typoRoot: {
    '& > * + *': {
      marginLeft: `${theme.spacing(2)} !important`,
    },
  },
  toolbarButton: {
    borderColor: 'white !important',
    color: 'white !important',
  },
}));

export const NavBar = () => {
  const { user, token, tokenExpiry } = useSelector((state) => state.authentication);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuthenticated = useMemo(() => user && token && moment(tokenExpiry).isAfter(moment()), [
    user,
    token,
    tokenExpiry,
  ]);

  const handleSignOutClick = (event) => {
    event.preventDefault();

    dispatch(actionCreators.signOut());
    history.push(routes.default);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h4" component="h1" className={classes.logo}>
          Todo App
        </Typography>
        <Typography className={classes.typoRoot}>
          {isAuthenticated && (
            <Button className={classes.toolbarButton} variant="outlined" onClick={handleSignOutClick}>
              Sign out
            </Button>
          )}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
