import AdagioSideBar from "../../components/adagio-sidebar/adagio_sidebar.component";
import commonStyles from "../../utils/common_styles.module.scss";
import styles from "./projects_management.module.scss";
import sideBarData from "../../utils/sideBarData";
import { BsFillPenFill } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { Button, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../contexts/project.context";
import { Project } from "../../types/Project";
import { Link, useNavigate } from "react-router-dom";

const ProjectsManagement = () => {
  const navigate = useNavigate();
  const {
    getProjects,
    deleteProject,
    triggerToSearchProjectsAgain,
    setTriggerToSearchProjectsAgain,
    triggerToSearchProjectsAgainAfterRegister,
    triggerToSearchProjectsAgainAfterDelete,
  } = useContext(ProjectContext);

  const [projects, setProjects] = useState<any[] | Project[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    getProjects(size, page).then((response: any) => {
      if (response?.last) {
        setIsLast(true);
      } else {
        setIsLast(false);
      }

      if (response?.first) {
        setIsFirst(true);
      } else {
        setIsFirst(false);
      }

      setProjects(response?.content);
    });
  }, [
    page,
    size,
    isFirst,
    isLast,
    triggerToSearchProjectsAgain,
    triggerToSearchProjectsAgainAfterRegister,
    triggerToSearchProjectsAgainAfterDelete,
  ]);

  useEffect(() => {
    setPage(0);
  }, [triggerToSearchProjectsAgainAfterRegister]);

  useEffect(() => {
    if (projects !== undefined) {
      setTriggerToSearchProjectsAgain(!triggerToSearchProjectsAgain);
    }
  }, []);

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
              <th>Progresso</th>
              <th>Tarefas</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project: Project) => {
              return (
                <tr key={project?.id + project?.title}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{project?.progress}</td>
                  <td>
                    <Link to="#">Gerenciar tarefas</Link>
                  </td>
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
          {!isFirst ? (
            <Button
              onClick={() => {
                decrementPage();
              }}
              className={styles.pagination_projects_button}
            >
              Anterior
            </Button>
          ) : null}

          {!isLast ? (
            <Button
              onClick={() => {
                incrementPage();
              }}
              className={styles.pagination_projects_button}
            >
              Próximo
            </Button>
          ) : null}
        </section>
      </section>
    </main>
  );
};

export default ProjectsManagement;
