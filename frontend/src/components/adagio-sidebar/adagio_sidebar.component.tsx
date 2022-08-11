import CalendarSideBar from "../../assets/calendar_sidebar_icon.svg";
import LinkSideBarIcon from "../../assets/link_sidebar_icon.svg";
import HamburgerSideBar from "../../assets/hamburger_sidebar.svg";
import styles from "./adagio_sidebar.module.scss";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import useWindowDimensions from "../../utils/useWindowDimensions.utils";
import { AuthContext } from "../../contexts/auth.context";
import { ProjectContext } from "../../contexts/project.context";
import { RelatoryContext } from "../../contexts/relatory.context";
import { ExportCalendarType } from "../../types/ExportCalendarType";
import { tabEnterClickEffect } from "../../utils/acessibilityAux";

interface AdagioSideBarProps {
  itemsNav: any[];
}
const AdagioSideBar = ({ itemsNav }: AdagioSideBarProps) => {
  const {
    exportCalendarType,
    triggerToUpdateButtonAndValue,
    setModalConfirmationDownloadIsOpen,
    changeTriggerIsToRequestAndGenerateExcel,
  } = useContext(RelatoryContext);
  const windowDimensions = useWindowDimensions();
  const [hideSideBar, setHideSideBar] = useState(false);
  const {
    isToRestartFormAgain,
    setIsToRestartFormAgain,
    setTriggerToSearchProjectsAgain,
    triggerToSearchProjectsAgain,
  } = useContext(ProjectContext);

  const activeTriggerIsToRequestAndGenerateExcel = (e: any) => {
    changeTriggerIsToRequestAndGenerateExcel();
    setModalConfirmationDownloadIsOpen(true);
  };

  const returnCalendarExportTrigger = (message: string, link: string) => {
    return (
      <div
        onClick={activeTriggerIsToRequestAndGenerateExcel}
        className={`${styles.generate_relatory} ${styles.link_nav} `}
        onMouseOver={(e: any) => {
          e.target.style.color = "#fff";
          e.target.style.padding = "0";
        }}
        onMouseOut={(e: any) => {
          e.target.style.color = "#000";
        }}
        onKeyDown={tabEnterClickEffect}
        tabIndex={1}
        style={{ cursor: "pointer", display: "flex", flexDirection: "row" }}
      >
        <img
          src={CalendarSideBar}
          alt={"export calendar option"}
          style={{ paddingRight: "12px", height: "32px" }}
        />
        {message}
      </div>
    );
  };

  const generateRelatoryTrigger = (item: any) => {
    if (exportCalendarType === ExportCalendarType.EXPORT_TASKS_OF_MONTH) {
      return returnCalendarExportTrigger(
        "Gerar relatório das tarefas do mês",
        item.link
      );
    } else if (exportCalendarType === ExportCalendarType.EXPORT_TASKS_OF_YEAR) {
      return returnCalendarExportTrigger(
        "Gerar relatório das tarefas desse ano",
        item.link
      );
    } else if (
      exportCalendarType === ExportCalendarType.EXPORT_PROJECTS_OF_PAGE
    ) {
      return returnCalendarExportTrigger(
        "Gerar relatório desses projetos",
        item.link
      );
    } else if (
      exportCalendarType === ExportCalendarType.EXPORT_TASKS_OF_PAGE_AND_PROJECT
    ) {
      return returnCalendarExportTrigger(
        "Gerar relatório dessas tarefas",
        item.link
      );
    } else {
      return null;
    }
  };

  const returnItemDependsOnCategory = (item: any) => {
    if (item.category.toLowerCase() === "calendar_export") {
      return generateRelatoryTrigger(item);
    } else if (item.category.toLowerCase() === "create_register_option") {
      return (
        <Link
          onClick={() => {
            setIsToRestartFormAgain(!isToRestartFormAgain);
          }}
          className={`${styles.link_nav}`}
          to={item.link}
        >
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
        minWidth: `${hideSideBar ? "50px" : ""}`,

        width: `${hideSideBar ? "50px" : ""}`,
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
              <Link
                className={`${styles.link_nav}`}
                to={"/adagio/projetos"}
                onClick={() => {
                  setTriggerToSearchProjectsAgain(
                    !triggerToSearchProjectsAgain
                  );
                }}
              >
                <img src={LinkSideBarIcon} alt={"create register option"} />
                <span>{"Projetos"}</span>
              </Link>
            </li>
            <li>
              <Link className={`${styles.link_nav}`} to={"/adagio/calendario"}>
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
