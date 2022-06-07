import CalendarSideBar from "../../assets/calendar_sidebar_icon.svg";
import LinkSideBarIcon from "../../assets/link_sidebar_icon.svg";
import HamburgerSideBar from "../../assets/hamburger_sidebar.svg";
import styles from "./adagio_sidebar.module.scss";
import { Link } from "react-router-dom";

interface AdagioSideBarProps {
  itemsNav: any[];
}
const AdagioSideBar = ({ itemsNav }: AdagioSideBarProps) => {
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
  return (
    <nav className={`${styles.navigation_sidebar}`}>
      <img
        src={HamburgerSideBar}
        alt={"Hamburger sidebar"}
        className={`${styles.hamburger_icon}`}
      />
      <ul className={`${styles.nav_options}`}>
        {itemsNav.map((itemNav, index) => (
          <li
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
