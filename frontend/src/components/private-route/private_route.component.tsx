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
import { useNavigate } from "react-router-dom";
// interface PrivateRouteProps {
//   PassedComponent: FC;
//   path: string;
// }
const PrivateRoute = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setTrigger,
    trigger,
    processUser,
  } = useContext(AuthContext);
  console.log("EU ESOTU AQUI !!!!!");
  const location = useLocation();
  const [isToGo, setIsToGo] = useState(false);
  useLayoutEffect(() => {
    if (isAuthenticated === false) {
      setTrigger(!trigger);
    }
  }, []);

  const renderComponent = () => {
    console.log("EITAAAAAAAAAAAAAAAAAAAAAAAA " + isAuthenticated);
    console.log("LOCATION: ", location);
    // let isToGo = isAuthenticated;

    if (!isAuthenticated) {
      console.log("NÃO É POSSÍVEL QUE EU ESTEJA AQUI !!!!!!!!!!!!!!!!");
      return (
        <Navigate state={{ destinyScreen: `${location.pathname}` }} to="/" />
      );
      // return navigate(-1);
    } else {
      console.log(location);
      console.log("DE FATO, ESTOU AQUI !!!!!!!!!!!!!!!!!!!!!");
      return <Outlet />;
    }
  };

  return renderComponent();
};

export default PrivateRoute;
