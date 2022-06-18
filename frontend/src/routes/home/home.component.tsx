import AdagioSideBar from "../../components/adagio-sidebar/adagio_sidebar.component";
import Calendar from "../../components/calendar/calendar.component";
import { AuthContext } from "../../contexts/auth.context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import styles from "./home.module.scss";
import sideBarData from "../../utils/sideBarData";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return !isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <main className={`${styles.main_content_home}`}>
      <AdagioSideBar itemsNav={sideBarData} />
      <Calendar
        isToShowChangeFormatOption={true}
        isToShowAllOptionsOfCalendar={true}
      />
    </main>
  );
};

export default Home;
