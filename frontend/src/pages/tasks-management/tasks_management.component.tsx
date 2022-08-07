import AdagioSideBar from "../../components/adagio-sidebar/adagio_sidebar.component";
import sideBarData from "../../utils/sideBarData";
import commonStyles from "../../utils/common_styles.module.scss";
import styles from "./tasks_management.module.scss";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Task } from "../../types/TaskType";
import { ProjectContext } from "../../contexts/project.context";
import { Button, Table } from "react-bootstrap";
import AdagioSpinner from "../../components/adagio-spinner/adagio_spinner.component";
import { BsFillPenFill, BsTrash } from "react-icons/bs";
import { TaskContext } from "../../contexts/task.context";
import ConfirmationModal from "../../components/confirmation-modal/confirmation_modal.component";
import { SpinnerState } from "../../utils/spinner_type";
import RegionPaginationButtons from "../../components/region-pagination-buttons/region_pagination_buttons.component";

const TasksManagement = () => {
  const { getTasksByProject } = useContext(ProjectContext);
  const { deleteTask, triggerToSearchTasksAgainAfterDelete } =
    useContext(TaskContext);
  const { idProject } = useParams();
  const [tasks, setTasks] = useState<any[] | Task[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoaded, setIsLoaded] = useState(SpinnerState.Pending);
  const [confirmationModalIsOpen, setModalConfirmationIsOpen] = useState(false);
  const [idOfElementToDeleteForModal, setIdOfElementToDeleteForModel] =
    useState<number>();
  const [requestWasDone, setRequestWasDone] = useState(false);

  useEffect(() => {
    if (idProject !== undefined) {
      getTasksByProject(Number(idProject), size, page).then((response: any) => {
        if (response.last) {
          setIsLast(true);
        } else {
          setIsLast(false);
        }

        if (response.first) {
          setIsFirst(true);
        } else {
          setIsFirst(false);
        }
        setTotalPages(response.totalPages);
        setRequestWasDone(true);
        setTasks(response.content);
      });
    }
  }, [page, size, isFirst, isLast, triggerToSearchTasksAgainAfterDelete]);

  useEffect(() => {
    if (tasks.length > 0) {
      setIsLoaded(SpinnerState.Finished);
    } else if (requestWasDone) {
      setIsLoaded(SpinnerState.There_is_no_content);
    }
  }, [tasks]);

  const decrementPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const incrementPage = () => {
    setPage(page + 1);
  };

  const deleteTaskById = (id: number | undefined) => {
    if (id) {
      deleteTask(id).then((response: any) => {
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
        functionToPositiveConfirmationExecuteById={deleteTaskById}
        idToOperation={idOfElementToDeleteForModal}
        titleConfirmationMessage={"Realmente deseja deletar essa tarefa ?"}
        explanationMessage={"Essa tarefa será definitivamente excluída."}
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
              <th>Está acabada</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {isLoaded === SpinnerState.Finished &&
              tasks?.map((task: Task) => {
                return (
                  <tr key={task.id + task.title}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.finishedStatus ? "Sim" : "Não"}</td>
                    <td>
                      <BsFillPenFill
                        onClick={() => {
                          // goToEdit(project);
                        }}
                        style={{ cursor: "pointer", color: "#227711" }}
                      />
                    </td>
                    <td>
                      <BsTrash
                        onClick={() => {
                          if (task.id !== undefined) {
                            setIdOfElementToDeleteForModel(task.id);
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
          decrementFunction={decrementPage}
          incrementFunction={incrementPage}
        />
      </section>
      {returnConfirmationModal()}
    </main>
  );
};

export default TasksManagement;
