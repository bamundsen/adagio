import moment from "moment";
import { uid } from "react-uid";
import "moment/locale/pt";
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { CloseButton } from "react-bootstrap";
import { Button } from "react-bootstrap";
import style from "./month.module.scss";
import Day from "../day/day.component";
import ArrowToRight from "../../../assets/arrow_to_right.svg";
import ArrowToLeft from "../../../assets/arrow_to_left.svg";
import RelatoryModal from "../../relatory_modal/relatory_modal.component";
import months from "../../../utils/months";
import completeWeekDays from "../../../utils/weekDays";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { CalendarContext } from "../../../contexts/calendar.context";
import { tabEnterClickEffect } from "../../../utils/acessibilityAux";

interface MonthProps {
  occupiedDates: any[];
  setOccupiedDates: React.Dispatch<React.SetStateAction<any[]>>;
  isToShowOneMonth?: boolean;
  month: string;
  monthAux: string;
  setCurrentYear?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentMonth?: React.Dispatch<React.SetStateAction<number>>;
  currentMonth?: number;
  currentYear: number;
}

const Month = ({
  month,
  currentYear,
  monthAux,
  currentMonth,
  setCurrentYear,
  setCurrentMonth,
  occupiedDates,
  isToShowOneMonth,
  setOccupiedDates,
}: MonthProps) => {
  const [value, setValue] = useState(
    moment().locale("en").month(month).year(currentYear)
  );

  const [calendar, setCalendar] = useState<any[]>([]);

  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
  const weekDaysForOneMonth = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const [dayOfModal, setDayOfModal] = useState<Date | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const { triggerUpdateCalendar } = useContext(CalendarContext);
  const [dateToSearch, setDateToSearch] = useState("");
  const [dateFinalToSearch, setDateFinalToSearch] = useState("");

  useEffect(() => {
    updateCalendar();
  }, [value]);

  useEffect(() => {
    setValue(moment().locale("en").month(month).year(currentYear));
  }, [month, currentYear]);

  const updateCalendar = () => {
    const startDay = value.clone().startOf("month").startOf("week");
    const endDay = value.clone().endOf("month").endOf("week");
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
  };

  const decrementCurrentMonth = () => {
    console.log(currentMonth);
    if (
      currentMonth !== undefined &&
      setCurrentMonth &&
      currentMonth - 1 >= 0
    ) {
      console.log("decrementa");
      setCurrentMonth(currentMonth - 1);
    } else if (
      setCurrentMonth &&
      setCurrentYear &&
      currentMonth !== undefined &&
      currentMonth - 1 === -1
    ) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    }
  };

  const incrementCurrentMonth = () => {
    if (
      currentMonth !== undefined &&
      setCurrentMonth &&
      currentMonth + 1 <= 11
    ) {
      console.log("incrementa");
      setCurrentMonth(currentMonth + 1);
    } else if (
      currentMonth !== undefined &&
      setCurrentMonth &&
      setCurrentYear &&
      currentMonth + 1 === 12
    ) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    }
  };

  return (
    <div
      className={`${style.month_card}`}
      style={
        isToShowOneMonth
          ? {
              width: "88%",
              display: "flex",
              height: "95%",
              marginTop: "3%",
              border: "none",
              boxShadow: "none",
              flexDirection: "column",
            }
          : undefined
      }
    >
      <RelatoryModal
        months={months}
        dayOfModal={dayOfModal}
        modalIsOpen={modalIsOpen}
        dateToSearch={dateToSearch}
        dateFinalToSearch={dateFinalToSearch}
        setModalIsOpen={setModalIsOpen}
        completeWeekDays={completeWeekDays}
      />

      <div
        className={`${style.month_card_header}`}
        style={
          isToShowOneMonth
            ? {
                marginBottom: "30px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.5rem",
              }
            : undefined
        }
      >
        {isToShowOneMonth ? (
          <>
            <img
              onKeyDown={tabEnterClickEffect}
              tabIndex={1}
              onClick={decrementCurrentMonth}
              className={style.icon_arrow_calendar}
              src={ArrowToLeft}
              alt={"arrow to left of calendar"}
            />
            {monthAux + ` ${currentYear}`}
            <img
              onKeyDown={tabEnterClickEffect}
              tabIndex={1}
              onClick={incrementCurrentMonth}
              className={style.icon_arrow_calendar}
              src={ArrowToRight}
              alt={"arrow to right of calendar"}
            />
          </>
        ) : (
          monthAux + ` ${currentYear}`
        )}
      </div>
      <div
        className={`${style.month_card_week_days}`}
        style={
          isToShowOneMonth
            ? {
                display: "flex",
                border: "none",
              }
            : undefined
        }
      >
        {isToShowOneMonth
          ? weekDaysForOneMonth.map((value, i) => (
              <div
                key={uid(value + i)}
                className={`${style.month_card_week_day}`}
                style={{ flex: "1" }}
              >
                {value.toUpperCase()}
              </div>
            ))
          : weekDays.map((value, i) => (
              <div
                key={uid(value + i)}
                className={`${style.month_card_week_day}`}
              >
                {value}
              </div>
            ))}
      </div>
      {calendar.map((week: any, i) => (
        <div
          className={`${style.month_card_week}`}
          key={uid(`${week + i}`)}
          style={
            isToShowOneMonth
              ? {
                  display: "flex",
                  flex: "1",
                }
              : undefined
          }
        >
          {week.map((day: any) => (
            <Day
              key={uid(`${day}`)}
              day={day}
              setDateToSearch={setDateToSearch}
              setDateTimeFinalToSearch={setDateFinalToSearch}
              setDayOfModal={setDayOfModal}
              setModalIsOpen={setModalIsOpen}
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
