import { createContext, useEffect, useState } from "react";
import { TaskApi } from "../hooks/taskApi";
import { Task } from "../types/TaskType";

export type TaskContextType = {
  createTask: (task: Task) => any;
  deleteTask: (id: number) => any;
  listByStartDateTimeFilter: (
    startDateTime: string,
    dateFinalToSearch: string
  ) => any;

  getColorThatIsToBeShowed: (
    startDateTime: string,
    dateFinalToSearch: string
  ) => any;
  triggerToSearchTasksAgainAfterDelete: boolean;
};

export const TaskContext = createContext<TaskContextType>(null!);

export const TaskProvider = ({ children }: { children: JSX.Element }) => {
  const taskApi = TaskApi();
  const [
    triggerToSearchTasksAgainAfterDelete,
    setTriggerToSearchTasksAgainAfterDelete,
  ] = useState(false);

  const createTask = async (task: Task) => {
    const response = await taskApi.createTask(task);
    return response;
  };

  const listByStartDateTimeFilter = async (
    startDateTime: string,
    dateFinalToSearch: string
  ) => {
    const response = await taskApi.listByStartDateTimeFilter(
      startDateTime,
      dateFinalToSearch
    );
    return response;
  };

  const deleteTask = async (id: number) => {
    const response = await taskApi.deleteById(id);

    if (response?.status === 200) {
      setTriggerToSearchTasksAgainAfterDelete(
        !triggerToSearchTasksAgainAfterDelete
      );
    }
    return response;
  };

  const getColorThatIsToBeShowed = async (
    startDateTime: string,
    dateFinalToSearch: string
  ) => {
    const response = await taskApi.getColorThatIsToBeShowed(
      startDateTime,
      dateFinalToSearch
    );

    return response;
  };
  const value: TaskContextType = {
    createTask,
    triggerToSearchTasksAgainAfterDelete,
    deleteTask,
    listByStartDateTimeFilter,
    getColorThatIsToBeShowed,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
