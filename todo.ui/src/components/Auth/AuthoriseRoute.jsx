import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { routes } from '../../routes';

export const AuthorizeRoute = (props) => {
  const { component: Component, ...rest } = props;
  const { user, token, tokenExpiry } = useSelector((state) => state.authentication);

  return (
    <Route
      {...rest}
      render={(innerProps) => {
        if (user && token && moment(tokenExpiry).isAfter(moment())) {
          return <Component {...innerProps} />;
        }

        return <Redirect to={routes.auth.signIn} />;
      }}
    />
  );
};

AuthorizeRoute.propTypes = {
  component: PropTypes.any.isRequired,
};
