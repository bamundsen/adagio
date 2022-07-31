import { createContext, useEffect } from "react";
import { TaskApi } from "../hooks/taskApi";
import { Task } from "../types/TaskType";

export type TaskContextType = {
  createTask: (task: Task) => any;
};

export const TaskContext = createContext<TaskContextType>(null!);

export const TaskProvider = ({ children }: { children: JSX.Element }) => {
  const taskApi = TaskApi();

  const createTask = async (task: Task) => {
    const response = await taskApi.createTask(task);
    return response;
  };

  const value: TaskContextType = {
    createTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
