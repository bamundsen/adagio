import { triggerAsyncId } from "async_hooks";
import React, { useContext, useEffect, useState } from "react";
import { CalendarContext } from "../../../contexts/calendar.context";
import { TaskContext } from "../../../contexts/task.context";
import styles from "./day.module.scss";

interface DayProps {
  day: any;
  monthAux: string;
  isToShowOneMonth?: boolean;
  occupiedDates: any[];
  setDayOfModal: React.Dispatch<React.SetStateAction<Date | null>>;
  setOccupiedDates: React.Dispatch<React.SetStateAction<any[]>>;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDateToSearch: React.Dispatch<React.SetStateAction<string>>;
  setDateTimeFinalToSearch: React.Dispatch<React.SetStateAction<string>>;
  month: string;
  year: number;
}
const Day = ({
  day,
  month,
  year,
  monthAux,
  setDateTimeFinalToSearch,
  setDayOfModal,
  occupiedDates,
  setModalIsOpen,
  setDateToSearch,
  setOccupiedDates,
  isToShowOneMonth,
}: DayProps) => {
  const [stateOfDay, setStateOfDay] = useState("");
  const [dayToCompare, setDayToCompare] = useState(day._d);
  const { getColorThatIsToBeShowed } = useContext(TaskContext);
  const { triggerUpdateCalendar, setTriggerUpdateCalendar } =
    useContext(CalendarContext);
  const [color, setColor] = useState("");

  useEffect(() => {
    console.log("EI EI EI");
    getColorThatIsToBeShowed(
      returnThisDateWithHour("00:00:00"),
      returnThisDateWithHour("23:59:59")
    ).then((response: any) => {
      if (response.colorThatIsToBeShowed !== null) {
        setColor(response.colorThatIsToBeShowed);
      }
    });
  }, [triggerUpdateCalendar]);

  useEffect(() => {
    const currentMonth = new Date(month + ",01," + year).getMonth();

    // if (dayToCompare.getMonth() === 5) {
    //   setOccupiedDates([...occupiedDates, dayToCompare]);
    // }
    if (dayToCompare.getMonth() !== currentMonth) {
      setStateOfDay("nonPertenceMonth");
    }
  }, [month, year, dayToCompare]);

  const verifyStateAndReturnCss = () => {
    if (
      occupiedDates.find((value) => value.getTime() === dayToCompare.getTime())
    ) {
      return {
        backgroundColor: " #FE2821",
        color: "#fff",
        flex: isToShowOneMonth ? "1" : "",
        height: isToShowOneMonth ? "50px" : "",
      };
    } else if (stateOfDay === "nonPertenceMonth") {
      return {
        opacity: 0.3,
        cursor: "default",
        flex: isToShowOneMonth ? "1" : "",
        height: isToShowOneMonth ? "50px" : "",
      };
    }

    return {
      flex: isToShowOneMonth ? "1" : "",
      height: isToShowOneMonth ? "50px" : "",
    };
  };

  const handleClickDate = () => {
    setDayOfModal(day._d);
    formDateToSearch();
    setModalIsOpen(true);
  };

  const formDateToSearch = () => {
    setDateToSearch(`${returnThisDateWithHour("00:00:00")}`);
    setDateTimeFinalToSearch(`${returnThisDateWithHour("23:59:59")}`);
  };

  const returnThisDateWithHour = (hour: string) => {
    return `${String(day._d.getFullYear()).padStart(2, "0")}-${String(
      day._d.getMonth() + 1
    ).padStart(2, "0")}-${String(day._d.getDate()).padStart(2, "0")}T${hour}`;
  };

  const returnClassName = () => {
    if (
      day._d.getDate() === new Date().getDate() &&
      day._d.getMonth() === new Date().getMonth() &&
      day._d.getFullYear() === new Date().getFullYear()
    ) {
      return styles.current_day;
    } else if (stateOfDay !== "nonPertenceMonth") {
      if (color === "RED") {
        return styles.critical_day;
      } else if (color === "GREEN") {
        return styles.high_day;
      } else if (color === "BLUE") {
        return styles.regular_day;
      } else if (color === "GRAY") {
        return styles.low_day;
      }
    }
  };

  return (
    <div
      className={`${styles.day_of_month}`}
      onClick={() => {
        handleClickDate();
      }}
      style={verifyStateAndReturnCss()}
    >
      <span
        className={`${returnClassName()}`}
        style={{ padding: !isToShowOneMonth ? "4px" : undefined }}
      >
        {day.format("DD").toString()}
      </span>
    </div>
  );
};

export default Day;
