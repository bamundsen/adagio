export type Project = {
  id?: number;
  title: string;
  description: string;
  dateTimeStart: string;
  dateTimeEnd: string;
  idUser?: number;
  tasksIds: any[];
};
