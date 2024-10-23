import { ProjectTabType } from '@/flexternships/constraints/types/project-details-types'
import NavigationTab from './NavigationTab'


export default function ProjectDetailsTabNavigation({tabs}:{
  tabs: ProjectTabType[]}) {
  return (
    <div className=' bg-white  w-fit flex flex-row items-center justify-center'>
        {
            tabs.map((tab, index) => (
                <NavigationTab key={index} tab={tab} index={index} />
            ))
        }
    </div>
  )
}
