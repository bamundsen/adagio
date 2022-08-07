import commonStyles from "../../utils/common_styles.module.scss";
import { Spinner } from "react-bootstrap";
import { SpinnerState } from "../../utils/spinner_type";
import { useEffect, useLayoutEffect, useState } from "react";

interface AdagioSpinnerProps {
  loadingState: SpinnerState;
}

const AdagioSpinner = ({ loadingState }: AdagioSpinnerProps) => {
  const [auxLoadingState, setAuxLoadingState] = useState(loadingState);

  useLayoutEffect(() => {
    setAuxLoadingState(loadingState);
  }, [loadingState]);

  return auxLoadingState === SpinnerState.There_is_no_content ? (
    <div className={commonStyles.there_is_content_in_the_data}>
      Não há dados a serem exibidos
    </div>
  ) : auxLoadingState === SpinnerState.Pending ? (
    <div className={commonStyles.spinner_container}>
      <Spinner
        animation="border"
        role="status"
        className={commonStyles.spinner}
      ></Spinner>
    </div>
  ) : (
    <></>
  );
};

export default AdagioSpinner;
