import moment from "moment";
import { Button, DropdownButton, Dropdown, Form } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./calendar.module.scss";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Month from "./month/month.component";
import { AuthContext } from "../../contexts/auth.context";
import { CalendarContext } from "../../contexts/calendar.context";
import { RelatoryContext } from "../../contexts/relatory.context";
import { ExportCalendarType } from "../../types/ExportCalendarType";

interface CalendarProps {
  isToShowChangeFormatOption?: boolean;
  isToShowChangeYearOption?: boolean;
  trigger?: boolean;
  isToShowAllOptionsOfCalendar?: boolean;
  isToShowChangeMonthOption?: boolean;
}
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

const Calendar = ({
  isToShowChangeFormatOption,
  isToShowAllOptionsOfCalendar,
  isToShowChangeYearOption,
  isToShowChangeMonthOption,
}: CalendarProps) => {
  const {
    setExportCalendarType,
    setValueReferenceToSearch,
    exportCalendarType,
    triggerToUpdateButtonAndValue,
    valueReferenceToSearch,
  } = useContext(RelatoryContext);
  const { trigger } = useContext(AuthContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [auxCurrentYear, setAuxCurrentYear] = useState(
    new Date().getFullYear()
  );

  const [occupiedDates, setOccupiedDates] = useState<any[]>([]);
  const [isToShowOneMonth, setIsToShowOneMonth] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [monthToSend, setMonthToSend] = useState(months[currentMonth]);
  const { triggerAlignCurrentMonth } = useContext(CalendarContext);

  useEffect(() => {
    setCurrentMonth(new Date().getMonth());
  }, [triggerAlignCurrentMonth]);

  useEffect(() => {
    setMonthToSend(months[currentMonth]);
  }, [currentMonth, trigger]);

  useEffect(() => {
    if (isToShowOneMonth) {
      setExportCalendarType(ExportCalendarType.EXPORT_TASKS_OF_MONTH);
    } else {
      setExportCalendarType(ExportCalendarType.EXPORT_TASKS_OF_YEAR);
    }
  }, [isToShowOneMonth, triggerToUpdateButtonAndValue]);

  useEffect(() => {
    if (exportCalendarType === ExportCalendarType.EXPORT_TASKS_OF_MONTH) {
      setValueReferenceToSearch([currentMonth, currentYear]);
    } else if (exportCalendarType === ExportCalendarType.EXPORT_TASKS_OF_YEAR) {
      setValueReferenceToSearch(`${currentYear}`);
    }
  }, [exportCalendarType]);

  const toggleIsToShowOneMonth = () => {
    setIsToShowOneMonth(!isToShowOneMonth);
  };

  const changeMonth = (e: any) => {
    const id: number = Number(e.target.id);
    if (id >= 0 && id <= 11) {
      setCurrentMonth(id);
    }
  };

  const changeYear = (newDate: Date) => {
    const newCurrentYear = Math.abs(newDate.getFullYear());

    if (newCurrentYear <= new Date().getFullYear()) {
      if (new Date().getFullYear() - newCurrentYear <= 10) {
        setCurrentDate(newDate);
        setCurrentYear(newCurrentYear);
      }
    } else if (newCurrentYear - new Date().getFullYear() <= 100) {
      setCurrentDate(newDate);
      setCurrentYear(newCurrentYear);
    }
  };

  return (
    <section className={`${styles.calendar_set}`}>
      {isToShowAllOptionsOfCalendar ||
      isToShowAllOptionsOfCalendar === undefined ? (
        <>
          <div className={`${styles.calendar_set_change_options}`}>
            {isToShowOneMonth &&
            (isToShowChangeMonthOption ||
              isToShowChangeMonthOption === undefined) ? (
              <div className={`${styles.calendar_set_change_month}`}>
                <DropdownButton
                  variant="outline-secondary"
                  align="end"
                  title={`${monthsAux[currentMonth]} `}
                  id="dropdown-menu-align-end"
                >
                  {monthsAux.map((month, index) => (
                    <Dropdown.Item
                      key={month + index}
                      onClick={changeMonth}
                      id={`${index}`}
                      eventKey={`${index}`}
                    >
                      {month}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>
            ) : null}

            {isToShowChangeYearOption ||
            isToShowChangeYearOption === undefined ? (
              <div className={`${styles.calendar_set_change_year}`}>
                <Form.Label
                  style={{
                    marginRight: "15px",
                    marginLeft: "15%",
                  }}
                  htmlFor="inputYear"
                >
                  Ano:
                </Form.Label>
                <DatePicker
                  className={`${styles.calendar_set_change_year_input}`}
                  selected={currentDate}
                  onChange={changeYear}
                  showYearPicker
                  dateFormat="yyyy"
                />
              </div>
            ) : null}

            {isToShowChangeFormatOption ||
            isToShowChangeFormatOption === undefined ? (
              <div className={`${styles.calendar_set_change_format_button}`}>
                <Button
                  onClick={toggleIsToShowOneMonth}
                  variant="outline-secondary"
                >
                  {isToShowOneMonth ? "Mosaico" : "Slide"}
                </Button>
              </div>
            ) : null}
          </div>
        </>
      ) : null}

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
            setCurrentYear={setCurrentYear}
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
