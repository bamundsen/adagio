import AdagioSideBar from "../../components/adagio-sidebar/adagio_sidebar.component";
import sideBarData from "../../utils/sideBarData";
import commonStyles from "../../utils/common_styles.module.scss";
import styles from "./tasks_management.module.scss";
import { useParams } from "react-router-dom";

const TasksManagement = () => {
  const { id } = useParams();
  console.log("id projeto " + id);
  return (
    <main className={`${commonStyles.main_content}`}>
      <AdagioSideBar itemsNav={sideBarData} />
      <section>Gerenciamento de tarefas</section>
    </main>
  );
};

export default TasksManagement;
