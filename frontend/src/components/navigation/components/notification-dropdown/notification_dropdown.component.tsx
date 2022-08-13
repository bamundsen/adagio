import { useContext, useEffect } from "react";
import { TaskContext } from "../../../../contexts/task.context";
import styles from "./notification_dropdown.module.scss";

interface NotificationDropdownProps {
  displayDropdownNotification: string;
}

const NotificationDropdown = ({
  displayDropdownNotification,
}: NotificationDropdownProps) => {
  const { listByStartDateTimeFilter } = useContext(TaskContext);

  useEffect(() => {}, []);

  return (
    <div
      style={{
        display: `${displayDropdownNotification}`,
        position: "absolute",
        zIndex: "100",
        width: "150px",
        height: " 280px",
        backgroundColor: "#fff",
        boxShadow: "2px 2px 8px #ddd",
      }}
    ></div>
  );
};

export default NotificationDropdown;
