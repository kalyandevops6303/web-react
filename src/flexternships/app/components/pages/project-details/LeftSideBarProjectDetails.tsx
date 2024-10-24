import { User } from 'react-feather';
import ProjectStatusChip from './projectCard/ProjectStatusChip';
import RatingInfo from './projectCard/RatingInfo';

const UserTypeChipClassnames = {
  TALENT: 'bg-[#FFD700] text-[#333333]',
  CLIENT: 'text-blue-700 bg-blue-100',
};
const ProjectStatusChipClassnames = {
  OPEN: `bg-skyblue-light text-skyblue border-skyblue`,
};
const LeftSideBarProjectDetails = () => {
  return (
    <div className="bg-white flex flex-col items-start gap-5 px-5 py-5 w-full lg:w-[25%] rounded-xl">
      <div className="flex flex-row items-center w-full justify-between ">
        <div>
          <ProjectStatusChip className={ProjectStatusChipClassnames['OPEN']} status="Open" />
        </div>
        <h1 className="text-[#EA5455] font-semibold">10 Days Left</h1>
      </div>
      <h1 className="font-semibold text-lg">Usage Data Collection and Payment</h1>
      <div className="flex flex-row items-center justify-center gap-3">
        <div className="flex flex-col items-center justify-center gap-1">
          <User size={20} />
          <h1 className={`${UserTypeChipClassnames['CLIENT']} font-semibold px-2 py-1 rounded-xl`}>Client</h1>
        </div>

        <div className="flex flex-col items-start gap-1">
          <h1 className="text-[#333333] font-semibold">John Doe</h1>
          <div>
            <RatingInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBarProjectDetails;
