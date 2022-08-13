interface NotificationDropdownItemProps {
  color: string;
  title: string;
  time: string;
  priority: string;
  projectName: string;
}
const NotificationDropdownItem = ({
  color,
  priority,
  title,
  time,
  projectName,
}: NotificationDropdownItemProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "auto",
        borderBottom: "1px solid #000",
        padding: "6px",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            marginBottom: "8px",
            backgroundColor: `${color}`,
            borderRadius: "50%",
            width: "22px",
            height: "22px",
          }}
        ></div>
        <span style={{ marginLeft: "5px" }}>- {priority}</span>
      </div>
      <span style={{ marginBottom: "8px" }}>
        {title} ({time})
      </span>
      <span style={{ paddingBottom: "5px" }}>{projectName}</span>
    </div>
  );
};

export default NotificationDropdownItem;
