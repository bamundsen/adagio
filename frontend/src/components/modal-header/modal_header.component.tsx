import { Modal } from "react-bootstrap";
import { tabEnterClickEffect } from "../../utils/acessibilityAux";
import commonStyles from "../../utils/common_styles.module.scss";

interface ModalHeaderProps {
  message: string;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resetStateOfAuxState?: () => void;
}
const ModalHeader = ({
  message,
  setModalIsOpen,
  resetStateOfAuxState,
}: ModalHeaderProps) => {
  return (
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
        {message}
      </h4>
      <div
        tabIndex={1}
        onKeyDown={tabEnterClickEffect}
        onClick={() => {
          if (resetStateOfAuxState) {
            resetStateOfAuxState();
          }
          setModalIsOpen(false);
        }}
        className={`${commonStyles.close_modal_button}`}
      >
        X
      </div>
    </Modal.Header>
  );
};

export default ModalHeader;
