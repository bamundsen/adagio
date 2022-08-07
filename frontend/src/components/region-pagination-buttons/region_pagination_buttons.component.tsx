import { Button } from "react-bootstrap";
import commonStyles from "../../utils/common_styles.module.scss";

interface RegionPaginationButtonsProps {
  decrementFunction: () => void;
  incrementFunction: () => void;
  isFirst: boolean;
  isLast: boolean;
}
const RegionPaginationButtons = ({
  isFirst,
  isLast,
  decrementFunction,
  incrementFunction,
}: RegionPaginationButtonsProps) => {
  return (
    <section className={commonStyles.container_buttons}>
      {!isFirst ? (
        <Button
          title="Anterior"
          onClick={() => {
            decrementFunction();
          }}
          className={commonStyles.pagination_button}
        >
          Anterior
        </Button>
      ) : null}

      {!isLast ? (
        <Button
          title="Próximo"
          onClick={() => {
            incrementFunction();
          }}
          className={commonStyles.pagination_button}
        >
          Próximo
        </Button>
      ) : null}
    </section>
  );
};

export default RegionPaginationButtons;
