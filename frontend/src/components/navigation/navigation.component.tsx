import { useContext, useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import AdagioLogo from "../../assets/adagio_logo.svg";
import WhiteBell from "../../assets/white_bell.svg";
import YellowBell from "../../assets/yellow_bell.svg";
import UserNavigation from "../../assets/user_navigation.svg";
import UserNavigationWithArrow from "../../assets/user_navigation_with_arrow.svg";
import styles from "./navigation.module.scss";
import { User } from "../../types/UserType";
import useWindowDimensions from "../../utils/useWindowDimensions.utils";
import { CalendarContext } from "../../contexts/calendar.context";
import { ProjectContext } from "../../contexts/project.context";
import { NotificationContext } from "../../contexts/notification.context";
import { RelatoryContext } from "../../contexts/relatory.context";
import NotificationDropdown from "./components/notification-dropdown/notification_dropdown.component";
import { AuxInformationApi } from "../../hooks/auxInformationApi";

const Navigation = () => {
  const { setTriggerAlignCurrentMonth, triggerAlignCurrentMonth } =
    useContext(CalendarContext);
  const { user, isAuthenticated, signout } = useContext(AuthContext);
  const { returnConfirmationModal } = useContext(RelatoryContext);
  const { setTriggerToSearchProjectsAgain, triggerToSearchProjectsAgain } =
    useContext(ProjectContext);
  const refDropdown = useRef<HTMLLIElement | null>(null);
  const refDropdownNotification = useRef<HTMLLIElement | null>(null);
  const windowDimensions = useWindowDimensions();
  const [loginOrRegisterPageAux, setLoginOrRegisterPageAux] =
    useState<string>();
  const [displayDropdown, setDisplayDropdown] = useState("none");
  const [displayDropdownNotification, setDisplayDropdownNotification] =
    useState("none");
  const { triggerUpdateCalendar, setTriggerUpdateCalendar } =
    useContext(CalendarContext);
  const [thisDayHasMoreThanZeroTask, setThisDayHasMoreThanZeroTask] =
    useState(false);
  const { showMessage, isToShowAlert } = useContext(NotificationContext);

  const auxInformationApi = AuxInformationApi();

  useEffect(() => {
    auxInformationApi.getQuantityOfTasksOfToday().then((response: any) => {
      if (response.quantityOfTasks > 0) {
        setThisDayHasMoreThanZeroTask(true);
      }
    });
  }, [displayDropdown]);

  useEffect(() => {
    console.log(`EITA: ${thisDayHasMoreThanZeroTask}`);
  }, [thisDayHasMoreThanZeroTask]);

  useEffect(() => {
    const checkIfClickOutside = (e: any) => {
      if (
        displayDropdown !== "none" &&
        refDropdown.current &&
        !refDropdown.current.contains(e.target)
      ) {
        setDisplayDropdown("none");
      }
    };

    document.addEventListener("mousedown", checkIfClickOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickOutside);
    };
  }, [displayDropdown]);

  useEffect(() => {
    const checkIfClickOutsideNotification = (e: any) => {
      if (
        displayDropdownNotification !== "none" &&
        refDropdownNotification.current &&
        !refDropdownNotification.current.contains(e.target)
      ) {
        setDisplayDropdownNotification("none");
      }
    };

    document.addEventListener("mousedown", checkIfClickOutsideNotification);

    return () => {
      document.removeEventListener(
        "mousedown",
        checkIfClickOutsideNotification
      );
    };
  }, [displayDropdownNotification]);

  useEffect(() => {
    // console.log("user data, authState", user, isAuthenticated);
    toggleLoginOrRegisterPageAux();
  }, [isAuthenticated]);

  const toggleDisplayDropDown = () => {
    console.log("EIII");
    if (displayDropdown === "none") setDisplayDropdown("flex");
    else setDisplayDropdown("none");
  };

  const closeDisplayDropDown = () => {
    if (displayDropdown !== "none") setDisplayDropdown("none");
  };

  const toggleDisplayDropDownNotification = () => {
    if (displayDropdownNotification === "none")
      setDisplayDropdownNotification("flex");
    else setDisplayDropdownNotification("none");
  };

  const closeDisplayDropDownNotification = () => {
    if (displayDropdownNotification !== "none")
      setDisplayDropdownNotification("none");
  };

  const handleSignout = (e: any) => {
    e.preventDefault();
    console.log("EI , OU !!!");
    signout();
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
          onBlur={(e: any) => {
            closeDisplayDropDown();
            closeDisplayDropDownNotification();
          }}
          className={`${styles["lista-navegacao"]}`}
        >
          {(loginOrRegisterPageAux === "/" ||
            loginOrRegisterPageAux === "/register") &&
            !isAuthenticated && (
              <li
                tabIndex={1}
                className={`${styles["item-navegacao"]}`}
                onClick={() => {
                  toggleLoginOrRegisterPageAux();
                }}
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
              <li
                tabIndex={1}
                ref={refDropdownNotification}
                className={`${styles["item-navegacao"]}`}
              >
                {thisDayHasMoreThanZeroTask ? (
                  <img
                    src={YellowBell}
                    onClick={toggleDisplayDropDownNotification}
                    style={{
                      cursor: "pointer",
                    }}
                    alt={"Yellow Notifications Bell - hoje há tarefas"}
                  />
                ) : (
                  <img
                    src={WhiteBell}
                    onClick={toggleDisplayDropDownNotification}
                    style={{
                      cursor: "pointer",
                    }}
                    alt={
                      "White Notifications Bell - Não há notificações de hoje"
                    }
                  />
                )}
                <NotificationDropdown
                  displayDropdownNotification={displayDropdownNotification}
                />
              </li>
              <li
                tabIndex={1}
                className={`${styles["item-navegacao"]} ${styles["user-name-login"]}`}
              >
                {user?.login}
              </li>
              <li
                title={"Opções: logout"}
                ref={refDropdown}
                className={`${styles["item-navegacao"]} ${styles["item-container-icon-user"]}`}
                style={{
                  position: "relative",
                  marginRight: `${windowDimensions.width >= 490 ? "" : "35px"}`,
                }}
              >
                <img
                  title={"Abrir opções"}
                  src={UserNavigationWithArrow}
                  className={`${styles["user-navigation-icon"]}`}
                  onClick={toggleDisplayDropDown}
                  style={{
                    width: `${windowDimensions.width < 360 ? "45px" : ""}`,
                    cursor: "pointer",
                    marginRight: `${
                      windowDimensions.width > 490 ? "" : "10px"
                    }`,
                    marginLeft: `${windowDimensions.width > 490 ? "" : "8px"}`,
                  }}
                  alt={"User Navigation Icon"}
                />
                <div
                  title={"Botão de logout"}
                  tabIndex={1}
                  onClick={handleSignout}
                  style={{
                    position: "absolute",
                    display: `${displayDropdown}`,
                    zIndex: "1500",
                    backgroundColor: "#eee",
                    marginTop: "2px",
                    width: "150px",
                    right: "30px",
                    padding: "0",
                    boxShadow: "0 0 5px 1px #bbb",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      padding: "2px",
                      cursor: "pointer",
                      textAlign: "center",

                      width: "inherit",
                      textDecoration: "none",
                      backgroundColor: "red",
                    }}
                  >
                    Sair
                  </span>
                </div>
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
            to={`${isAuthenticated ? "/adagio/home" : "/"}`}
            onClick={() => {
              setLoginOrRegisterPageAux("/register");
              setTriggerAlignCurrentMonth(!triggerAlignCurrentMonth);
              setTriggerUpdateCalendar(!triggerUpdateCalendar);
            }}
          >
            <img
              className={`${styles.adagio_logo}`}
              src={AdagioLogo}
              alt={"Adagio Logo"}
            />
          </Link>
          {showMessage()}
          {isAuthenticated ? (
            <ul
              className={`${styles["left-region-list-of-entities"]}`}
              style={{
                display: `${windowDimensions.width > 490 ? "" : "none"}`,
              }}
            >
              <Link
                to="/adagio/projetos"
                onClick={() => {
                  setTriggerToSearchProjectsAgain(
                    !triggerToSearchProjectsAgain
                  );
                }}
              >
                Projetos
              </Link>

              <Link to="/adagio/calendario">Calendário</Link>
            </ul>
          ) : null}
        </div>

        {verifyCurrentUserState()}
        {returnConfirmationModal()}
      </header>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
