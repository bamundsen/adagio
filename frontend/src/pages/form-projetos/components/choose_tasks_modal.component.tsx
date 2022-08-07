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

interface ChooseTasksModalProps {
  isModalOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChooseTasksModal = ({
  isModalOpen,
  setModalIsOpen,
}: ChooseTasksModalProps) => {
  const { getTasksWithNoProjectByTitle } = useContext(TaskContext);
  const [tasksToShow, setTasksToShow] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(SpinnerState.Pending);
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [isLast, setIsLast] = useState(false);
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      getTasksWithNoProjectByTitle(searchString, page, size).then(
        (response: any) => {
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

          if (response?.content) {
            setTasksToShow(response.content);
          }
        }
      );
    }
  }, [isModalOpen, page, size]);

  useEffect(() => {
    if (tasksToShow.length > 0) {
      setIsLoaded(SpinnerState.Finished);
    } else {
      setIsLoaded(SpinnerState.There_is_no_content);
    }
  }, [tasksToShow]);

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
        setModalIsOpen={setModalIsOpen}
      />

      <Modal.Body className={`${commonStyles.body_modal}`}>
        {isLoaded === SpinnerState.Finished && (
          <section>
            {tasksToShow.map((task: Task) => {
              return (
                <div key={task.id + task.title}>
                  <Form.Group
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0",
                    }}
                    className="mb-1"
                    controlId="formBasicEmail"
                  >
                    <Form.Control
                      value={task.id}
                      type="checkbox"
                      style={{
                        width: "22px",
                        height: "18px",
                      }}
                      onClick={(e: any) => {
                        console.log(e.target.value);
                      }}
                    />
                    <Form.Label
                      style={{
                        display: "flex",
                        marginTop: "8px",
                        marginLeft: "8px",
                        alignItems: "center",
                      }}
                    >
                      {task.title}
                    </Form.Label>
                  </Form.Group>
                </div>
              );
            })}
          </section>
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
            text={"Cancelar"}
          />
          <Button
            tabIndex={1}
            style={{ marginLeft: "25px" }}
            onClick={() => {
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
