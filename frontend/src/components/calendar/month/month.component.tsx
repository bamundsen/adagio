import moment from "moment";
import "moment/locale/pt";
import { useEffect, useState } from "react";
import style from "./month.module.scss";
import Day from "../day/day.component";
import ArrowToRight from "../../../assets/arrow_to_right.svg";
import ArrowToLeft from "../../../assets/arrow_to_left.svg";

interface MonthProps {
  occupiedDates: any[];
  setOccupiedDates: React.Dispatch<React.SetStateAction<any[]>>;
  isToShowOneMonth?: boolean;
  month: string;
  monthAux: string;
  currentYear: number;
}

const Month = ({
  month,
  currentYear,
  monthAux,
  occupiedDates,
  isToShowOneMonth,
  setOccupiedDates,
}: MonthProps) => {
  const [value, setValue] = useState(
    moment().locale("pt").month(month).year(currentYear)
  );

  const [calendar, setCalendar] = useState<any[]>([]);

  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
  const weekDaysForOneMonth = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  useEffect(() => {
    const startDay = value.clone().startOf("month").startOf("week");
    const endDay = value.clone().endOf("month").startOf("week");
    const day = startDay.clone().subtract(1, "day");
    const arrayCalendar: any[] = [];
    while (day.isBefore(endDay, "day")) {
      arrayCalendar.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }

    setCalendar([...arrayCalendar]);
  }, [value]);

  useEffect(() => {}, [calendar]);

  return (
    <div
      className={`${style.month_card}`}
      style={{
        width: isToShowOneMonth ? "88%" : "",
        display: isToShowOneMonth ? "flex" : "",

        border: isToShowOneMonth ? "none" : "",
        boxShadow: isToShowOneMonth ? "none" : "",
        flexDirection: isToShowOneMonth ? "column" : undefined,
      }}
    >
      <div
        className={`${style.month_card_header}`}
        style={{
          marginBottom: isToShowOneMonth ? "30px" : "",
          display: isToShowOneMonth ? "flex" : "",
          justifyContent: isToShowOneMonth ? "space-between" : "",
          fontSize: isToShowOneMonth ? "1.5rem" : "",
        }}
      >
        {isToShowOneMonth ? (
          <>
            <img
              className={style.icon_arrow_calendar}
              src={ArrowToLeft}
              alt={"arrow to left of calendar"}
            />
            {month + ` ${currentYear}`}
            <img
              className={style.icon_arrow_calendar}
              src={ArrowToRight}
              alt={"arrow to right of calendar"}
            />
          </>
        ) : (
          month + ` ${currentYear}`
        )}
      </div>
      <div
        className={`${style.month_card_week_days}`}
        style={{
          display: isToShowOneMonth ? "flex" : "",
          border: isToShowOneMonth ? "none" : "",
        }}
      >
        {isToShowOneMonth
          ? weekDaysForOneMonth.map((value) => (
              <div
                className={`${style.month_card_week_day}`}
                style={{ flex: "1" }}
              >
                {value.toUpperCase()}
              </div>
            ))
          : weekDays.map((value) => (
              <div className={`${style.month_card_week_day}`}>{value}</div>
            ))}
      </div>
      {calendar.map((week: any, i) => (
        <div
          className={`${style.month_card_week}`}
          key={week + `${Math.random() * 1} ${i}`}
          style={{
            display: isToShowOneMonth ? "flex" : "",
            flex: isToShowOneMonth ? "1" : "",
          }}
        >
          {week.map((day: any) => (
            <Day
              key={day._d.getTime() + month}
              day={day}
              occupiedDates={occupiedDates}
              isToShowOneMonth={isToShowOneMonth}
              setOccupiedDates={setOccupiedDates}
              month={month}
              monthAux={monthAux}
              year={currentYear}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Month;
