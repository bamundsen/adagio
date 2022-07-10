import { useState } from "react";
import AdagioSideBar from "../../components/adagio-sidebar/adagio_sidebar.component";
import Calendar from "../../components/calendar/calendar.component";
import commonStyles from "../../utils/common_styles.module.scss";
import sideBarData from "../../utils/sideBarData";

interface GenericCalendarExibitionProps {
  isToShowAllOptions?: boolean;
}
const GenericCalendarExibition = ({
  isToShowAllOptions,
}: GenericCalendarExibitionProps) => {
  return (
    <main className={`${commonStyles.main_content}`}>
      <AdagioSideBar itemsNav={sideBarData} />
      <Calendar isToShowAllOptionsOfCalendar={isToShowAllOptions} />
    </main>
  );
};

export default GenericCalendarExibition;
