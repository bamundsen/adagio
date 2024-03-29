import { createContext, useContext, useEffect, useState } from "react";
import { Modal, Toast } from "react-bootstrap";
import { BsInfo, BsInfoSquare } from "react-icons/bs";
import { tabEnterClickEffect } from "../utils/acessibilityAux";
import { returnThisDateWithHour } from "../utils/returnThisDateWithHour.utils";
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
      });
    }, 40000);
  }, []);

  useEffect(() => {
    if (hourAndMinuteOfNow === hourAndMinuteToCompare) {
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

        if (hourAndMinuteOfNow === `${hour}:${minute}`) {
          setHourAndMinuteToCompare(`${hour}:${minute}`);
          break;
        }
      }
    }
  }, [tasksFromToday]);

  const showMessage = () => {
    return (
      <Modal show={isToShowAlert}>
        <div
          style={{
            width: "100%",
            minHeight: "75px",
            padding: "9px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <span>{message}</span> */}
          <span>
            <BsInfoSquare
              tabIndex={1}
              title={`${message}`}
              style={{
                color: "blue",
                width: "24px",
                height: "24px",
                marginRight: "15px",
              }}
            />
            {message}
          </span>
          <span
            style={{ fontSize: "18px", marginRight: "8px", cursor: "pointer" }}
            tabIndex={1}
            onKeyDown={tabEnterClickEffect}
            title={"Close"}
            onClick={() => {
              setIsToShowAlert(false);
            }}
          >
            X
          </span>
        </div>
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
