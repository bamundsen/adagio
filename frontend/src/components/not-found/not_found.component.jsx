import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import commonStyles from "../../utils/common_styles.module.scss";
import AdagioSideBar from "../adagio-sidebar/adagio_sidebar.component";
import sideBarData from "../../utils/sideBarData";

const NotFound = () => {
  return (
    <main className={`${commonStyles.main_content}`}>
      <AdagioSideBar itemsNav={sideBarData} />
      <div className={`${commonStyles.common_pattern}`}>
        <h2>Página não encontrada</h2>
      </div>
    </main>
  );
};

export default NotFound;
