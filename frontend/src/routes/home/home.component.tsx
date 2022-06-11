import AdagioSideBar from "../../components/adagio-sidebar/adagio_sidebar.component";
import Calendar from "../../components/calendar/calendar.component";
import { AuthContext } from "../../contexts/auth.context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import styles from "./home.module.scss";

const itemsNav = [
  {
    category: "create_register_option",
    label: "Criar projetos",
    link: "/criar_projetos",
  },
  {
    category: "create_register_option",
    label: "Criar tarefas",
    link: "/criar_tarefas",
  },
  {
    category: "calendar_export",
    label: "Exportar calendário",
    link: "/exportar_calendario",
  },
];

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return !isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <main className={`${styles.main_content_home}`}>
      <AdagioSideBar itemsNav={itemsNav} />
      <Calendar />
    </main>
  );
};

export default Home;
