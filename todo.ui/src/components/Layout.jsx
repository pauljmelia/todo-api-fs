import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { NavBar } from './NavBar';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    height: '100%',
  },
  main: {
    paddingTop: '64px',
    maxHeight: '100%',
    height: '100%',
  },
  container: {
    paddingTop: theme.spacing(3),
    minHeight: '100%',
    height: '100%',
  },
}));

export const Layout = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main role="main" className={classes.main}>
        <Container maxWidth="xl" className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
