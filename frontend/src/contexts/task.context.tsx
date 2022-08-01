import { createContext, useEffect } from "react";
import { TaskApi } from "../hooks/taskApi";
import { Task } from "../types/TaskType";

export type TaskContextType = {
  createTask: (task: Task) => any;
  listByStartDateTimeFilter: (
    startDateTime: string,
    dateFinalToSearch: string
  ) => any;
};

export const TaskContext = createContext<TaskContextType>(null!);

export const TaskProvider = ({ children }: { children: JSX.Element }) => {
  const taskApi = TaskApi();

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
  const value: TaskContextType = {
    createTask,
    listByStartDateTimeFilter,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
