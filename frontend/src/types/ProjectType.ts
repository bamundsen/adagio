export type Project = {
  id?: number;
  title: string;
  description: string;
  progress?: number;
  dateTimeStart: string;
  dateTimeEnd: string;
  idUser?: number;
  tasks?: any[];
  tasksIds: number[];
};
