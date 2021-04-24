import React from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";

export const PrivateRoute: React.FC<any> = ({
  render: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export const PublicRoute: React.FC<any> = ({
  render: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
