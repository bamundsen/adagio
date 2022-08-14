import commonStyles from "../../utils/common_styles.module.scss";
import { Spinner } from "react-bootstrap";
import { SpinnerState } from "../../utils/spinner_type";
import { useEffect, useLayoutEffect, useState } from "react";

interface AdagioSpinnerProps {
  loadingState?: SpinnerState;
  downloadRelatoryIndicator?: boolean;
}

const AdagioSpinner = ({
  loadingState,
  downloadRelatoryIndicator,
}: AdagioSpinnerProps) => {
  const [auxLoadingState, setAuxLoadingState] = useState(loadingState);

  useLayoutEffect(() => {
    setAuxLoadingState(loadingState);
  }, [loadingState]);

  useEffect(() => {
    console.log("SPINNER DE DOWNLOAD", downloadRelatoryIndicator);
  }, [downloadRelatoryIndicator]);

  return downloadRelatoryIndicator ? (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.4)",
        position: "fixed",
        zIndex: 10000,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      EI OU !!!!!!!!!!!!
      <Spinner
        animation="border"
        role="status"
        className={commonStyles.spinner_download}
      ></Spinner>
    </div>
  ) : auxLoadingState === SpinnerState.There_is_no_content ? (
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
