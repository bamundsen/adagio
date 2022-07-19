import { createContext, useEffect, useState } from "react";
import { Project } from "../types/Project";
import { ProjectApi } from "../hooks/projectApi";

export type ProjectContextType = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  projects: Project[] | any;
  getProjects: () => any;
  createProject: (project: Project) => any;
};

export const ProjectContext = createContext<ProjectContextType>(null!);

export const ProjectProvider = ({ children }: { children: JSX.Element }) => {
  const [projects, setProjects] = useState<any[] | Project[]>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(8);
  const apiProject = ProjectApi();

  useEffect(() => {
    getProjects().then((response: Project[]) => {
      setProjects(response);
    });
  }, [page, size]);

  const getProjects = async () => {
    const listOfProjects = await apiProject.getProjects(size, page);
    return listOfProjects;
  };

  const createProject = async (project: Project) => {
    const responseToCreate = await apiProject.createProject(project);
    return responseToCreate;
  };

  const value: ProjectContextType = {
    page,
    setPage,
    projects,
    getProjects,
    createProject,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
