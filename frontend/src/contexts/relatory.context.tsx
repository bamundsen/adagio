import React, { createContext, useEffect, useState } from "react";
import AdagioSpinner from "../components/adagio-spinner/adagio_spinner.component";
import ConfirmationModal from "../components/confirmation-modal/confirmation_modal.component";
import { RelatoryApi } from "../hooks/relatoryApi";
import { ExportCalendarType } from "../types/ExportCalendarType";

export type RelatoryContextType = {
  exportCalendarType: ExportCalendarType | null;
  setExportCalendarType: React.Dispatch<
    React.SetStateAction<ExportCalendarType | null>
  >;
  valueReferenceToSearch: any;
  setValueReferenceToSearch: React.Dispatch<React.SetStateAction<any>>;
  changeTriggerIsToRequestAndGenerateExcel: () => void;
  triggerToUpdateButtonAndValue: boolean;
  returnConfirmationModal: () => any;
  returnSpinnerIndicatorToWait: () => void;
  setModalConfirmationDownloadIsOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsToDownload: React.Dispatch<React.SetStateAction<boolean>>;
  changeTriggerToUpdateButtonAndValue: () => void;
};

export const RelatoryContext = createContext<RelatoryContextType>(null!);

export const RelatoryProvider = ({ children }: { children: JSX.Element }) => {
  const [exportCalendarType, setExportCalendarType] =
    useState<ExportCalendarType | null>(null);
  const [valueReferenceToSearch, setValueReferenceToSearch] = useState<any>("");
  const [triggerToUpdateButtonAndValue, setTriggerToUpdateButtonAndValue] =
    useState(false);
  const [
    triggerIsToRequestAndGenerateExcel,
    setTriggerIsToRequestAndGenerateExcel,
  ] = useState(false);
  const [modalConfirmationDownloadIsOpen, setModalConfirmationDownloadIsOpen] =
    useState(false);
  const [isToDownload, setIsToDownload] = useState(false);
  const [isToShowSpinnerIndicatorToWait, setIsToShowSpinnerIndicatorToWait] =
    useState(false);
  const relatoryApi = RelatoryApi();

  useEffect(() => {
    if (triggerIsToRequestAndGenerateExcel && isToDownload) {
      if (exportCalendarType === ExportCalendarType.EXPORT_TASKS_OF_MONTH) {
        getByMonth().then((response: any) => {
          setTriggerIsToRequestAndGenerateExcel(false);
          setIsToDownload(false);
        });
      } else if (
        exportCalendarType === ExportCalendarType.EXPORT_TASKS_OF_YEAR
      ) {
        getByYear().then((response: any) => {
          setTriggerIsToRequestAndGenerateExcel(false);
          setIsToDownload(false);
        });
      } else if (
        exportCalendarType === ExportCalendarType.EXPORT_TASKS_OF_DAY
      ) {
        getByDay().then((response: any) => {
          setTriggerIsToRequestAndGenerateExcel(false);
          setIsToDownload(false);
        });
      } else if (
        exportCalendarType === ExportCalendarType.EXPORT_PROJECTS_OF_PAGE
      ) {
        getProjectsByPage().then((response: any) => {
          console.log(response);
          setTriggerIsToRequestAndGenerateExcel(false);
          setIsToDownload(false);
        });
      } else if (
        exportCalendarType ===
        ExportCalendarType.EXPORT_TASKS_OF_PAGE_AND_PROJECT
      ) {
        getTasksByPageAndProject().then((response: any) => {
          console.log(response);
          setTriggerIsToRequestAndGenerateExcel(false);
          setIsToDownload(false);
        });
      }
    }
    setIsToDownload(false);
    setIsToShowSpinnerIndicatorToWait(false);
  }, [
    valueReferenceToSearch,
    exportCalendarType,
    triggerIsToRequestAndGenerateExcel,
    isToDownload,
  ]);

  useEffect(() => {
    if (isToDownload) {
      setIsToShowSpinnerIndicatorToWait(true);
    }
  }, [isToDownload]);

  const getByMonth = async () => {
    let month: number = Number(valueReferenceToSearch[0]);
    let year: number = Number(valueReferenceToSearch[1]);
    const response = await relatoryApi.getByMonth(month, year);

    return response;
  };

  const getByYear = async () => {
    let year = Number(valueReferenceToSearch);
    const response = await relatoryApi.getByYear(year);

    return response;
  };

  const getByDay = async () => {
    let startDateTime = valueReferenceToSearch[0];
    let endDateTime = valueReferenceToSearch[1];

    const response = await relatoryApi.getByDay(startDateTime, endDateTime);

    return response;
  };

  const getProjectsByPage = async () => {
    let size = valueReferenceToSearch[0];
    let page = valueReferenceToSearch[1];

    const response = await relatoryApi.getProjectsByPage(size, page);

    return response;
  };

  const getTasksByPageAndProject = async () => {
    let size = valueReferenceToSearch[0];
    let page = valueReferenceToSearch[1];
    let idProject = Number(valueReferenceToSearch[2]);

    const response = await relatoryApi.getTasksByPageAndProject(
      size,
      page,
      idProject
    );

    return response;
  };
  const changeTriggerToUpdateButtonAndValue = () => {
    setTriggerToUpdateButtonAndValue(!triggerToUpdateButtonAndValue);
  };

  const changeTriggerIsToRequestAndGenerateExcel = () => {
    setTriggerIsToRequestAndGenerateExcel(true);
  };

  const returnConfirmationModal = () => {
    return (
      <ConfirmationModal
        colorFlagNegativeButton="success"
        titleConfirmationMessage="Confirmação de download"
        explanationMessage="Dependendo da quantidade de registros, o download pode ser demorado. Deseja baixar ?"
        isModalOpen={modalConfirmationDownloadIsOpen}
        setModalIsOpen={setModalConfirmationDownloadIsOpen}
        confirmDownload={setIsToDownload}
      />
    );
  };

  const returnSpinnerIndicatorToWait = () => {
    if (isToShowSpinnerIndicatorToWait) {
      return <AdagioSpinner downloadRelatoryIndicator={true} />;
    }
  };

  const value: RelatoryContextType = {
    changeTriggerToUpdateButtonAndValue,
    triggerToUpdateButtonAndValue,
    returnSpinnerIndicatorToWait,
    setModalConfirmationDownloadIsOpen,
    returnConfirmationModal,
    setIsToDownload,
    changeTriggerIsToRequestAndGenerateExcel,
    exportCalendarType,
    setExportCalendarType,
    valueReferenceToSearch,
    setValueReferenceToSearch,
  };

  return (
    <RelatoryContext.Provider value={value}>
      {children}
    </RelatoryContext.Provider>
  );
};
