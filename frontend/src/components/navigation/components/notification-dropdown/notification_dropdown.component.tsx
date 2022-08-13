import { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { TaskContext } from "../../../../contexts/task.context";
import { AuxInformationApi } from "../../../../hooks/auxInformationApi";
import { SpinnerState } from "../../../../utils/spinner_type";
import AdagioSpinner from "../../../adagio-spinner/adagio_spinner.component";
import NotificationDropdownItem from "./components/notification_dropdown_item.component";
import styles from "./notification_dropdown.module.scss";

interface NotificationDropdownProps {
  displayDropdownNotification: string;
}

const NotificationDropdown = ({
  displayDropdownNotification,
}: NotificationDropdownProps) => {
  const [todayTasksToBeShow, setTodayTasksToBeShow] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(SpinnerState.Pending);
  const [requestWasDone, setRequestWasDone] = useState(false);
  const { listByStartDateTimeFilter } = useContext(TaskContext);

  const auxInformationApi = AuxInformationApi();

  useEffect(() => {
    if (displayDropdownNotification !== "none") {
      auxInformationApi.getTodayTasksToBeAlerted().then((response: any[]) => {
        setTodayTasksToBeShow([
          ...response.map((i: any) => {
            let color = "gray";
            if (i.priority === "CRITICAL") {
              color = "red";
            } else if (i.priority === "REGULAR") {
              color = "blue";
            } else if (i.priority === "HIGH") {
              color = "green";
            }

            return { ...i, color };
          }),
        ]);
        setRequestWasDone(true);
      });
    }
  }, [displayDropdownNotification]);

  useEffect(() => {
    if (todayTasksToBeShow.length > 0) {
      setIsLoaded(SpinnerState.Finished);
    } else if (requestWasDone) {
      setIsLoaded(SpinnerState.There_is_no_content);
    }
  }, [todayTasksToBeShow]);

  const returnSpinner = () => {
    return <AdagioSpinner loadingState={isLoaded} />;
  };

  return (
    <div
      className={styles.notification_dropdown}
      style={{
        display: `${displayDropdownNotification}`,
        position: "absolute",
        zIndex: "100",
        width: "230px",
        color: "#000",
        maxWidth: "250px",

        height: " 280px",
        maxHeight: "300px",
        overflowY: "auto",
        overflowX: "auto",
        backgroundColor: "#fff",
        boxShadow: "2px 2px 8px #ddd",
        flexDirection: "column",
      }}
    >
      {isLoaded === SpinnerState.Finished &&
        todayTasksToBeShow.map((task: any, i) => {
          return (
            <NotificationDropdownItem
              key={task.priority + task.startAndEndHourGrouped + i + task.title}
              color={task.color}
              priority={task.priority}
              title={task.title}
              time={task.startAndEndHourGrouped}
              projectName={
                task.projectName !== null ? task.projectName : "Sem projeto"
              }
            />
          );
        })}
      {returnSpinner()}
    </div>
  );
};

export default NotificationDropdown;
