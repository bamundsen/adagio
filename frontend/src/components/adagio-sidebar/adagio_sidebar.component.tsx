import CalendarSideBar from "../../assets/calendar_sidebar_icon.svg";
import LinkSideBarIcon from "../../assets/link_sidebar_icon.svg";
import HamburgerSideBar from "../../assets/hamburger_sidebar.svg";
import styles from "./adagio_sidebar.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import useWindowDimensions from "../../utils/useWindowDimensions.utils";

interface AdagioSideBarProps {
  itemsNav: any[];
}
const AdagioSideBar = ({ itemsNav }: AdagioSideBarProps) => {
  const windowDimensions = useWindowDimensions();
  const [hideSideBar, setHideSideBar] = useState(false);

  const returnItemDependsOnCategory = (item: any) => {
    if (item.category.toLowerCase() === "calendar_export") {
      return (
        <Link to={item.link}>
          <img src={CalendarSideBar} alt={"export calendar option"} />
          <span>{item.label}</span>
        </Link>
      );
    } else if (item.category.toLowerCase() === "create_register_option") {
      return (
        <Link to={item.link}>
          <img src={LinkSideBarIcon} alt={"create register option"} />
          <span>{item.label}</span>
        </Link>
      );
    }
  };

  const toggleHideSideBar = () => {
    setHideSideBar(!hideSideBar);
  };

  return (
    <nav
      className={`${styles.navigation_sidebar}`}
      style={{
        maxWidth: `${hideSideBar ? `150px` : ""}`,
      }}
    >
      <img
        onClick={toggleHideSideBar}
        src={HamburgerSideBar}
        alt={"Hamburger sidebar"}
        className={`${styles.hamburger_icon}`}
      />
      <ul
        className={`${styles.nav_options}`}
        style={{
          display: `${hideSideBar ? "none" : ""}`,
        }}
      >
        {windowDimensions.width <= 490 ? (
          <>
            <li>
              <Link to={"/projetos"}>
                <img src={LinkSideBarIcon} alt={"create register option"} />
                <span>{"Projetos"}</span>
              </Link>
            </li>
            <li>
              <Link to={"/calendário"}>
                <img src={LinkSideBarIcon} alt={"create register option"} />
                <span>{"Calendário"}</span>
              </Link>
            </li>
          </>
        ) : null}
        {itemsNav.map((itemNav, index) => (
          <li
            key={index}
            className={`${
              itemNav.category.toLowerCase() === "calendar_export"
                ? styles.calendar_export_link
                : null
            }`}
          >
            {returnItemDependsOnCategory(itemNav)}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdagioSideBar;
