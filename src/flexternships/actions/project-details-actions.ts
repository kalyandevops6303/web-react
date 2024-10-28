import { ProjectDetails } from '../constraints/types/project-details-types';
import { getProjectDetailsById } from '../services/project-management-v2';

export const getProjectsList = (projectsList: ProjectDetails[], set: any) => {
  set({ projectsList: projectsList });
};
export const getProjectDetails = async (projectId: string, set: any) => {
  set({ isProjectsLoading: true });
  const res:any = await getProjectDetailsById(projectId); 
  set({ projectDetails: res?.project, isProjectsLoading: false });
};