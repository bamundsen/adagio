import commonStyles from "../../utils/common_styles.module.scss";
import { Spinner } from "react-bootstrap";

const AdagioSpinner = () => {
  return (
    <div className={commonStyles.spinner_container}>
      <Spinner
        animation="border"
        role="status"
        className={commonStyles.spinner}
      ></Spinner>
    </div>
  );
};

export default AdagioSpinner;
