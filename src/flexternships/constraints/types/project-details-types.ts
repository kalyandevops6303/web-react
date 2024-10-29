export type FlexternProjectDetails = {
    teamDetails: Array<TeamMemberDetails>
}

export type TeamMemberDetails = {
    name?: string
    profileImage?: string
    designation?: string
    rating?: number
    ratingText?: string
    ratingColor?: string
    kudos?: number
    wow?: number
}

export type ProjectDetailsActions = {
    populateTeamDetails: (projectId?: string) => Promise<void>
    resetStore: () => void
}

export type FlexternProjectDetailStore = FlexternProjectDetails & ProjectDetailsActions
