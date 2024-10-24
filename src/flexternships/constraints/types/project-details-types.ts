

export type ProjectTabType = {
    id: string,
    title: string,
    icon: JSX.Element,
    description: string,
    route: string,
    component: JSX.Element,
    talentVisible: boolean,
    clientVisible: boolean
}

export type BreadCrumbType = {
    title: string,
    link: string
}