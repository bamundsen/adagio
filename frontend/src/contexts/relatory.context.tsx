import React, { createContext, useEffect, useState } from "react";
import { RelatoryApi } from "../hooks/relatoryApi";
import { ExportCalendarType } from "../types/ExportCalendarType";

export type RelatoryContextType = {
  exportCalendarType: ExportCalendarType | null;
  setExportCalendarType: React.Dispatch<
    React.SetStateAction<ExportCalendarType | null>
  >;
  valueReferenceToSearch: any;
  setValueReferenceToSearch: React.Dispatch<React.SetStateAction<any>>;
  triggerToUpdateButtonAndValue: boolean;
  changeTriggerToUpdateButtonAndValue: () => void;
};

export const RelatoryContext = createContext<RelatoryContextType>(null!);

export const RelatoryProvider = ({ children }: { children: JSX.Element }) => {
  const [exportCalendarType, setExportCalendarType] =
    useState<ExportCalendarType | null>(null);
  const [valueReferenceToSearch, setValueReferenceToSearch] = useState<any>("");
  const [triggerToUpdateButtonAndValue, setTriggerToUpdateButtonAndValue] =
    useState(false);

  const relatoryApi = RelatoryApi();

  useEffect(() => {
    console.log(exportCalendarType);
    console.log(valueReferenceToSearch);
  }, [valueReferenceToSearch, exportCalendarType]);

  const getByMonth = async () => {
    let year: number = Number(valueReferenceToSearch[0]);
    let month: number = Number(valueReferenceToSearch[1]);
    const response = await relatoryApi.getByMonth(month, year);

    return response;
  };

  const changeTriggerToUpdateButtonAndValue = () => {
    setTriggerToUpdateButtonAndValue(!triggerToUpdateButtonAndValue);
  };

  const value: RelatoryContextType = {
    changeTriggerToUpdateButtonAndValue,
    triggerToUpdateButtonAndValue,
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
