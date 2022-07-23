import { createContext, useEffect, useState } from "react";
import { Project } from "../types/Project";
import { ProjectApi } from "../hooks/projectApi";
import { api } from "../hooks/base_api";

export type ProjectContextType = {
  page: number;
  triggerToSearchProjectsAgainAfterDelete: boolean;
  triggerToSearchProjectsAgainAfterRegister: boolean;
  setTriggerToSearchProjectsAgainAfterDelete: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setTriggerToSearchProjectsAgainAfterRegister: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  projects: Project[] | any;
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

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(8);
  const apiProject = ProjectApi();

  useEffect(() => {
    console.log("EIEIEIEIEIEIEIIEIEIEEI");
    getProjects().then((response: Project[]) => {
      setProjects(response);
    });
  }, [
    page,
    size,
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
    createProject,
    editProject,
    deleteProject,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
