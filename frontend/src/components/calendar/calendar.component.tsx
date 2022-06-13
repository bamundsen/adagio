import moment from "moment";

import styles from "./calendar.module.scss";
import { useEffect, useState } from "react";
import Month from "./month/month.component";

const monthsAux = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const Calendar = () => {
  const [currentYear, setCurrentYear] = useState(2022);
  const [occupiedDates, setOccupiedDates] = useState<any[]>([]);
  const [isToShowOneMonth, setIsToShowOneMonth] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [monthToSend, setMonthToSend] = useState(months[currentMonth]);

  useEffect(() => {
    setMonthToSend(months[currentMonth]);
  }, [currentMonth]);

  /*
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  */

  return (
    <section className={`${styles.calendar_set}`}>
      <div
        className={`${!isToShowOneMonth ? styles.calendar_content : null}`}
        style={{
          display: isToShowOneMonth ? "flex" : "",

          height: isToShowOneMonth ? "inherit" : "",
          justifyContent: isToShowOneMonth ? "center" : "",
          alignItems: isToShowOneMonth ? "center" : "",
        }}
      >
        {isToShowOneMonth ? (
          <Month
            occupiedDates={occupiedDates}
            setOccupiedDates={setOccupiedDates}
            month={monthToSend}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            isToShowOneMonth={isToShowOneMonth}
            monthAux={monthsAux[currentMonth]}
            currentYear={currentYear}
          />
        ) : (
          months.map((value, i) => (
            <Month
              key={value}
              occupiedDates={occupiedDates}
              setOccupiedDates={setOccupiedDates}
              month={value}
              monthAux={monthsAux[i]}
              currentYear={currentYear}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Calendar;
