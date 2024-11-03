import { getProjectDetailsById } from '../services/project-management-v2';

export const getProjectDetails = async (projectId: string, set: any) => {
  set({ isProjectsLoading: true });
  const res:any = await getProjectDetailsById(projectId); 
  set({ projectDetails: res, isProjectsLoading: false });
};