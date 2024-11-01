
import { create } from "zustand";
import { ProjectDetails, ProjectDetailsState, ProjectStore } from "../constraints/types/project-details-types";
import { getProjectDetails } from "../actions/project-details-actions";



const defaultInitState: ProjectDetailsState = {
    isProjectsLoading: false,
    projectDetails: {} as ProjectDetails,
}

export const useProjectsStore = create<ProjectStore>((set) => ({
    ...defaultInitState,
    getProjectDetails: async (projectId:string) => getProjectDetails(projectId,set),
  }));