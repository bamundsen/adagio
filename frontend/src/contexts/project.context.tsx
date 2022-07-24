import { createContext, useEffect, useState } from "react";
import { Project } from "../types/Project";
import { ProjectApi } from "../hooks/projectApi";
import { api } from "../hooks/base_api";

export type ProjectContextType = {
  page: number;
  triggerToSearchProjectsAgainAfterDelete: boolean;
  triggerToSearchProjectsAgainAfterRegister: boolean;
  isToRestartFormAgain: boolean;
  triggerToSearchProjectsAgain: boolean;
  setTriggerToSearchProjectsAgainAfterDelete: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsToRestartFormAgain: React.Dispatch<React.SetStateAction<boolean>>;
  setTriggerToSearchProjectsAgainAfterRegister: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setTriggerToSearchProjectsAgain: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  projects: Project[] | any[];
  isFirst: boolean;
  isLast: boolean;
  getProjects: () => any;
  getProject: (idProject: number) => any;
  createProject: (project: Project) => any;
  editProject: (project: Project, id: number) => any;
  deleteProject: (id: number) => any;
};

export const ProjectContext = createContext<ProjectContextType>(null!);

export const ProjectProvider = ({ children }: { children: JSX.Element }) => {
  const [projects, setProjects] = useState<any[] | Project[]>([]);

  const [
    triggerToSearchProjectsAgainAfterRegister,
    setTriggerToSearchProjectsAgainAfterRegister,
  ] = useState(false);
  const [
    triggerToSearchProjectsAgainAfterDelete,
    setTriggerToSearchProjectsAgainAfterDelete,
  ] = useState(false);

  const [isToRestartFormAgain, setIsToRestartFormAgain] = useState(true);

  const [triggerToSearchProjectsAgain, setTriggerToSearchProjectsAgain] =
    useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(8);
  const apiProject = ProjectApi();
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    getProjects().then((response: any) => {
      if (response.last) {
        setIsLast(true);
      } else {
        setIsLast(false);
      }

      if (response.first) {
        setIsFirst(true);
      } else {
        setIsFirst(false);
      }

      setProjects(response.content);
    });
  }, [
    page,
    size,
    isFirst,
    isLast,
    triggerToSearchProjectsAgainAfterRegister,
    triggerToSearchProjectsAgainAfterDelete,
  ]);

  useEffect(() => {
    setPage(0);
  }, [triggerToSearchProjectsAgainAfterRegister]);

  const getProjects = async () => {
    const listOfProjects = await apiProject.getProjects(size, page);
    return listOfProjects;
  };

  const getProject = async (idProject: number) => {
    const project = await apiProject.getProject(idProject);
    return project;
  };

  const createProject = async (project: Project) => {
    const responseToCreate = await apiProject.createProject(project);
    return responseToCreate;
  };

  const editProject = async (project: Project, id: number) => {
    const responseToEdit = await apiProject.editProject(project, id);
    return responseToEdit;
  };

  const deleteProject = async (id: number) => {
    const responseToDelete = await apiProject.deleteProject(id);

    if (responseToDelete?.status === 200) {
      setTriggerToSearchProjectsAgainAfterDelete(
        !triggerToSearchProjectsAgainAfterDelete
      );
    }
    return responseToDelete;
  };

  const value: ProjectContextType = {
    page,
    setPage,
    projects,
    setTriggerToSearchProjectsAgainAfterRegister,
    triggerToSearchProjectsAgainAfterRegister,
    triggerToSearchProjectsAgainAfterDelete,
    setTriggerToSearchProjectsAgainAfterDelete,
    getProjects,
    getProject,
    setIsToRestartFormAgain,
    isToRestartFormAgain,
    createProject,
    isFirst,
    isLast,
    triggerToSearchProjectsAgain,
    setTriggerToSearchProjectsAgain,
    editProject,
    deleteProject,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
