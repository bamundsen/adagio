import commonStyles from "../../utils/common_styles.module.scss";
import { Spinner } from "react-bootstrap";
import { SpinnerState } from "../../utils/spinner_type";
import { useEffect, useLayoutEffect, useState } from "react";

interface AdagioSpinnerProps {
  loadingState?: SpinnerState;
  downloadRelatoryIndicator?: boolean;
  optionalDefinedText?: string;
}

const AdagioSpinner = ({
  loadingState,
  optionalDefinedText,
  downloadRelatoryIndicator,
}: AdagioSpinnerProps) => {
  const [auxLoadingState, setAuxLoadingState] = useState(loadingState);

  useLayoutEffect(() => {
    setAuxLoadingState(loadingState);
  }, [loadingState]);

  return downloadRelatoryIndicator ? (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.7)",
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
      <Spinner
        animation="border"
        role="status"
        className={commonStyles.spinner_download}
      ></Spinner>
    </div>
  ) : auxLoadingState === SpinnerState.There_is_no_content ? (
    <div className={commonStyles.there_is_content_in_the_data}>
      {"Não há dados a serem exibidos"}
      {optionalDefinedText !== undefined ? optionalDefinedText : null}
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
