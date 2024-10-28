
import { create } from "zustand";
import { ProjectDetails, ProjectDetailsState, ProjectStore } from "../constraints/types/project-details-types";
import { getProjectDetails, getProjectsList } from "../actions/project-details-actions";



const defaultInitState: ProjectDetailsState = {
    isProjectsLoading: false,
    projectsList: [] as ProjectDetails[],
    projectDetails: {} as ProjectDetails,
}

export const useProjectsStore = create<ProjectStore>((set,get) => ({
    ...defaultInitState,
    getProjectsList: async (projectsList:ProjectDetails[]) => getProjectsList(projectsList,set),
    getProjectDetails: async (projectId:string) => getProjectDetails(projectId,set),
  }));