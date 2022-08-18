export type Task = {
  id?: number;
  title: string;
  description: string;
  dateTimeStart: string;
  dateTimeEnd: string;
  finishedStatus: boolean;
  idUser?: number;
  idProject?: number;
  projectId?: number | null;
  priority: string;
  nameProject?:String
  notifications: number[];
};
