import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { convertToObject } from "typescript";
import AdagioSideBar from "../../../components/adagio-sidebar/adagio_sidebar.component";
import AdagioSpinner from "../../../components/adagio-spinner/adagio_spinner.component";
import ModalHeader from "../../../components/modal-header/modal_header.component";
import NegativeButtonModal from "../../../components/negative-button-modal/negative_button_modal.component";
import RegionPaginationButtons from "../../../components/region-pagination-buttons/region_pagination_buttons.component";
import { TaskContext } from "../../../contexts/task.context";
import { Task } from "../../../types/TaskType";
import styles from "./choose_tasks_modal.module.scss";
import commonStyles from "../../../utils/common_styles.module.scss";
import { SpinnerState } from "../../../utils/spinner_type";
import { extractFormattedDateTime } from "../../../utils/returnShowableDateAndHour";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

interface ChooseTasksModalProps {
  isModalOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIdsTasksWithAcumulatedSelected: (ids: number[]) => void;
  isTaskSelected: (id: number) => boolean;
  projectIdIfItIsToEdit: string | undefined;
  auxSelectedTasks: number[];
  setAuxSelectedTasks: React.Dispatch<React.SetStateAction<number[]>>;
  equalizeAuxSelectedTasksToIdsTasks: () => void;
}

const ChooseTasksModal = ({
  equalizeAuxSelectedTasksToIdsTasks,
  auxSelectedTasks,
  setAuxSelectedTasks,
  setIdsTasksWithAcumulatedSelected,
  projectIdIfItIsToEdit,
  isTaskSelected,
  isModalOpen,
  setModalIsOpen,
}: ChooseTasksModalProps) => {
  const { getTasksWithNoProjectByTitle } = useContext(TaskContext);
  const [tasksToShow, setTasksToShow] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(SpinnerState.Pending);
  const [searchString, setSearchString] = useState("");
  const [searchStringAux, setSearchStringAux] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [isLast, setIsLast] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const [requestWasDone, setRequestWasDone] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      getTasksWithNoProjectByTitle(
        searchString,
        projectIdIfItIsToEdit,
        page,
        size
      ).then((response: any) => {
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

        setRequestWasDone(true);
        if (response?.content) {
          setTasksToShow(response.content);
        }
      });
    }
  }, [isModalOpen, page, size, searchString]);

  useEffect(() => {
    if (tasksToShow.length > 0) {
      setIsLoaded(SpinnerState.Finished);
    } else if (requestWasDone) {
      setIsLoaded(SpinnerState.There_is_no_content);
    }
  }, [tasksToShow]);

  const addOrRemoveSelectedOrUnselected = (id: number, marked: boolean) => {
    if (!auxSelectedTasks.includes(id) && marked) {
      setAuxSelectedTasks([...auxSelectedTasks, id]);
    } else if (auxSelectedTasks.includes(id) && !marked) {
      setAuxSelectedTasks([
        ...auxSelectedTasks.filter((s: number) => s !== id),
      ]);
    }
  };

  const decrementPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const incrementPage = () => {
    setPage(page + 1);
  };

  const returnSpinner = () => {
    return <AdagioSpinner loadingState={isLoaded} />;
  };

  return (
    <Modal show={isModalOpen}>
      <ModalHeader
        message={"Escolha tarefas para o projeto"}
        resetStateOfAuxState={equalizeAuxSelectedTasksToIdsTasks}
        setModalIsOpen={setModalIsOpen}
      />

      <Modal.Body className={`${commonStyles.body_modal}`}>
        <section>
          <Form.Control
            type="search"
            onInput={(e: any) => {
              setSearchStringAux(e.target.value);

              if (e.target.value.trim() === "") {
                setSearchString(e.target.value);
              }
            }}
            onKeyDown={(e: any) => {
              if (e.code.toLowerCase().trim() === "enter") {
                setSearchString(searchStringAux);
              }
            }}
            title={"Pesquise por uma tarefa, teclando ENTER "}
            placeholder="Pesquise por uma tarefa, teclando ENTER "
          ></Form.Control>
        </section>
        {isLoaded === SpinnerState.Finished && (
          <>
            <section>
              {tasksToShow.map((task: Task) => {
                const dateTimeStartToShow = extractFormattedDateTime(
                  task.dateTimeStart
                );
                return (
                  <div key={task.id + task.title}>
                    <Form.Group
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "0",
                      }}
                      className="mb-1"
                    >
                      <Form.Control
                        value={task.id}
                        id={`task-${task.id}`}
                        type="checkbox"
                        defaultChecked={
                          task.id !== undefined
                            ? isTaskSelected(task.id)
                            : false
                        }
                        style={{
                          width: "22px",
                          height: "18px",
                        }}
                        onClick={(e: any) => {
                          console.log(e.target.value);
                          addOrRemoveSelectedOrUnselected(
                            Number(e.target.value),
                            e.target.checked
                          );
                        }}
                      />
                      <Form.Label
                        htmlFor={`task-${task.id}`}
                        style={{
                          display: "flex",
                          marginTop: "8px",
                          marginLeft: "8px",
                          alignItems: "center",
                        }}
                      >
                        {task.title}
                        <span style={{ color: "blue", paddingLeft: "8px" }}>
                          {" "}
                          {` (${dateTimeStartToShow})`}
                        </span>
                      </Form.Label>
                    </Form.Group>
                  </div>
                );
              })}
            </section>
          </>
        )}

        <RegionPaginationButtons
          isFirst={isFirst}
          isLast={isLast}
          decrementFunction={decrementPage}
          incrementFunction={incrementPage}
        />
        {returnSpinner()}
      </Modal.Body>

      <Modal.Footer>
        <div className={commonStyles.confirmation_modal_buttons_container}>
          <NegativeButtonModal
            setModalIsOpen={setModalIsOpen}
            resetStateOfAuxState={equalizeAuxSelectedTasksToIdsTasks}
            text={"Cancelar"}
          />
          <Button
            tabIndex={1}
            style={{ marginLeft: "25px" }}
            onClick={() => {
              setIdsTasksWithAcumulatedSelected(auxSelectedTasks);
              setModalIsOpen(false);
            }}
            variant="success"
          >
            {"Salvar"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ChooseTasksModal;
