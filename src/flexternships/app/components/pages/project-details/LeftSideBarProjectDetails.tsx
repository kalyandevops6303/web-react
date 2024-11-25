import ProjectStatusChip from './projectCard/ProjectStatusChip';
import BadgeGroup from './projectCard/BadgeGroup';
import { useEffect, useState } from 'react';

import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { calculateDays, convertUnixTimestampToDate } from '@/utility/Utils';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { BadgeType } from '@/flexternships/constraints/types/project-details-types';
import { Paperclip, User } from 'react-feather';
import { UserType } from '@/flexternships/constraints/enums/core-enums';
import PrimaryButton from '../../core/buttons/PrimaryButton';
import {
  PrimaryProjectStatus,
  ProjectPanelCaptionDate1,
  ProjectPanelCaptionDate2,
  ProjectPanelDate2Classnames,
  SecondaryProjectStatus,
  StatusType,
} from '@/flexternships/constraints/enums/project-enums';
import { useProjectMilestonesStore } from '@/flexternships/stores/project-milestones-store';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { userTypes } from '@/utility/constants/Constant';
import DocumentsModal from '../../core/modals/DocumentsModal';
import {
  getProjectPanelDate1Icon,
  getProjectPanelDate1Values,
  getProjectPanelDate2Icon,
  getProjectPanelDate2Values,
} from './leftSidebarProjectPanel/ProjectData';
import toast from 'react-hot-toast';

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

  const handleToggle = () => {
    setShowMore((prev) => !prev);
  };
  const daysLeft = calculateDays(data?.listingDetails?.startDateEpoch, data?.listingDetails?.endDateEpoch)?.daysLeft;

  const [documentsModal, setDocumentsModal] = useState(false);
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
    <div className="bg-white flex flex-col items-start gap-4 px-5 py-5 md:w-[350px] h-fit rounded-xl w-[400px]">
      <div className="flex flex-row items-center w-full justify-between">
        <DocumentsModal
          isOpen={documentsModal}
          onClose={() => setDocumentsModal(false)}
          data={data?.details?.documents}
        />
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
          {getProjectPanelDate1Icon(data)}
          <div className="flex flex-col items-start">
            <h1 className="text-[var(--1-theme-color-heading-display-text,#5E5873)] font-medium text-[14px] leading-[23px] font-montserrat">
              {convertUnixTimestampToDate(
                getProjectPanelDate1Values(data)[data?.status as string as keyof typeof PrimaryProjectStatus],
              )}
            </h1>
            <h1 className="text-[var(--1-theme-color-body-text,#6E6B7B)] font-normal text-[12px] leading-[18px] font-montserrat no-ligatures">
              {ProjectPanelCaptionDate1[data?.status]}
            </h1>
          </div>
        </div>
        <div className="flex flex-row items-center gap-1">
          {getProjectPanelDate2Icon(data)}
          <div className="flex flex-col items-start">
            <h1
              className={`${
                ProjectPanelDate2Classnames[data?.status]
              } font-medium text-[14px] leading-[23px] font-montserrat`}
            >
              {convertUnixTimestampToDate(
                getProjectPanelDate2Values(data)[data?.status as string as keyof typeof PrimaryProjectStatus],
              )}
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
          <div onClick={() =>{ 
            if(data?.details?.documents?.length > 0){
              setDocumentsModal(true);
            }else{
              toast.error('No documents available for this project');
            }
           

          }} className="flex flex-row items-center gap-1">
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
