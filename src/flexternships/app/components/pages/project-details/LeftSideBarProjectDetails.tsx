import ProjectStatusChip from './projectCard/ProjectStatusChip';
import RatingInfo from './projectCard/RatingInfo';
import BadgeGroup from './projectCard/BadgeGroup';
import { useState } from 'react';
import StartDateSVG from '../../../../assets/svgs/project-details/start-date.svg';
import EndDateSVG from '../../../../assets/svgs/project-details/end-date.svg';
import { Button } from '../../ui/button';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { userTypes } from '@/utility/constants/Constant';
import { calculateDays, convertUnixTimestampToDate } from '@/utility/Utils';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';

enum UserTypeChipClassnames {
  TALENT = 'bg-[#FFD700] text-error',
  CLIENT = 'text-blue-700 bg-blue-100',
}

const LeftSideBarProjectDetails = () => {
  const data = useProjectsStore((state) => state.projectDetails);
  const userDetails = useFlexternUserStore((state) => state.userDetails);
  const [showMore, setShowMore] = useState(false);
  const handleToggle = () => {
    setShowMore((prev) => !prev);
  };
  const daysLeft = calculateDays(data?.listing_details?.start_date_epoch, data?.listing_details?.end_date_epoch)?.daysLeft;
  return (
    <div className="bg-white flex flex-col items-start gap-4 px-5 py-5 w-full md:w-[350px] h-fit rounded-xl">
      <div className="flex flex-row items-center w-full justify-between">
        <ProjectStatusChip
          status={data?.status as 'OPEN' | 'IN_REVIEW' | 'ACTIVE' | 'ONGOING' | 'CLOSED' | 'TERMINATED' | 'COMPLETED'}
        />

        {daysLeft > 0 && <h1 className="text-error font-semibold">
          {daysLeft} Days
          Left
        </h1>}
      </div>
      <h1 className="font-medium text-lg">{data?.details?.name}</h1>

      <div className="flex flex-row items-center justify-center gap-3">
        <div className="flex flex-col items-center justify-center gap-1">
          <img src={data?.client_info?.[0]?.image_uri?.length! > 0 ? data?.client_info?.[0]?.image_uri : defaultAvatar} className="w-9 rounded-full h-9" alt="" />
          <h1 className={`${UserTypeChipClassnames['CLIENT']} font-semibold text-xs px-2 py-1 rounded-xl`}>Client</h1>
        </div>

        <div className="flex flex-col items-start">
          <h1 className="text-[#333333] text-base">
            {data?.client_info?.[0]?.first_name ?? ''} {data?.client_info?.[0]?.last_name ?? ''}
          </h1>
          <RatingInfo
            rating={data?.client_info?.[0]?.rating || 0}
            projectsCount={data?.client_info?.[0]?.projects_listed_count || 0}
          />
        </div>
      </div>

      <div className="w-full">
        <h1 className="text-lg font-medium">Project Details</h1>
        <hr className="w-full mt-1 text-gray-300" />
      </div>
      <div className="w-full flex flex-row  items-center justify-start gap-5">
        <div className="flex flex-row items-center gap-2">
          <img src={StartDateSVG} className="w-12 h-12 rounded-full" alt="" />
          <div className="flex flex-col items-start">
            <h1 className="font-medium">{convertUnixTimestampToDate(data?.listing_details?.start_date_epoch)}</h1>
            <h1 className="text-xs">Start Date</h1>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <img src={EndDateSVG} className="w-12 h-12 rounded-full" alt="" />
          <div className="flex flex-col items-start">
            <h1 className="font-medium">{convertUnixTimestampToDate(data?.listing_details?.end_date_epoch)}</h1>
            <h1 className="text-xs">End Date</h1>
          </div>
        </div>
      </div>



      <div className="flex flex-col items-start justify-start w-full gap-4 text-gray-600 text-sm">
        {/* {userDetails?.userType === userTypes?.client && (
          <h1>
            Fixed Price : <span className="font-semibold text-gray-900">$ 135,000</span>
          </h1>
        )} */}
        <h1>
          Estimated Duration :{' '}
          <span className="font-medium ">{data?.details?.expected_duration?.duration} Weeks</span>
        </h1>
        <div className="flex flex-row items-start gap-3">
          Status :{' '}
          <ProjectStatusChip
            status={data?.status as 'OPEN' | 'IN_REVIEW' | 'ACTIVE' | 'ONGOING' | 'CLOSED' | 'TERMINATED' | 'COMPLETED'}
            rounded={true}
          />
        </div>

        {data?.skills_data?.length! > 0 && (
          <div className="flex flex-row items-start w-full justify-start gap-2">
            <h1 className="mt-1">Skills:</h1>
            <BadgeGroup tags={data?.skills_data || []} className="bg-skyblue-light text-skyblue" />
          </div>
        )}
        {data?.tools_data?.length! > 0 && (
          <div className="flex flex-row items-start w-full justify-start gap-2">
            <h1 className="mt-1">Tools:</h1>
            <BadgeGroup tags={data?.tools_data || []} className="bg-skyblue-light text-skyblue" />
          </div>
        )}
        <div className="flex flex-col w-full ">
          <h1 className="text-gray-900 font-medium">Description: </h1>
          <p className="w-full font-normal">
            {showMore
              ? data?.details?.description
              : `${data?.details?.description.slice(0, 100)}` + (data?.details?.description?.length > 100 ? '...' : '')}
            <span onClick={handleToggle} className="text-skyblue cursor-pointer">
              {data?.details?.description?.length > 100 ? (showMore ? ' Read less' : ' Read more') : null}
            </span>
          </p>
        </div>

        <div className="flex flex-row items-center w-full mx-auto justify-center gap-5">
          {userDetails?.userType === userTypes?.client && (
            <Button
              variant="outline"
              size="default"
              className="w-fit px-10 py-3 mx-auto bg-red-600 hover:border hover:border-red-600 hover:bg-red-200 font-semibold hover:text-red-600 text-white"
            >
              Report
            </Button>
          )}
          <Button
            variant="outline"
            size="default"
            className="w-fit px-8 py-2 mx-auto bg-trublue hover:border hover:border-trublue hover:bg-skyblue-light font-semibold hover:text-trublue text-white"
          >
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBarProjectDetails;
