import { useEffect, useState } from "react";
import styles from "./day.module.scss";

interface DayProps {
  day: any;
  monthAux: string;
  isToShowOneMonth?: boolean;
  occupiedDates: any[];
  setDayOfModal: React.Dispatch<React.SetStateAction<Date | null>>;
  setOccupiedDates: React.Dispatch<React.SetStateAction<any[]>>;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  month: string;
  year: number;
}
const Day = ({
  day,
  month,
  year,
  monthAux,
  setDayOfModal,
  occupiedDates,
  setModalIsOpen,
  setOccupiedDates,
  isToShowOneMonth,
}: DayProps) => {
  const [stateOfDay, setStateOfDay] = useState("");
  const [dayToCompare, setDayToCompare] = useState(day._d);
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
    console.log(`day: ${day._d.getMonth()}, ${day._d.getDay()}`);
    setDayOfModal(day._d);
    setModalIsOpen(true);
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
        className={`${
          day._d.getDate() === new Date().getDate() &&
          day._d.getMonth() === new Date().getMonth()
            ? styles.current_day
            : null
        }`}
        style={{ padding: !isToShowOneMonth ? "4px" : undefined }}
      >
        {day.format("DD").toString()}
      </span>
    </div>
  );
};

export default Day;
