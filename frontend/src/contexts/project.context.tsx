import { createContext, useEffect, useState } from "react";
import { Project } from "../types/Project";
import { ProjectApi } from "../hooks/projectApi";

export type ProjectContextType = {
  page: number;
  triggerToSearchProjectsAgainAfterRegister: boolean;
  setTriggerToSearchProjectsAgainAfterRegister: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  projects: Project[] | any;
  getProjects: () => any;
  getProject: (idProject: number) => any;
  createProject: (project: Project) => any;
  editProject: (project: Project, id: number) => any;
};

export const ProjectContext = createContext<ProjectContextType>(null!);

export const ProjectProvider = ({ children }: { children: JSX.Element }) => {
  const [projects, setProjects] = useState<any[] | Project[]>([]);
  const [
    triggerToSearchProjectsAgainAfterRegister,
    setTriggerToSearchProjectsAgainAfterRegister,
  ] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(8);
  const apiProject = ProjectApi();

  useEffect(() => {
    getProjects().then((response: Project[]) => {
      setProjects(response);
    });
  }, [page, size, triggerToSearchProjectsAgainAfterRegister]);

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
  const value: ProjectContextType = {
    page,
    setPage,
    projects,
    setTriggerToSearchProjectsAgainAfterRegister,
    triggerToSearchProjectsAgainAfterRegister,
    getProjects,
    getProject,
    createProject,
    editProject,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
