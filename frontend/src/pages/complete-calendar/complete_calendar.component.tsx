import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { Navigate } from "react-router-dom";
import commonStyles from "../../utils/common_styles.module.scss";
import sideBarData from "../../utils/sideBarData";
import AdagioSideBar from "../../components/adagio-sidebar/adagio_sidebar.component";
import Calendar from "../../components/calendar/calendar.component";

const CompleteCalendar = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return !isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <main className={`${commonStyles.main_content}`}>
      <AdagioSideBar itemsNav={sideBarData} />
      <Calendar />
    </main>
  );
};

export default CompleteCalendar;
