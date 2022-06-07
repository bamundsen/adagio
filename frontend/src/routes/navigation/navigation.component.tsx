import { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import AdagioLogo from "../../assets/adagio_logo.svg";
import WhiteBell from "../../assets/white_bell.svg";
import YellowBell from "../../assets/white_bell.svg";
import UserNavigation from "../../assets/user_navigation.svg";
import UserNavigationWithArrow from "../../assets/user_navigation_with_arrow.svg";
import styles from "./navigation.module.scss";
import { User } from "../../types/user";

// interface NavigationProps {
//   userData: any;
//   userDataAux: React.MutableRefObject<any>;
//   authState: boolean;
//   setUserData: React.Dispatch<React.SetStateAction<{}>>;
//   setAuthState: React.Dispatch<React.SetStateAction<boolean>>;
// }

const Navigation = () => {
  const [loginOrRegisterPageAux, setLoginOrRegisterPageAux] =
    useState<string>();
  const { user, isAuthenticated, setUser, setIsAuthenticated } =
    useContext(AuthContext);

  useEffect(() => {
    console.log("user data, authState", user, isAuthenticated);
    toggleLoginOrRegisterPageAux();
  }, [isAuthenticated]);

  useEffect(() => {
    verifyIfTokenWasDeleted();
  }, []);

  const verifyIfTokenWasDeleted = () => {
    if (!localStorage.getItem("accessToken")) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };
  const toggleLoginOrRegisterPageAux = () => {
    if (window.location.pathname === "/") {
      setLoginOrRegisterPageAux("/register");
    } else if (window.location.pathname === "/register") {
      setLoginOrRegisterPageAux("/");
    } else {
      setLoginOrRegisterPageAux("");
    }
  };

  const verifyCurrentUserState = () => {
    return (
      <nav className={`${styles["navegacao-container"]}`}>
        <ul
          style={returnStyleNavigationAux()}
          className={`${styles["lista-navegacao"]}`}
        >
          {(loginOrRegisterPageAux === "/" ||
            loginOrRegisterPageAux === "/register") &&
            !isAuthenticated && (
              <li
                className={`${styles["item-navegacao"]}`}
                onClick={toggleLoginOrRegisterPageAux}
              >
                <Link
                  to={`${
                    loginOrRegisterPageAux === "/register" ? "/register" : "/"
                  }`}
                >
                  {loginOrRegisterPageAux === "/register"
                    ? "Cadastre-se"
                    : "Fazer login"}
                </Link>
              </li>
            )}

          {isAuthenticated ? (
            <>
              <li className={`${styles["item-navegacao"]}`}>
                <img
                  src={WhiteBell}
                  style={{ cursor: "pointer" }}
                  alt={"White Bell"}
                />
              </li>
              <li className={`${styles["item-navegacao"]}`}>{user?.login}</li>
              <li className={`${styles["item-navegacao"]}`}>
                <img
                  src={UserNavigationWithArrow}
                  style={{ cursor: "pointer" }}
                  alt={"User Navigation Icon"}
                />
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    );
  };

  const returnStyleNavigationAux = () => {
    return isAuthenticated === true
      ? { justifyContent: "space-around", width: "30vw" }
      : { justifyContent: "flex-start" };
  };
  return (
    <Fragment>
      <header className={`${styles["header-navigation"]}`}>
        <div className={`${styles["left-region-header-navigation"]}`}>
          <Link
            to="/"
            onClick={() => {
              verifyIfTokenWasDeleted();
              setLoginOrRegisterPageAux("/register");
            }}
          >
            <img
              className={`${styles.adagio_logo}`}
              src={AdagioLogo}
              alt={"Adagio Logo"}
            />
          </Link>

          {isAuthenticated === true ? (
            <ul className={`${styles["left-region-list-of-entities"]}`}>
              <Link to="/projetos">Projetos</Link>

              <Link to="/calendario">Calendário</Link>
            </ul>
          ) : null}
        </div>

        {verifyCurrentUserState()}
      </header>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
