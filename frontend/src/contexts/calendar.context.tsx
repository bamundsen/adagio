import { createContext, useState } from "react";

export type CalendarContextType = {
  triggerAlignCurrentMonth: boolean;
  setTriggerAlignCurrentMonth: React.Dispatch<React.SetStateAction<boolean>>;
  setTriggerUpdateCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  triggerUpdateCalendar: boolean;
};

export const CalendarContext = createContext<CalendarContextType>(null!);

export const CalendarProvider = ({ children }: { children: JSX.Element }) => {
  const [triggerAlignCurrentMonth, setTriggerAlignCurrentMonth] =
    useState(false);
  const [triggerUpdateCalendar, setTriggerUpdateCalendar] = useState(false);

  const value: CalendarContextType = {
    setTriggerAlignCurrentMonth,

    triggerAlignCurrentMonth,
    setTriggerUpdateCalendar,
    triggerUpdateCalendar,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};
