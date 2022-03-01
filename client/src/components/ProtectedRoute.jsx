import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/sign-in" />
      }
    />
  );
}

export default ProtectedRoute;
