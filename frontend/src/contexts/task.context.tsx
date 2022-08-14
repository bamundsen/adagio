import { createContext, useEffect, useState } from "react";
import { TaskApi } from "../hooks/taskApi";
import { Task } from "../types/TaskType";

export type TaskContextType = {
  createTask: (task: Task) => any;
  deleteTask: (id: number) => any;
  editTask: (task: Task, id: number) => any;
  listByStartDateTimeFilter: (
    startDateTime: string,
    dateFinalToSearch: string
  ) => any;
  getTask: (idTask: number) => any;
  getColorThatIsToBeShowed: (
    startDateTime: string,
    dateFinalToSearch: string
  ) => any;
  getTasksWithNoProjectByTitle: (
    title: string,
    projectIdIfItIsToEdit: string | undefined,
    page: number,
    size: number
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

  const getTask = async (idTask: number) => {
    const task = await taskApi.getTask(idTask);
    return task;
  };

  const editTask = async (task: Task, id: number) => {
    const responseToEdit = await taskApi.editTask(task, id);
    return responseToEdit;
  };

  const getTasksWithNoProjectByTitle = async (
    title: string,
    projectIdIfItIsToEdit: string | undefined,
    page: number,
    size: number
  ) => {
    const response = await taskApi.getTasksWithNoProjectByTitle(
      title,
      projectIdIfItIsToEdit,
      page,
      size
    );

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
    getTask,
    editTask,
    getTasksWithNoProjectByTitle,
    triggerToSearchTasksAgainAfterDelete,
    deleteTask,
    listByStartDateTimeFilter,
    getColorThatIsToBeShowed,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
