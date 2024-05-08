import React from "react";
import { Navigate, Outlet } from "react-router";

const PrivateRoutes = () => {
    const [checkForToken,setCheckForToke] = React.useState(localStorage.getItem("token"));
    let auth = {'token':checkForToken}
  return (
      auth.token ? <Outlet/> : <Navigate to='/login'/>
    )
  }

  export default PrivateRoutes;