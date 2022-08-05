import { createContext, useContext, useEffect, useState } from "react";
import { Modal, Toast } from "react-bootstrap";
import { TaskContext } from "./task.context";

const defineHourAndMinuteOfNow = () => {
  return `${String(new Date().getHours()).padStart(2, "0")}:${String(
    new Date().getMinutes()
  ).padStart(2, "0")}`;
};

export type NotificationContextType = {
  showMessage: () => any;
  isToShowAlert: boolean;
};

export const NotificationContext = createContext<NotificationContextType>(
  null!
);

export const NotificationProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [message, setMessage] = useState("");
  const [titleTask, setTitleTask] = useState("");
  const [isToShowAlert, setIsToShowAlert] = useState(false);
  const [hourAndMinuteOfNow, setHourAndMinuteOfNow] = useState(
    defineHourAndMinuteOfNow()
  );
  const [hourAndMinuteToCompare, setHourAndMinuteToCompare] = useState("");
  const [tasksFromToday, setTasksFromToday] = useState<any[]>([]);
  const { listByStartDateTimeFilter } = useContext(TaskContext);

  useEffect(() => {
    setIsToShowAlert(false);
    setInterval(() => {
      listByStartDateTimeFilter(
        returnThisDateWithHour("00:00:00"),
        returnThisDateWithHour("23:59:59")
      ).then((response: any) => {
        setTasksFromToday(response.data);
        setHourAndMinuteOfNow(defineHourAndMinuteOfNow());

        console.log("VENHO");
      });
    }, 100000);
  }, []);

  useEffect(() => {
    if (hourAndMinuteOfNow === hourAndMinuteToCompare) {
      console.log("TO SHOW");
      setIsToShowAlert(true);
      setMessage(`Tarefa ${titleTask} (${hourAndMinuteOfNow}) iniciada !`);
    }
  }, [hourAndMinuteToCompare]);

  useEffect(() => {
    if (isToShowAlert === false) {
      for (let dt of tasksFromToday) {
        const hour = dt.dateTimeStart.split("T")[1].split(":")[0];
        const minute = dt.dateTimeStart.split("T")[1].split(":")[1];
        setTitleTask(dt.title);
        setHourAndMinuteToCompare(`${hour}:${minute}`);
        console.log(hourAndMinuteOfNow, hourAndMinuteToCompare);
      }
    }
  }, [tasksFromToday, isToShowAlert]);

  const returnThisDateWithHour = (hour: string) => {
    return `${String(new Date().getFullYear()).padStart(2, "0")}-${String(
      new Date().getMonth() + 1
    ).padStart(2, "0")}-${String(new Date().getDate()).padStart(
      2,
      "0"
    )}T${hour}`;
  };

  const showMessage = () => {
    console.log(isToShowAlert, message);

    //   alert(`${message}!`);
    return (
      <Modal show={isToShowAlert}>
        {message}
        <button
          onClick={() => {
            setIsToShowAlert(false);
          }}
        >
          sair
        </button>
      </Modal>
    );
  };

  const value: NotificationContextType = { showMessage, isToShowAlert };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
