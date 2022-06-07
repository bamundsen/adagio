import AdagioSideBar from "../../components/adagio-sidebar/adagio_sidebar.component";
import { AuthContext } from "../../contexts/auth.context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

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
    <main>
      <AdagioSideBar itemsNav={itemsNav} />
    </main>
  );
};

export default Home;
