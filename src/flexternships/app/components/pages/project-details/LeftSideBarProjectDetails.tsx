import ProjectStatusChip from './projectCard/ProjectStatusChip';
import RatingInfo from './projectCard/RatingInfo';
import BadgeGroup from './projectCard/BadgeGroup';
import { useEffect, useState } from 'react';
import StartDateSVG from '../../../../assets/svgs/project-details/start-date.svg';
import EndDateSVG from '../../../../assets/svgs/project-details/end-date.svg';
import { Button } from '../../ui/button';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { userTypes } from '@/utility/constants/Constant';
import { calculateDays, convertUnixTimestampToDate } from '@/utility/Utils';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { useParams } from 'react-router-dom';

enum UserTypeChipClassnames {
  TALENT = 'bg-[#FFD700] text-[#333333]',
  CLIENT = 'text-blue-700 bg-blue-100',
}

const LeftSideBarProjectDetails = () => {
  const params = useParams();
  const data = useProjectsStore((state) => state.projectDetails);
  const userDetails = useFlexternUserStore((state) => state.userDetails);
  const projectDetails = useProjectsStore((state) => state.projectDetails);
  const getProjectDetails = useProjectsStore((state) => state.getProjectDetails);
  const [showMore, setShowMore] = useState(false);
  const handleToggle = () => {
    setShowMore((prev) => !prev);
  };
  const daysLeft = calculateDays(data?.listingDetails?.startDateEpoch, data?.listingDetails?.endDateEpoch)?.daysLeft;

  useEffect(() => {
    // getProjectDetails(params?.projectId as string);
  }, [params])

  return (
    <div className="bg-white flex flex-col items-start gap-5 px-6 py-5 w-full md:w-[50%]  xl:w-[350px] h-fit rounded-xl">
      <div className="flex flex-row items-center w-full justify-between">
        <ProjectStatusChip
          status={data?.status as 'OPEN' | 'IN_REVIEW' | 'ACTIVE' | 'ONGOING' | 'CLOSED' | 'TERMINATED' | 'COMPLETED'}
        />

        {daysLeft > 0 && <h1 className="text-[#EA5455] font-semibold">
          {daysLeft} Days
          Left
        </h1>}
      </div>
      <h1 className="font-semibold text-lg">{data?.details?.name}</h1>

      <div className="flex flex-row items-center justify-center gap-3">
        <div className="flex flex-col items-center justify-center gap-1">
          <img src={data?.clientInfo?.[0]?.imageUri?.length! > 0 ? data?.clientInfo?.[0]?.imageUri : defaultAvatar} className="w-12 rounded-full h-12" alt="" />
          <h1 className={`${UserTypeChipClassnames['CLIENT']} font-semibold px-2 py-1 rounded-xl`}>Client</h1>
        </div>

        <div className="flex flex-col items-start gap-1">
          <h1 className="text-[#333333] font-semibold">
            {data?.clientInfo?.[0]?.firstName ?? ''} {data?.clientInfo?.[0]?.lastName ?? ''}
          </h1>
          <RatingInfo
            rating={data?.clientInfo?.[0]?.rating || 0}
            projectsCount={data?.clientInfo?.[0]?.projectsListedCount || 0}
          />
        </div>
      </div>

      <div className="w-full">
        <h1 className="text-xl font-semibold">Project Details</h1>
        <hr className="w-full mt-1 text-gray-300" />
      </div>
      <div className="w-full flex flex-row  items-center justify-start gap-5">
        <div className="flex flex-row items-center gap-1">
          <img src={StartDateSVG} className="w-14 h-14 rounded-full" alt="" />
          <div className="flex flex-col items-start gap-1">
            <h1 className="font-semibold">{convertUnixTimestampToDate(data?.listingDetails?.startDateEpoch)}</h1>
            <h1 className="text-xs">Start Date</h1>
          </div>
        </div>
        <div className="flex flex-row items-center gap-1">
          <img src={EndDateSVG} className="w-14 h-14 rounded-full" alt="" />
          <div className="flex flex-col items-start gap-1">
            <h1 className="font-semibold">{convertUnixTimestampToDate(data?.listingDetails?.endDateEpoch)}</h1>
            <h1 className="text-xs">End Date</h1>
          </div>
        </div>
      </div>



      <div className="flex flex-col items-start justify-start w-full gap-5 text-gray-600">
        {/* {userDetails?.userType === userTypes?.client && (
          <h1>
            Fixed Price : <span className="font-semibold text-gray-900">$ 135,000</span>
          </h1>
        )} */}
        <h1>
          Estimated Duration :{' '}
          <span className="font-semibold text-gray-900">{data?.details?.expectedDuration?.duration} Weeks</span>
        </h1>
        <div className="flex flex-row items-start gap-3">
          Status :{' '}
          <ProjectStatusChip
            status={data?.status as 'OPEN' | 'IN_REVIEW' | 'ACTIVE' | 'ONGOING' | 'CLOSED' | 'TERMINATED' | 'COMPLETED'}
          />
        </div>

        {data?.skillsData?.length! > 0 && (
          <div className="flex flex-row items-start w-full justify-start gap-2">
            <h1 className="mt-1">Skills:</h1>
            <BadgeGroup tags={data?.skillsData || []} className="bg-skyblue-light text-skyblue" />
          </div>
        )}
        {data?.toolsData?.length! > 0 && (
          <div className="flex flex-row items-start w-full justify-start gap-2">
            <h1 className="mt-1">Tools:</h1>
            <BadgeGroup tags={data?.toolsData || []} className="bg-skyblue-light text-skyblue" />
          </div>
        )}
        <div className="flex flex-col w-full ">
          <h1 className="text-gray-900 font-semibold">Description: </h1>
          <p className="w-full">
            {showMore
              ? data?.details?.description
              : `${data?.details?.description?.slice(0, 100)}` + (data?.details?.description?.length > 100 ? '...' : '')}
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
            className="w-fit px-10 py-3 mx-auto bg-[#0065C1] hover:border hover:border-[#0065C1] hover:bg-skyblue-light font-semibold hover:text-[#0065C1] text-white"
          >
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBarProjectDetails;
