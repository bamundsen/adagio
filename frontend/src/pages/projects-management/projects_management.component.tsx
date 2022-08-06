import AdagioSideBar from "../../components/adagio-sidebar/adagio_sidebar.component";
import commonStyles from "../../utils/common_styles.module.scss";
import styles from "./projects_management.module.scss";
import sideBarData from "../../utils/sideBarData";
import { BsFillPenFill } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { Button, Spinner, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../contexts/project.context";
import { Project } from "../../types/ProjectType";
import { Link, useNavigate } from "react-router-dom";
import AdagioSpinner from "../../components/adagio-spinner/adagio_spinner.component";
import ConfirmationModal from "../../components/confirmation-modal/confirmation_modal.component";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [thereIsNoData, setThereIsNoData] = useState(false);
  const [confirmationModalIsOpen, setModalConfirmationIsOpen] = useState(false);
  const [idOfElementToDeleteForModal, setIdOfElementToDeleteForModel] =
    useState<number>();

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
    if (projects.length > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
      setThereIsNoData(true);
    }
  }, [projects]);

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

  const deleteProjectById = (id: number | undefined) => {
    if (id) {
      deleteProject(id).then((response: any) => {
        console.log(response);
      });
    }
  };

  const returnSpinner = () => {
    return <AdagioSpinner thereIsNoData={thereIsNoData} />;
  };

  const returnConfirmationModal = () => {
    return (
      <ConfirmationModal
        functionToPositiveConfirmationExecuteById={deleteProjectById}
        idToOperation={idOfElementToDeleteForModal}
        titleConfirmationMessage={"Realmente deseja deletar esse projeto ?"}
        explanationMessage={
          "Todas as tarefas vinculadas a esse projeto serão excluídas"
        }
        isModalOpen={confirmationModalIsOpen}
        setModalIsOpen={setModalConfirmationIsOpen}
      />
    );
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
            {isLoaded &&
              projects?.map((project: Project) => {
                return (
                  <tr key={project?.id + project?.title}>
                    <td>{project.title}</td>
                    <td>{project.description}</td>
                    <td>{project?.progress}</td>
                    <td>
                      <Link to={`/adagio/projetos/${project.id}/tarefas`}>
                        Gerenciar tarefas
                      </Link>
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
                          if (project.id !== undefined) {
                            setIdOfElementToDeleteForModel(project.id);
                            setModalConfirmationIsOpen(true);
                          }
                        }}
                        className={commonStyles.trash_button_delete}
                        style={{ cursor: "pointer", color: "#ff1209" }}
                      ></BsTrash>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        {!isLoaded && returnSpinner()}

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
      {returnConfirmationModal()}
    </main>
  );
};

export default ProjectsManagement;
