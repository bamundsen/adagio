import { setDefaultResultOrder } from "dns";
import { useContext, useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { BsFillPenFill, BsTrash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import LinkSideBarIcon from "../../assets/link_sidebar_icon.svg";
import { TaskContext } from "../../contexts/task.context";
import { Task } from "../../types/TaskType";
import AdagioSpinner from "../adagio-spinner/adagio_spinner.component";
import style from "./relatory_modal.module.scss";
import commonStyles from "./../../utils/common_styles.module.scss";
import ConfirmationModal from "../confirmation-modal/confirmation_modal.component";
import { tabEnterClickEffect } from "../../utils/acessibilityAux";

interface RelatoryModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dayOfModal: Date | null;
  completeWeekDays: string[];
  dateFinalToSearch: string;
  dateToSearch: string;
  months: string[];
}

const RelatoryModal = ({
  modalIsOpen,
  dateToSearch,
  dateFinalToSearch,
  dayOfModal,
  setModalIsOpen,
  completeWeekDays,
  months,
}: RelatoryModalProps) => {
  const navigate = useNavigate();
  const { listByStartDateTimeFilter } = useContext(TaskContext);
  const [tasksToShow, setTasksToShow] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [thereIsNoData, setThereIsNoData] = useState(false);
  const { deleteById } = useContext(TaskContext);
  const [idToConfirmationModal, setIdToConfirmationModal] = useState<number>();
  const [triggerToSearchTasksAgain, setTriggerToSearchTasksAgain] =
    useState(false);

  useEffect(() => {
    if (modalIsOpen) {
      listByStartDateTimeFilter(dateToSearch, dateFinalToSearch).then(
        (response: any) => {
          setTasksToShow([
            ...response.data.map((task: Task) => {
              const title = task.title;
              const dateTimeStart = new Date(task.dateTimeStart);
              const id = task.id;
              const hourAndMinute = `${String(
                dateTimeStart.getHours()
              ).padStart(2, "0")}:${String(dateTimeStart.getMinutes()).padStart(
                2,
                "0"
              )}`;

              return { id, title, hourAndMinute };
            }),
          ]);

          if (response.data.length > 0) {
            setIsLoaded(true);
          } else if (response.data.length === 0) {
            setThereIsNoData(true);
          }
        }
      );
    }
  }, [modalIsOpen, triggerToSearchTasksAgain]);

  useEffect(() => {
    if (tasksToShow.length > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
      setThereIsNoData(true);
    }
  }, [tasksToShow]);

  const deleteTaskById = (id: number | undefined) => {
    if (id) {
      deleteById(id).then((response: any) => {
        console.log(response);
        if (response.status === 200) {
          setTriggerToSearchTasksAgain(!triggerToSearchTasksAgain);
        }
      });
    }
  };

  const goToCreateTask = () => {
    navigate(`/adagio/cadastrar_tarefa`);
  };

  const returnSpinner = () => {
    return <AdagioSpinner thereIsNoData={thereIsNoData} />;
  };

  const returnConfirmationModal = () => {
    return (
      <ConfirmationModal
        isModalOpen={isConfirmationModalOpen}
        setModalIsOpen={setIsConfirmationModalOpen}
        explanationMessage="Qualquer notificação associada a essa tarefa será deletada"
        titleConfirmationMessage="Deseja realmente deletar essa tarefa ?"
        idToOperation={idToConfirmationModal}
        functionToPositiveConfirmationExecuteById={deleteTaskById}
      />
    );
  };

  return (
    <Modal show={modalIsOpen}>
      <Modal.Header>
        <h2 className={`${commonStyles.title_modal}`}>
          <Modal.Title>
            {`${dayOfModal?.getDate()} de ${
              months[dayOfModal !== null ? dayOfModal?.getMonth() : 0]
            } de ${dayOfModal?.getFullYear()}
              `}
          </Modal.Title>
          <span className={`${style.title_modal_relatory_weekday}`}>
            {`${
              completeWeekDays[dayOfModal !== null ? dayOfModal?.getDay() : 0]
            }`}
          </span>

          <span className={`${style.title_modal_relatory_available_time}`}>
            Tempo disponível: 3 horas e 40 minutos
          </span>
        </h2>

        <div
          tabIndex={1}
          onKeyDown={tabEnterClickEffect}
          onClick={() => {
            setModalIsOpen(false);
          }}
          className={`${commonStyles.close_modal_button}`}
        >
          X
        </div>
      </Modal.Header>
      <Modal.Body className={`${commonStyles.body_modal}`}>
        <h2 className={`${style.body_modal_title}`}>Tarefas</h2>

        <ul>
          {isLoaded &&
            tasksToShow.map((task: any, i) => {
              return (
                <li key={task.title + task.hourAndMinute + i}>
                  <span>
                    {task.title} ({task.hourAndMinute})
                  </span>
                  <BsFillPenFill
                    tabIndex={1}
                    onKeyDown={tabEnterClickEffect}
                    title="Esse botão redirecionará você para a tela de edição dessa tarefa"
                    onClick={() => {
                      alert("Essa feature ainda será implementada !");
                    }}
                    style={{
                      cursor: "pointer",
                      color: "#227711",
                      margin: "16px",
                    }}
                  />
                  <BsTrash
                    tabIndex={1}
                    onKeyDown={tabEnterClickEffect}
                    title="Esse botão irá causar a deleção da tarefa"
                    onClick={() => {
                      setIsConfirmationModalOpen(true);
                      setIdToConfirmationModal(task.id);
                    }}
                    style={{
                      cursor: "pointer",
                      color: "#ff1209",
                      margin: "16px",
                    }}
                  />
                </li>
              );
            })}
        </ul>

        {!isLoaded && returnSpinner()}
      </Modal.Body>
      <Modal.Footer className={`${commonStyles.footer_modal}`}>
        <span
          title="Isso levará para a tela de cadastro de tarefa"
          tabIndex={1}
          onClick={() => {
            goToCreateTask();
          }}
          className={`${style.footer_modal_create_task_link}`}
        >
          <img
            className={`${style.footer_modal_create_task_link_icon}`}
            src={LinkSideBarIcon}
            alt={"Link para criar tarefa"}
          />
          <span>Criar tarefa</span>
        </span>
        <div className={`${style.footer_modal_set_free_day}`}>
          <span>Dia Livre</span>

          <Form.Check
            tabIndex={1}
            className={`${style.footer_modal_set_free_day_checkbox}`}
            type={"checkbox"}
            id={`disabled-default-checkbox`}
          />
        </div>
      </Modal.Footer>
      {returnConfirmationModal()}
    </Modal>
  );
};

export default RelatoryModal;
