import ProjectStatusChip from './projectCard/ProjectStatusChip';
import BadgeGroup from './projectCard/BadgeGroup';
import { useEffect, useState } from 'react';
import StartDateSVG from '../../../../assets/svgs/project-details/start-date.svg';
import EndDateSVG from '../../../../assets/svgs/project-details/end-date.svg';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { calculateDays, convertUnixTimestampToDate } from '@/utility/Utils';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { BadgeType } from '@/flexternships/constraints/types/project-details-types';
import { Paperclip, User, Calendar } from 'react-feather';
import { UserType } from '@/flexternships/constraints/enums/core-enums';
import PrimaryButton from '../../core/buttons/PrimaryButton';
import {
  PrimaryProjectStatus,
  ProjectPanelCaptionDate1,
  ProjectPanelCaptionDate2,
  ProjectPanelDate2Classnames,
  ProjectPanelIcon1Classnames,
  ProjectPanelIcon2Classnames,
  SecondaryProjectStatus,
  StatusType,
} from '@/flexternships/constraints/enums/project-enums';
import { useProjectMilestonesStore } from '@/flexternships/stores/project-milestones-store';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { userTypes } from '@/utility/constants/Constant';

enum UserTypeChipClassnames {
  TALENT = 'bg-[#FFD700] text-error',
  CLIENT = 'flex h-[18px] p-[1px_9px] items-center gap-[3px] rounded-[17px] bg-[rgba(0,94,255,0.12)] text-[#005EFF] text-center font-semibold text-[12px] leading-[18px] font-montserrat',
}

const LeftSideBarProjectDetails = () => {
  const params = useParams();
  const { projectId, milestoneId } = params;

  const data = useProjectsStore((state) => state.projectDetails);
  const userDetails = useFlexternUserStore((state) => state.userDetails);
  const projectMilestones = useProjectMilestonesStore((state) => state.projectMilestones);
  const populateProjectMilestones = useProjectMilestonesStore((state) => state.populateProjectMilestones);

  const [secondaryStatus, setSecondaryStatus] = useState<string>('');
  const [tagsData, setTagsData] = useState<BadgeType[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [isBlocked, setIsBlocked] = useState(true);
  const primaryProjectStatus = PrimaryProjectStatus[data?.status as unknown as keyof typeof PrimaryProjectStatus];

  const ProjectPanelDate1Icon: any = {
    OPEN: (
      <div className={ProjectPanelIcon1Classnames[data?.status]}>
        <Calendar />
      </div>
    ),
    IN_REVIEW: (
      <div className={ProjectPanelIcon1Classnames[data?.status]}>
        <Calendar />
      </div>
    ),
    ACTIVE: (
      <div className={ProjectPanelIcon1Classnames[data?.status]}>
        <Calendar />
      </div>
    ),
    ONGOING: <img src={StartDateSVG} className={ProjectPanelIcon1Classnames[data?.status]} />,
    UPCOMING: (
      <div className={ProjectPanelIcon1Classnames[data?.status]}>
        <Calendar />
      </div>
    ),
    CLOSED: (
      <div className={ProjectPanelIcon1Classnames[data?.status]}>
        <Calendar />
      </div>
    ),
    TERMINATED: <img src={StartDateSVG} className={ProjectPanelIcon1Classnames[data?.status]} />,
    COMPLETED: <img src={StartDateSVG} className={ProjectPanelIcon1Classnames[data?.status]} />,
    WITHDRAWN: (
      <div className={ProjectPanelIcon1Classnames[data?.status]}>
        <Calendar />
      </div>
    ),
    BLOCKED: <img src={StartDateSVG} className={ProjectPanelIcon1Classnames[data?.status]} />,
  };

  const ProjectPanelDate2Icon: any = {
    OPEN: <img src={StartDateSVG} className={ProjectPanelIcon2Classnames[data?.status]} />,
    IN_REVIEW: <img src={StartDateSVG} className={ProjectPanelIcon2Classnames[data?.status]} />,
    ACTIVE: <img src={StartDateSVG} className={ProjectPanelIcon2Classnames[data?.status]} />,
    ONGOING: <img src={EndDateSVG} className={ProjectPanelIcon2Classnames[data?.status]} />,
    UPCOMING: <img src={StartDateSVG} className={ProjectPanelIcon2Classnames[data?.status]} />,
    CLOSED: (
      <div className={ProjectPanelIcon2Classnames[data?.status]}>
        <svg width="47" height="46" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" width="46" height="46" rx="23" fill="#607D8B" fillOpacity="0.12" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 23C12.5 16.9 17.4 12 23.5 12C29.5338 12 34.3934 16.7942 34.4983 22.8017C33.8784 22.4434 33.1884 22.1927 32.4539 22.0754C31.9963 17.5159 28.1877 14 23.5 14C18.5 14 14.5 18 14.5 23C14.5 28 18.5 32 23.5 32C24.5905 32 25.6335 31.8097 26.5977 31.4603C27.0191 32.0561 27.5463 32.5718 28.1521 32.9798C26.741 33.6349 25.1652 34 23.5 34C17.4 34 12.5 29.1 12.5 23ZM26.533 24.633C26.1383 25.2143 25.8428 25.8685 25.6712 26.5712L22.8 23.7C22.6 23.5 22.5 23.3 22.5 23V17C22.5 16.4 22.9 16 23.5 16C24.1 16 24.5 16.4 24.5 17V22.6L26.533 24.633Z"
            fill="#607D8B"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28.414 24.5H34.586C34.8344 24.5 35 24.6556 35 24.8889V31.1111C35 31.3444 34.8344 31.5 34.586 31.5H28.414C28.1656 31.5 28 31.3444 28 31.1111V24.8889C28 24.6556 28.1656 24.5 28.414 24.5ZM28.828 30.7222H34.172V25.2778H28.828V30.7222Z"
            fill="#0D6EFD"
          />
        </svg>
      </div>
    ),
    TERMINATED: (
      <div className={ProjectPanelIcon2Classnames[data?.status]}>
        <svg width="47" height="46" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" width="46" height="46" rx="23" fill="#EA5455" fillOpacity="0.12" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 23C12.5 16.9 17.4 12 23.5 12C29.5338 12 34.3934 16.7942 34.4983 22.8017C33.8784 22.4434 33.1884 22.1927 32.4539 22.0754C31.9963 17.5159 28.1877 14 23.5 14C18.5 14 14.5 18 14.5 23C14.5 28 18.5 32 23.5 32C24.5905 32 25.6335 31.8097 26.5977 31.4603C27.0191 32.0561 27.5463 32.5718 28.1521 32.9798C26.741 33.6349 25.1652 34 23.5 34C17.4 34 12.5 29.1 12.5 23ZM26.533 24.633C26.1383 25.2143 25.8428 25.8685 25.6712 26.5712L22.8 23.7C22.6 23.5 22.5 23.3 22.5 23V17C22.5 16.4 22.9 16 23.5 16C24.1 16 24.5 16.4 24.5 17V22.6L26.533 24.633Z"
            fill="#EA5455"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28.414 24.5H34.586C34.8344 24.5 35 24.6556 35 24.8889V31.1111C35 31.3444 34.8344 31.5 34.586 31.5H28.414C28.1656 31.5 28 31.3444 28 31.1111V24.8889C28 24.6556 28.1656 24.5 28.414 24.5ZM28.828 30.7222H34.172V25.2778H28.828V30.7222Z"
            fill="#EA5455"
          />
        </svg>
      </div>
    ),
    COMPLETED: <img src={EndDateSVG} className={ProjectPanelIcon2Classnames[data?.status]} />,
    WITHDRAWN: (
      <div className={ProjectPanelIcon2Classnames[data?.status]}>
        <svg width="47" height="46" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" width="46" height="46" rx="23" fill="#EA5455" fillOpacity="0.12" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 23C12.5 16.9 17.4 12 23.5 12C29.5338 12 34.3934 16.7942 34.4983 22.8017C33.8784 22.4434 33.1884 22.1927 32.4539 22.0754C31.9963 17.5159 28.1877 14 23.5 14C18.5 14 14.5 18 14.5 23C14.5 28 18.5 32 23.5 32C24.5905 32 25.6335 31.8097 26.5977 31.4603C27.0191 32.0561 27.5463 32.5718 28.1521 32.9798C26.741 33.6349 25.1652 34 23.5 34C17.4 34 12.5 29.1 12.5 23ZM26.533 24.633C26.1383 25.2143 25.8428 25.8685 25.6712 26.5712L22.8 23.7C22.6 23.5 22.5 23.3 22.5 23V17C22.5 16.4 22.9 16 23.5 16C24.1 16 24.5 16.4 24.5 17V22.6L26.533 24.633Z"
            fill="#EA5455"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28.414 24.5H34.586C34.8344 24.5 35 24.6556 35 24.8889V31.1111C35 31.3444 34.8344 31.5 34.586 31.5H28.414C28.1656 31.5 28 31.3444 28 31.1111V24.8889C28 24.6556 28.1656 24.5 28.414 24.5ZM28.828 30.7222H34.172V25.2778H28.828V30.7222Z"
            fill="#EA5455"
          />
        </svg>
      </div>
    ),
    BLOCKED: <img src={EndDateSVG} className={ProjectPanelIcon2Classnames[data?.status]} />,
  };

  const ProjectPanelDate1Values: any = {
    OPEN: data?.createdAt,
    IN_REVIEW: data?.createdAt,
    ACTIVE: data?.createdAt,
    ONGOING: data?.listingDetails?.startDateEpoch,
    UPCOMING: data?.createdAt,
    CLOSED: data?.createdAt,
    TERMINATED: data?.listingDetails?.startDateEpoch,
    COMPLETED: data?.listingDetails?.startDateEpoch,
    WITHDRAWN: data?.createdAt,
    BLOCKED: data?.listingDetails?.startDateEpoch,
  };

  const ProjectPanelDate2Values: any = {
    OPEN: data?.listingDetails?.startDateEpoch,
    IN_REVIEW: data?.listingDetails?.startDateEpoch,
    ACTIVE: data?.listingDetails?.startDateEpoch,
    ONGOING: data?.listingDetails?.endDateEpoch,
    UPCOMING: data?.listingDetails?.startDateEpoch,
    CLOSED: data?.updatedAt,
    TERMINATED: data?.updatedAt,
    COMPLETED: data?.listingDetails?.endDateEpoch,
    WITHDRAWN: data?.listingDetails?.endDateEpoch,
    BLOCKED: data?.updatedAt,
  };

  const handleToggle = () => {
    setShowMore((prev) => !prev);
  };
  const daysLeft = calculateDays(data?.listingDetails?.startDateEpoch, data?.listingDetails?.endDateEpoch)?.daysLeft;

  useEffect(() => {
    if (data) {
      const tags = [...(data?.skillsData || []), ...(data?.toolsData || [])];
      setTagsData(tags);
      setSecondaryStatus(() => data?.secondaryStatus?.next);
    }

    if (projectId && isEmpty(milestoneId)) {
      populateProjectMilestones(projectId);
    }
  }, [data]);

  useEffect(() => {
    setIsBlocked(projectMilestones?.reduce((acc, milestone) => acc || milestone.isBlocked, false));
  }, [projectMilestones]);

  return (
    <div className="bg-white flex flex-col items-start gap-4 px-5 py-5 w-full md:w-[350px] h-fit rounded-xl w-[400px]">
      <div className="flex flex-row items-center w-full justify-between">
        <ProjectStatusChip
          status={data?.status as string as keyof typeof SecondaryProjectStatus | keyof typeof PrimaryProjectStatus}
          statusType={StatusType?.PRIMARY}
        />

        {daysLeft > 0 && <h1 className="text-[#EA5455] font-semibold">{daysLeft} Days Left</h1>}
      </div>
      <h1 className="text-[#5E5873] font-medium text-[18px] leading-[21px] font-montserrat">{data?.details?.name}</h1>

      {userDetails?.userType === userTypes.talent && (
        <div className="flex flex-row items-center justify-center gap-3">
          <div className="flex flex-col items-center justify-center gap-1">
            <Avatar>
              <AvatarImage src={data?.clientInfo?.imageUri?.length! > 0 ? data?.clientInfo?.imageUri : defaultAvatar} />
              <AvatarFallback>
                <User color="#6E6B7B" />
              </AvatarFallback>
            </Avatar>
            <h1 className={`${UserTypeChipClassnames[UserType?.CLIENT]} font-semibold px-2 py-1 rounded-xl`}>Client</h1>
          </div>

          <div className="flex flex-col items-start gap-1">
            <h1 className="text-[var(--1-theme-color-heading-display-text,#5E5873)] font-normal text-[16px] font-montserrat">
              <div>{data?.clientInfo?.departmentName ?? ''}</div>
              <div>
                {data?.clientInfo?.firstName ?? ''} {data?.clientInfo?.lastName ?? ''}
              </div>
            </h1>
            {/* {data?.clientInfo?.rating && <RatingInfo rating={data?.clientInfo?.rating || 0} />} */}
          </div>
        </div>
      )}

      <div className="text-[#5E5873] font-medium text-[18px] leading-[21px] font-montserrat mt-2">Project Details</div>
      <div className="h-[1px] w-[313px] bg-[#EBE9F1]"></div>

      <div className="w-full flex flex-row  items-center justify-start gap-5">
        <div className="flex flex-row items-center gap-1">
          {/* <img
            src={StartDateSVG}
            className="w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[rgba(13,110,253,0.12)]"
            alt=""
          /> */}
          {ProjectPanelDate1Icon[data?.status]}
          <div className="flex flex-col items-start">
            <h1 className="text-[var(--1-theme-color-heading-display-text,#5E5873)] font-medium text-[14px] leading-[23px] font-montserrat">
              {convertUnixTimestampToDate(ProjectPanelDate1Values[data?.status])}
            </h1>
            <h1 className="text-[var(--1-theme-color-body-text,#6E6B7B)] font-normal text-[12px] leading-[18px] font-montserrat no-ligatures">
              {ProjectPanelCaptionDate1[data?.status]}
            </h1>
          </div>
        </div>
        <div className="flex flex-row items-center gap-1">
          {/* <img
            src={EndDateSVG}
            className="w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[rgba(13,110,253,0.12)]"
            alt=""
          /> */}
          {ProjectPanelDate2Icon[data?.status]}
          <div className="flex flex-col items-start">
            <h1
              className={`${
                ProjectPanelDate2Classnames[data?.status]
              } font-medium text-[14px] leading-[23px] font-montserrat`}
            >
              {convertUnixTimestampToDate(ProjectPanelDate2Values[data?.status])}
            </h1>
            <h1
              className={`${
                ProjectPanelDate2Classnames[data?.status]
              } font-normal text-[12px] leading-[18px] font-montserrat no-ligatures`}
            >
              {ProjectPanelCaptionDate2[data?.status]}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-start w-full gap-5 text-gray-600">
        <div className="flex flex-row items-start justify-between w-full">
          <div className="text-[var(--1-theme-color-body-text,#6E6B7B)] font-normal text-[14px] leading-[21px] font-montserrat">
            Estimated Duration :{' '}
            <span className="text-[#5E5873] font-medium text-[14px] leading-[21px] font-montserrat">
              {data?.details?.expectedDuration?.duration} Weeks
            </span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <Paperclip size={14} />
            <h1 className="text-[var(--1-theme-color-body-text,#6E6B7B)] font-normal text-[14px] leading-[21px] font-montserrat">
              {data?.details?.documents?.length}
            </h1>
          </div>
        </div>
        {!isEmpty(secondaryStatus) && (
          <div className="flex flex-row items-start gap-3">
            <div className="text-[var(--1-theme-color-body-text,#6E6B7B)] font-normal text-[14px] leading-[21px] font-montserrat">
              Status :
            </div>{' '}
            <ProjectStatusChip
              status={secondaryStatus as keyof typeof SecondaryProjectStatus | keyof typeof PrimaryProjectStatus}
              statusType={StatusType?.SECONDARY}
              rounded={true}
            />
          </div>
        )}

        {(data?.skillsData?.length! > 0 || data?.toolsData?.length! > 0) && (
          <div className="flex flex-row items-start w-full justify-start gap-2">
            <h1 className="text-[var(--1-theme-color-body-text,#6E6B7B)] font-normal text-[14px] leading-[21px] font-montserrat m-0">
              Tags:
            </h1>
            <BadgeGroup tags={tagsData || []} className="bg-skyblue-light text-skyblue" />
          </div>
        )}

        <div className="flex flex-col w-full ">
          <h1 className="text-[var(--1-theme-color-body-text,#6E6B7B)] font-medium text-[14px] leading-[21px] font-montserrat">
            Description:{' '}
          </h1>
          <p className="text-[var(--1-theme-color-body-text,#6E6B7B)] font-normal text-[14px] leading-[21px] font-montserrat break-words">
            {showMore
              ? data?.details?.description
              : `${data?.details?.description?.slice(0, 100)}` +
                (data?.details?.description?.length > 100 ? '...' : '')}
            <span onClick={handleToggle} className="text-skyblue cursor-pointer">
              {data?.details?.description?.length > 100 ? (showMore ? ' read less' : ' read more') : null}
            </span>
          </p>
        </div>

        <div className="flex flex-row items-center w-full mx-auto justify-center gap-5">
          {userDetails.userType === UserType.CLIENT && primaryProjectStatus === PrimaryProjectStatus.OPEN && (
            <PrimaryButton
              disabled={isBlocked}
              onClick={() => {}}
              className="flex w-[113.431px] px-[22px] py-[10px] justify-center items-center gap-[8px] rounded-[5px] bg-[#EA5455]"
            >
              Withdraw
            </PrimaryButton>
          )}
          {userDetails.userType === UserType.CLIENT &&
            (primaryProjectStatus === PrimaryProjectStatus.ACTIVE ||
              primaryProjectStatus === PrimaryProjectStatus.ONGOING ||
              primaryProjectStatus === PrimaryProjectStatus.BLOCKED) && (
              <PrimaryButton
                disabled={isBlocked}
                onClick={() => {}}
                className="flex w-[113.431px] px-[22px] py-[10px] justify-center items-center gap-[8px] rounded-[5px] bg-[#EA5455]"
              >
                Terminate
              </PrimaryButton>
            )}
          {((userDetails.userType === UserType.CLIENT &&
            (primaryProjectStatus === PrimaryProjectStatus.ACTIVE ||
              primaryProjectStatus === PrimaryProjectStatus.ONGOING ||
              primaryProjectStatus === PrimaryProjectStatus.BLOCKED)) ||
            (userDetails.userType === UserType.TALENT &&
              primaryProjectStatus !== PrimaryProjectStatus.TERMINATED &&
              primaryProjectStatus !== PrimaryProjectStatus.COMPLETED)) && (
            <PrimaryButton
              onClick={() => {}}
              className="flex w-[113.431px] px-[22px] py-[10px] justify-center items-center gap-[8px] rounded-[5px] bg-[#0065C1]"
            >
              <span>Message</span>
            </PrimaryButton>
          )}
          {userDetails.userType === UserType.CLIENT && primaryProjectStatus === PrimaryProjectStatus.OPEN && (
            <PrimaryButton
              disabled={isBlocked}
              onClick={() => {}}
              className="flex w-[113.431px] px-[22px] py-[10px] justify-center items-center gap-[8px] rounded-[5px] bg-[#0065C1]"
            >
              Invite
            </PrimaryButton>
          )}
            {userDetails.userType === UserType.CLIENT && primaryProjectStatus === PrimaryProjectStatus.WITHDRAWN && (
            <PrimaryButton
              disabled={isBlocked}
              onClick={() => {}}
              className="flex w-[113.431px] px-[22px] py-[10px] justify-center items-center gap-[8px] rounded-[5px] bg-[#0065C1]"
            >
              Re-List
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBarProjectDetails;
