import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

/** "Higher-Order Component" for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

function ProtectedRoute({ isAllowed, redirectTo = "/login", children }) {
    if (!isAllowed) {
     return <Navigate to={redirectTo} />
    }
    return children ? children : <Outlet />
   }
  
  export default ProtectedRoute;