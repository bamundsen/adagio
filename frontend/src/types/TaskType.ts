export type Task = {
  id?: number;
  title: string;
  description: string;
  dateTimeStart: string;
  dateTimeEnd: string;
  finishedStatus: boolean;
  idUser?: number;
  idProject?: number;
  priority: string;
  notifications: number[];
};
