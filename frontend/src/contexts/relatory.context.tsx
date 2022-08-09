import React, { createContext, useEffect, useState } from "react";
import { ExportCalendarType } from "../types/ExportCalendarType";

export type RelatoryContextType = {
  exportCalendarType: ExportCalendarType | null;
  setExportCalendarType: React.Dispatch<
    React.SetStateAction<ExportCalendarType | null>
  >;
  valueReferenceToSearch: number[] | string | string[];
  setValueReferenceToSearch: React.Dispatch<
    React.SetStateAction<number[] | string | string[]>
  >;
  triggerToUpdateButtonAndValue: boolean;
  changeTriggerToUpdateButtonAndValue: () => void;
};

export const RelatoryContext = createContext<RelatoryContextType>(null!);

export const RelatoryProvider = ({ children }: { children: JSX.Element }) => {
  const [exportCalendarType, setExportCalendarType] =
    useState<ExportCalendarType | null>(null);
  const [valueReferenceToSearch, setValueReferenceToSearch] = useState<
    number[] | string | string[]
  >("");
  const [triggerToUpdateButtonAndValue, setTriggerToUpdateButtonAndValue] =
    useState(false);

  useEffect(() => {
    console.log(exportCalendarType);
    console.log(valueReferenceToSearch);
  }, [valueReferenceToSearch, exportCalendarType]);

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
