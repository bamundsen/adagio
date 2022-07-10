import {
  Component,
  FC,
  ReactComponentElement,
  ReactElement,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import { Navigate, Outlet, Route, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";

const PrivateRoute = () => {
  const { isAuthenticated, setTrigger, trigger } = useContext(AuthContext);

  const location = useLocation();
  const [isToGo, setIsToGo] = useState(false);
  useEffect(() => {
    if (isAuthenticated === false) {
      setTrigger(!trigger);
    }
  }, []);

  const renderComponent = () => {
    if (!isAuthenticated) {
      return (
        <Navigate state={{ destinyScreen: `${location.pathname}` }} to="/" />
      );
    } else {
      return <Outlet />;
    }
  };

  return renderComponent();
};

export default PrivateRoute;
