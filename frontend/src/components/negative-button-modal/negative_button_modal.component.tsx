import { Button } from "react-bootstrap";

interface NegativeButtonModalProps {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resetStateOfAuxState?: () => void;
  text: string;
}
const NegativeButtonModal = ({
  setModalIsOpen,
  resetStateOfAuxState,
  text,
}: NegativeButtonModalProps) => {
  return (
    <Button
      tabIndex={1}
      onClick={() => {
        if (resetStateOfAuxState) {
          resetStateOfAuxState();
        }
        setModalIsOpen(false);
      }}
      variant="light"
    >
      {text}
    </Button>
  );
};

export default NegativeButtonModal;
