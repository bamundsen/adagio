import { useEffect, useState } from "react";
import styles from "./day.module.scss";

interface DayProps {
  day: any;
  monthAux: string;
  isToShowOneMonth?: boolean;
  occupiedDates: any[];
  setOccupiedDates: React.Dispatch<React.SetStateAction<any[]>>;
  month: string;
  year: number;
}
const Day = ({
  day,
  month,
  year,
  monthAux,
  occupiedDates,
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
    if (stateOfDay === "") {
      setStateOfDay("selected");
    } else if (stateOfDay === "selected") {
      setStateOfDay("");
    }
  };

  return (
    <div
      className={`${styles.day_of_month}`}
      onClick={handleClickDate}
      style={verifyStateAndReturnCss()}
    >
      {day.format("DD").toString()}
    </div>
  );
};

export default Day;
