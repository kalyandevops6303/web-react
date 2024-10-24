import { User } from 'react-feather';
import ProjectStatusChip from './projectCard/ProjectStatusChip';
import RatingInfo from './projectCard/RatingInfo';
import BadgeGroup from './projectCard/BadgeGroup';
import { useState } from 'react';
import StartDateSVG from '../../../../assets/svgs/project-details/start-date.svg';
import EndDateSVG from '../../../../assets/svgs/project-details/end-date.svg';
import { Button } from '../../ui/button';

const UserTypeChipClassnames = {
  TALENT: 'bg-[#FFD700] text-[#333333]',
  CLIENT: 'text-blue-700 bg-blue-100',
};
const ProjectStatusChipClassnames = {
  OPEN: `bg-skyblue-light text-skyblue border-skyblue`,
  OPEN_LISTING: `bg-green-100 text-green-400`,
};
const desc =
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, quasi voluptates voluptatum, magna inventore perferendis eos dignissimos similique reiciendis praesentium saepe illo necessitatibus molestias alias incidunt! Non at eos quia ratione alias.';

const LeftSideBarProjectDetails = () => {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div className="bg-white flex flex-col items-start gap-5 px-6 py-5 w-full md:w-[50%]  lg:w-[25%] 2xl:w-[20%] rounded-xl">
      <div className="flex flex-row items-center w-full justify-between">
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
          <RatingInfo />
        </div>
      </div>

      <div className="w-full flex flex-row flex-wrap items-center justify-start gap-5">
        <div className="flex flex-row items-center gap-1">
          <img src={StartDateSVG} className="w-14 h-14 rounded-full" alt="" />
          <div className="flex flex-col items-start gap-1">
            <h1 className="font-semibold">1 Jan'24</h1>
            <h1 className="text-xs">Start Date</h1>
          </div>
        </div>
        <div className="flex flex-row items-center gap-1">
          <img src={EndDateSVG} className="w-14 h-14 rounded-full" alt="" />
          <div className="flex flex-col items-start gap-1">
            <h1 className="font-semibold">1 Jan'24</h1>
            <h1 className="text-xs">End Date</h1>
          </div>
        </div>
      </div>

      <div className="w-full">
        <h1 className="text-xl font-semibold">Project Details</h1>
        <hr className="w-full mt-1 text-gray-300" />
      </div>

      <div className="flex flex-col items-start justify-start w-full gap-5 text-gray-600">
        <h1>
          Estimated Duration : <span className="font-semibold text-gray-900">10 Weeks</span>
        </h1>
        <div className="flex flex-row items-start gap-3">
          Status :{' '}
          <h1 className={`${ProjectStatusChipClassnames['OPEN_LISTING']} font-semibold px-2 py-1 rounded-xl`}>
            Open Listing
          </h1>
        </div>
        <div className="flex flex-row items-start w-full justify-start gap-2">
          <h1 className="mt-1">Skills:</h1>
          <BadgeGroup
            tags={[
              {
                _id: '1',
                name: 'React',
              },
              {
                _id: '1',
                name: 'AngularJS',
              },
              {
                _id: '1',
                name: 'JavaScript',
              },
              {
                _id: '1',
                name: 'TypeScript',
              },
              {
                _id: '1',
                name: 'React',
              },
              {
                _id: '1',
                name: 'AngularJS',
              },
              {
                _id: '1',
                name: 'JavaScript',
              },
              {
                _id: '1',
                name: 'TypeScript',
              },
            ]}
            className="bg-skyblue-light text-skyblue"
          />
        </div>
            <div>
            <h1 className="text-gray-900 font-semibold">Description: </h1>
        <p>
          {showMore ? desc : `${desc.slice(0, 100)}...`}
          <span onClick={handleToggle} className="text-skyblue cursor-pointer">
            {showMore ? ' Read less' : ' Read more'}
          </span>
        </p>
            </div>
      

        <Button
          variant="outline"
          size="default"
          className="w-fit px-10 py-3 mx-auto bg-[#0065C1] hover:border hover:border-[#0065C1] hover:bg-skyblue-light font-semibold hover:text-[#0065C1] text-white"
        >
          Message
        </Button>
      </div>
    </div>
  );
};

export default LeftSideBarProjectDetails;
