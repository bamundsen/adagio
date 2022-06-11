import moment from "moment";

import styles from "./calendar.module.scss";
import { useEffect, useState } from "react";
import Month from "./month/month.component";

const Calendar = () => {
  const [currentYear, setCurrentYear] = useState(2022);
  const [occupiedDates, setOccupiedDates] = useState<any[]>([]);
  const [isToShowOneMonth, setIsToShowOneMonth] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const months = [
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
  const monthsAuxEnglish = [
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

  moment.updateLocale("pt", {
    months: [
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
    ],
  });

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
            month={months[currentMonth]}
            isToShowOneMonth={isToShowOneMonth}
            monthAux={monthsAuxEnglish[currentMonth]}
            currentYear={currentYear}
          />
        ) : (
          months.map((value, i) => (
            <Month
              key={value}
              occupiedDates={occupiedDates}
              setOccupiedDates={setOccupiedDates}
              month={value}
              monthAux={monthsAuxEnglish[i]}
              currentYear={currentYear}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Calendar;
