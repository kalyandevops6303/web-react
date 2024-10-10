export type Skill = {
    _id: string
    name: string
}

export type Tool = {
    _id: string
    name: string
}

export type Role = {
    _id: string
    name: string
}

export type StaticDataState = {
    isStaticDataLoading: boolean
    skills: Skill[]
    tools: Tool[]
    roles: Role[]
}

export type StaticDataActions = {
    fetchStaticData: () => Promise<void>
    fetchSkills: () => Promise<void>
    fetchTools: () => Promise<void>
    fetchRoles: () => Promise<void>
}

export type StaticDataStore = StaticDataState & StaticDataActions
