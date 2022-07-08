import AdagioSideBar from "../../components/adagio-sidebar/adagio_sidebar.component";
import Calendar from "../../components/calendar/calendar.component";
import { AuthContext } from "../../contexts/auth.context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import commonStyles from "../../utils/common_styles.module.scss";
import sideBarData from "../../utils/sideBarData";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return !isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <main className={`${commonStyles.main_content}`}>
      <AdagioSideBar itemsNav={sideBarData} />
      <Calendar
        isToShowChangeYearOption={false}
        isToShowChangeMonthOption={false}
        isToShowChangeFormatOption={false}
        isToShowAllOptionsOfCalendar={true}
      />
    </main>
  );
};

export default Home;
