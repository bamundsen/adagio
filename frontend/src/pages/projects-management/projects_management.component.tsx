import AdagioSideBar from "../../components/adagio-sidebar/adagio_sidebar.component";
import { Button, Pagination, Spinner, Table } from "react-bootstrap";
import commonStyles from "../../utils/common_styles.module.scss";
import styles from "./projects_management.module.scss";
import sideBarData from "../../utils/sideBarData";
import { BsFillPenFill } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ProjectContext } from "../../contexts/project.context";
import { Project } from "../../types/ProjectType";
import { Link, useNavigate } from "react-router-dom";
import AdagioSpinner from "../../components/adagio-spinner/adagio_spinner.component";
import ConfirmationModal from "../../components/confirmation-modal/confirmation_modal.component";
import { SpinnerState } from "../../utils/spinner_type";
import RegionPaginationButtons from "../../components/region-pagination-buttons/region_pagination_buttons.component";
import { RelatoryContext } from "../../contexts/relatory.context";
import { ExportCalendarType } from "../../types/ExportCalendarType";

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
  const {
    setExportCalendarType,
    exportCalendarType,
    setValueReferenceToSearch,
  } = useContext(RelatoryContext);
  const [projects, setProjects] = useState<any[] | Project[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(8);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [isLoaded, setIsLoaded] = useState(SpinnerState.Pending);
  const [totalPages, setTotalPages] = useState(0);
  const [paginationAux, setPaginationAux] = useState<number[]>([]);
  const [confirmationModalIsOpen, setModalConfirmationIsOpen] = useState(false);
  const [idOfElementToDeleteForModal, setIdOfElementToDeleteForModel] =
    useState<number>();
  const [requestWasDone, setRequestWasDone] = useState(false);

  useEffect(() => {
    getProjects(size, page).then((response: any) => {
      console.log(`total pages: ${totalPages}`);
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
      setTotalPages(response?.totalPages);
      setRequestWasDone(true);
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
      setIsLoaded(SpinnerState.Finished);
    } else if (requestWasDone) {
      setIsLoaded(SpinnerState.There_is_no_content);
    }
  }, [projects]);

  useLayoutEffect(() => {
    setExportCalendarType(ExportCalendarType.EXPORT_PROJECTS_OF_PAGE);
  }, []);

  useEffect(() => {
    if (exportCalendarType === ExportCalendarType.EXPORT_PROJECTS_OF_PAGE) {
      setValueReferenceToSearch([size, page]);
    }
  }, [exportCalendarType]);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < totalPages; i++) {
      arr[i] = i;
    }

    setPaginationAux([...arr]);
  }, [totalPages]);

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
    return <AdagioSpinner loadingState={isLoaded} />;
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
      <section style={{ flex: 1, overflowX: "auto" }}>
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
            {isLoaded === SpinnerState.Finished &&
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
                        tabIndex={1}
                        onClick={() => {
                          goToEdit(project);
                        }}
                        style={{ cursor: "pointer", color: "#227711" }}
                      />
                    </td>
                    <td className={styles.operation_area}>
                      <BsTrash
                        tabIndex={1}
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

        {returnSpinner()}

        <RegionPaginationButtons
          isFirst={isFirst}
          isLast={isLast}
          incrementFunction={incrementPage}
          decrementFunction={decrementPage}
        />
      </section>
      {returnConfirmationModal()}
    </main>
  );
};

export default ProjectsManagement;
