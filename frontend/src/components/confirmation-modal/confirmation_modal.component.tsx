import { Button, Modal } from "react-bootstrap";
import styles from "./confirmation_modal.module.scss";
import commonStyles from "./../../utils/common_styles.module.scss";
import { tabEnterClickEffect } from "../../utils/acessibilityAux";
import { CalendarContext } from "../../contexts/calendar.context";
import { useContext } from "react";
import { act } from "react-dom/test-utils";
import ModalHeader from "../modal-header/modal_header.component";
import NegativeButtonModal from "../negative-button-modal/negative_button_modal.component";

interface ConfirmationModalProps {
  functionToPositiveConfirmationExecuteById?: (id: number | undefined) => void;
  idToOperation?: number;
  confirmDownload?: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  isBasicConfirmation?: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  titleConfirmationMessage: string;
  explanationMessage: string;
  colorFlagNegativeButton: string;
}

const ConfirmationModal = ({
  functionToPositiveConfirmationExecuteById,
  idToOperation,
  isBasicConfirmation,
  confirmDownload,
  isModalOpen,
  colorFlagNegativeButton,
  setModalIsOpen,
  explanationMessage,
  titleConfirmationMessage,
}: ConfirmationModalProps) => {
  return (
    <Modal show={isModalOpen}>
      <ModalHeader
        message={titleConfirmationMessage}
        setModalIsOpen={setModalIsOpen}
      />
      <Modal.Body>{explanationMessage}</Modal.Body>
      <Modal.Footer>
        <div className={commonStyles.confirmation_modal_buttons_container}>
          {!isBasicConfirmation && (
            <NegativeButtonModal setModalIsOpen={setModalIsOpen} text={"Não"} />
          )}
          <Button
            tabIndex={1}
            style={{ marginLeft: "25px" }}
            onClick={() => {
              setModalIsOpen(false);

              if (functionToPositiveConfirmationExecuteById && idToOperation) {
                functionToPositiveConfirmationExecuteById(idToOperation);
              }

              if (confirmDownload) {
                confirmDownload(true);
              }
            }}
            variant={colorFlagNegativeButton}
          >
            {isBasicConfirmation ? "OK" : "Sim"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
