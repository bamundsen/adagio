import React, { createContext, useEffect, useState } from "react";
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
  const relatoryApi = RelatoryApi();

  useEffect(() => {
    console.log(exportCalendarType);
    console.log(valueReferenceToSearch);
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
      }
    }
  }, [
    valueReferenceToSearch,
    exportCalendarType,
    triggerIsToRequestAndGenerateExcel,
    isToDownload,
  ]);

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

  const value: RelatoryContextType = {
    changeTriggerToUpdateButtonAndValue,
    triggerToUpdateButtonAndValue,
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
