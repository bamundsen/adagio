import { Button } from "react-bootstrap";

interface NegativeButtonModalProps {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
}
const NegativeButtonModal = ({
  setModalIsOpen,
  text,
}: NegativeButtonModalProps) => {
  return (
    <Button
      tabIndex={1}
      onClick={() => {
        setModalIsOpen(false);
      }}
      variant="light"
    >
      {text}
    </Button>
  );
};

export default NegativeButtonModal;
