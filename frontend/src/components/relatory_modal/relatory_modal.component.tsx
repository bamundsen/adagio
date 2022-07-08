import { Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import LinkSideBarIcon from "../../assets/link_sidebar_icon.svg";
import style from "./relatory_modal.module.scss";

interface RelatoryModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dayOfModal: Date | null;
  completeWeekDays: string[];
  months: string[];
}

const RelatoryModal = ({
  modalIsOpen,
  dayOfModal,
  setModalIsOpen,
  completeWeekDays,
  months,
}: RelatoryModalProps) => {
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
          onClick={() => {
            setModalIsOpen(false);
          }}
          className={`${style.close_modal_button}`}
        >
          X
        </div>
      </Modal.Header>
      <Modal.Body className={`${style.body_modal}`}>
        <h2 className={`${style.body_modal_title}`}>Tarefas de hoje: </h2>

        <ul>
          <li>Conversa com o dentista (14:20)</li>
        </ul>
      </Modal.Body>
      <Modal.Footer className={`${style.footer_modal}`}>
        <Link
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
