import { setDefaultResultOrder } from "dns";
import { useContext, useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import LinkSideBarIcon from "../../assets/link_sidebar_icon.svg";
import { TaskContext } from "../../contexts/task.context";
import { Task } from "../../types/TaskType";
import AdagioSpinner from "../adagio-spinner/adagio_spinner.component";
import style from "./relatory_modal.module.scss";

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
  const { listByStartDateTimeFilter } = useContext(TaskContext);
  const [tasksToShow, setTasksToShow] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [thereIsNoData, setThereIsNoData] = useState(false);
  const { deleteById } = useContext(TaskContext);
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

  const deleteTaskById = (id: number) => {
    deleteById(id).then((response: any) => {
      console.log(response);
      if (response.status === 200) {
        setTriggerToSearchTasksAgain(!triggerToSearchTasksAgain);
      }
    });
  };

  useEffect(() => {
    if (tasksToShow.length > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
      setThereIsNoData(true);
    }
  }, [tasksToShow]);

  const returnSpinner = () => {
    return <AdagioSpinner thereIsNoData={thereIsNoData} />;
  };

  return (
    <Modal show={modalIsOpen}>
      <Modal.Header>
        <h2 className={`${style.title_modal_relatory}`}>
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
          onClick={() => {
            setModalIsOpen(false);
          }}
          className={`${style.close_modal_button}`}
        >
          X
        </div>
      </Modal.Header>
      <Modal.Body className={`${style.body_modal}`}>
        <h2 className={`${style.body_modal_title}`}>Tarefas</h2>

        <ul>
          {isLoaded &&
            tasksToShow.map((task: any, i) => {
              return (
                <li key={task.title + task.hourAndMinute + i}>
                  <span>
                    {task.title} ({task.hourAndMinute})
                  </span>
                  <BsTrash
                    onClick={() => {
                      deleteTaskById(task.id);
                    }}
                    style={{ cursor: "pointer", color: "#ff1209" }}
                  />
                </li>
              );
            })}
        </ul>

        {!isLoaded && returnSpinner()}
      </Modal.Body>
      <Modal.Footer className={`${style.footer_modal}`}>
        <Link
          tabIndex={1}
          to="/criar_tarefa"
          className={`${style.footer_modal_create_task_link}`}
        >
          <img
            className={`${style.footer_modal_create_task_link_icon}`}
            src={LinkSideBarIcon}
            alt={"Link para criar tarefa"}
          />
          <span>Criar tarefa</span>
        </Link>
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
    </Modal>
  );
};

export default RelatoryModal;
