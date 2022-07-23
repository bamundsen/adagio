import AdagioSideBar from "../../components/adagio-sidebar/adagio_sidebar.component";
import commonStyles from "../../utils/common_styles.module.scss";
import styles from "./projects_management.module.scss";
import sideBarData from "../../utils/sideBarData";
import { BsFillPenFill } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { Button, Table } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { ProjectContext } from "../../contexts/project.context";
import { Project } from "../../types/Project";
import { useNavigate } from "react-router-dom";

const ProjectsManagement = () => {
  const navigate = useNavigate();
  const { projects, page, setPage, deleteProject } = useContext(ProjectContext);

  const decrementPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const incrementPage = () => {
    setPage(page + 1);
  };

  const goToEdit = (project: Project) => {
    navigate(`/adagio/editar_projeto/${project.id}`);
  };

  const deleteProjectById = (id: number) => {
    deleteProject(id).then((response: any) => {
      console.log(response);
    });
  };

  return (
    <main className={`${commonStyles.main_content}`}>
      <AdagioSideBar itemsNav={sideBarData} />
      <section style={{ flex: 1 }}>
        <Table striped hover bordered>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: Project) => {
              console.log(project);

              return (
                <tr key={project?.id + project?.title}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td className={styles.operation_area}>
                    <BsFillPenFill
                      onClick={() => {
                        goToEdit(project);
                      }}
                      style={{ cursor: "pointer", color: "#227711" }}
                    />
                  </td>
                  <td className={styles.operation_area}>
                    <BsTrash
                      onClick={() => {
                        if (project.id !== undefined)
                          deleteProjectById(project.id);
                      }}
                      style={{ cursor: "pointer", color: "#ff1209" }}
                    ></BsTrash>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <section className={styles.container_buttons}>
          <Button
            onClick={() => {
              decrementPage();
            }}
            className={styles.pagination_projects_button}
          >
            Anterior
          </Button>
          <Button
            onClick={() => {
              incrementPage();
            }}
            className={styles.pagination_projects_button}
          >
            Próximo
          </Button>
        </section>
      </section>
    </main>
  );
};

export default ProjectsManagement;
