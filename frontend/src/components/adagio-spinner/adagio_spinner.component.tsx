import commonStyles from "../../utils/common_styles.module.scss";
import { Spinner } from "react-bootstrap";

interface AdagioSpinnerProps {
  thereIsNoData?: boolean;
}

const AdagioSpinner = ({ thereIsNoData }: AdagioSpinnerProps) => {
  return thereIsNoData ? (
    <div className={commonStyles.there_is_content_in_the_data}>
      Não há dados a serem exibidos
    </div>
  ) : (
    <div className={commonStyles.spinner_container}>
      VISH
      <Spinner
        animation="border"
        role="status"
        className={commonStyles.spinner}
      ></Spinner>
    </div>
  );
};

export default AdagioSpinner;
