import { Button, Modal } from "react-bootstrap";
import styles from "./confirmation_modal.module.scss";
import commonStyles from "./../../utils/common_styles.module.scss";

interface ConfirmationModalProps {
  functionToPositiveConfirmationExecuteById?: (id: number | undefined) => void;
  idToOperation?: number;
  isModalOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  titleConfirmationMessage: string;
  explanationMessage: string;
}

const ConfirmationModal = ({
  functionToPositiveConfirmationExecuteById,
  idToOperation,
  isModalOpen,
  setModalIsOpen,
  explanationMessage,
  titleConfirmationMessage,
}: ConfirmationModalProps) => {
  return (
    <Modal show={isModalOpen}>
      <Modal.Header style={{ padding: "10px" }}>
        <h4
          className={`${commonStyles.title_modal}`}
          style={{
            paddingLeft: "0",
            marginLeft: "0",
            alignItems: "flex-start",

            fontWeight: "400",
          }}
        >
          {titleConfirmationMessage}
        </h4>
        <div
          tabIndex={1}
          onClick={() => {
            setModalIsOpen(false);
          }}
          className={`${commonStyles.close_modal_button}`}
        >
          X
        </div>
      </Modal.Header>
      <Modal.Body>{explanationMessage}</Modal.Body>
      <Modal.Footer>
        <div className={styles.confirmation_modal_buttons_container}>
          <Button
            tabIndex={1}
            onClick={() => {
              setModalIsOpen(false);
            }}
            variant="light"
          >
            Não
          </Button>
          <Button
            tabIndex={1}
            style={{ marginLeft: "25px" }}
            onClick={() => {
              setModalIsOpen(false);

              if (functionToPositiveConfirmationExecuteById && idToOperation) {
                functionToPositiveConfirmationExecuteById(idToOperation);
              }
            }}
            variant="danger"
          >
            Sim
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
