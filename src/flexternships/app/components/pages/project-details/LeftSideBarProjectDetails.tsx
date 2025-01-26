import { useEffect, useRef, useState } from 'react';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { BadgeType } from '@/flexternships/constraints/types/project-details-types';
import { Eye, Paperclip, User } from 'react-feather';
import {
  ProjectPrimaryStatus,
  ProjectSecondaryStatus,
  ToastType,
  UserType,
} from '@/flexternships/constraints/enums/core-enums';
import PrimaryButton from '../../core/buttons/PrimaryButton';
import {
  ProjectLeftPanelAction,
  ProjectPanelCaptionDate1,
  ProjectPanelCaptionDate2,
  ProjectPanelDate2Classnames,
  ProjectPanelIcon1Classnames,
  ProjectPanelIcon2Classnames,
  StatusType,
} from '@/flexternships/constraints/enums/project-enums';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { userTypes } from '@/utility/constants/Constant';
import DocumentsModal from '../../core/modals/DocumentsModal';
import { epochDifferenceInDays, formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';
import { CHAT_ENTRY_POINT } from '@/flexternships/static/constants';
import ProjectDescriptionModal from '../../core/modals/ProjectDescriptionModal';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { getPrimaryAction, getSecondaryAction, getTextByAction } from '@/flexternships/static/project-details-content';
import ProjectRelistFlow from '../../core/flows/ProjectRelistFlow';
import ProjectTerminateFlow from '../../core/flows/ProjectTerminateFlow';
import ProjectWithdrawFlow from '../../core/flows/ProjectWithdrawFlow';
import SimpleElevatedCard from '../../core/cards/SimpleElevatedCard';
import PrimaryIconText from '../../core/buttons/PrimaryIconText';
import wowIcon from '@flexternships/assets/icons/core/wow/wow-blue.svg';
import kudosIcon from '@flexternships/assets/icons/core/kudos/kudos-blue.svg';
import ProjectStatusChip from './project-card/ProjectStatusChip';
import BadgeGroup from './project-card/BadgeGroup';
import classNames from 'classnames';
import {
  getProjectPanelDate1Icon,
  getProjectPanelDate1Values,
  getProjectPanelDate2Icon,
  getProjectPanelDate2Values,
} from '@/flexternships/static/project-left-panel-content';

enum UserTypeChipClassnames {
  TALENT = 'bg-yellow-soft text-error',
  CLIENT = 'flex h-[18px] p-[1px_9px] items-center gap-[3px] rounded-4.5 bg-blue-softLight text-blue-brightLight text-center font-semibold text-3 leading-4.5 font-montserrat',
}

enum ProjectFlowType {
  WITHDRAW = 'WITHDRAW',
  TERMINATE = 'TERMINATE',
  RELIST = 'RELIST',
}

const LeftSideBarProjectDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { projectId } = params;

  const data = useProjectsStore((state) => state.projectDetails);
  const userDetails = useFlexternUserStore((state) => state.userDetails);
  const [secondaryStatus, setSecondaryStatus] = useState<ProjectSecondaryStatus | undefined>();
  const [tagsData, setTagsData] = useState<BadgeType[]>([]);
  const [showMore, setShowMore] = useState(false);

  const [currentProjectFlow, setCurrentProjectFlow] = useState<ProjectFlowType | undefined>();

  const primaryAction = getPrimaryAction({ status: data?.status, userType: userDetails.userType });
  const secondaryAction = getSecondaryAction({ status: data?.status, userType: userDetails.userType });

  const modalRef = useRef<HTMLDivElement>(null);
  const handleToggle = () => {
    setShowMore((prev) => !prev);
  };

  const handleMessageClick = () => {
    window.open(CHAT_ENTRY_POINT, '_blank');
  };

  const handleCloseDescriptionModal = () => setShowMore(false);

  const daysLeft =
    Date.now() < data?.details?.expectedStartDate
      ? epochDifferenceInDays(Date.now(), data?.details?.expectedStartDate)
      : 0;

  const [documentsModal, setDocumentsModal] = useState(false);

  const closeCurrentProjectFlow = () => setCurrentProjectFlow(undefined);
  const initiateRelistFlow = () => setCurrentProjectFlow(ProjectFlowType.RELIST);

  const primaryActionHandler = () => {
    console.log('primaryActionHandler', primaryAction);
    switch (primaryAction) {
      case ProjectLeftPanelAction.MESSAGE:
        return handleMessageClick();
      case ProjectLeftPanelAction.RELIST:
        return setCurrentProjectFlow(ProjectFlowType.RELIST);
      default:
        break;
    }
  };

  const secondaryActionHandler = () => {
    console.log('secondaryActionHandler', secondaryAction);
    switch (secondaryAction) {
      case ProjectLeftPanelAction.TERMINATE:
        return setCurrentProjectFlow(ProjectFlowType.TERMINATE);
      case ProjectLeftPanelAction.WITHDRAW:
        return setCurrentProjectFlow(ProjectFlowType.WITHDRAW);
      default:
        break;
    }
  };

  useEffect(() => {
    if (data) {
      const tags = [...(data?.skillsData || []), ...(data?.toolsData || [])];
      setTagsData(tags);
      setSecondaryStatus(() => data?.secondaryStatus?.next);
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleCloseDescriptionModal();
      }
    };

    if (showMore) {
      document.addEventListener('click', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [showMore]);

  const handleGiveRecognitionClick = () => {
    navigate(`/recognition/${projectId}`);
  };

  const handleViewRecognitionClick = () => {
    navigate(`/recognition/${projectId}`, { state: { viewRecognitions: true } });
  };

  return (
    <div className="flex flex-col gap-y-5">
      <SimpleElevatedCard className="bg-white flex flex-col items-start gap-4 px-5 py-5 md:w-[350px] h-fit rounded-xl w-[400px]">
        <div className="flex flex-row items-center w-full justify-between">
          <DocumentsModal
            isOpen={documentsModal}
            onClose={() => setDocumentsModal(false)}
            data={data?.details?.documents}
          />
          <ProjectStatusChip status={data?.status} statusType={StatusType?.PRIMARY} />

          {daysLeft > 0 && <h1 className="text-error font-semibold">{daysLeft} Days Left</h1>}
        </div>
        <h1 className="text-grey-heading font-medium text-4.5 leading-[21px] font-montserrat">{data?.details?.name}</h1>

        {userDetails?.userType === userTypes.talent && (
          <div className="flex flex-row items-center justify-center gap-3">
            <div className="flex flex-col items-center justify-center gap-1">
              <Avatar>
                <AvatarImage
                  src={data?.clientInfo?.imageUri?.length! > 0 ? data?.clientInfo?.imageUri : defaultAvatar}
                />
                <AvatarFallback>
                  <User color="#6E6B7B" />
                </AvatarFallback>
              </Avatar>
              <h1
                className={classNames(UserTypeChipClassnames[UserType?.CLIENT], `font-semibold px-2 py-1 rounded-xl`)}
              >
                Client
              </h1>
            </div>

            <div className="flex flex-col items-start gap-1">
              <h1 className="text-grey-heading font-normal text-base font-montserrat">
                <div>{data?.clientInfo?.departmentName ?? ''}</div>
                <div>
                  {data?.clientInfo?.firstName ?? ''} {data?.clientInfo?.lastName ?? ''}
                </div>
              </h1>
            </div>
          </div>
        )}
        <div className="text-grey-heading font-medium text-lg leading-[21px] font-montserrat mt-2">Project Details</div>
        <div className="h-[1px] w-[313px] bg-grey-border"></div>

        <div className="w-full flex flex-row  items-center justify-start gap-5">
          <div className="flex flex-row items-center gap-1">
            <div className={ProjectPanelIcon1Classnames[data?.status] + 'border rounded-full'}>
              {getProjectPanelDate1Icon(data)}
            </div>

            <div className="flex flex-col items-start">
              <h1 className="text-grey-heading font-medium text-sm leading-5.5 font-montserrat">
                {formatEpochToHumanReadable(getProjectPanelDate1Values(data)[data?.status] ?? 0)}
              </h1>
              <h1 className="text-grey-heading font-normal text-xs leading-4.5 font-montserrat no-ligatures">
                {ProjectPanelCaptionDate1[data?.status]}
              </h1>
            </div>
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className={classNames(ProjectPanelIcon2Classnames[data?.status], 'border rounded-full')}>
              {getProjectPanelDate2Icon(data)}
            </div>

            <div className="flex flex-col items-start">
              <h1
                className={classNames(
                  ProjectPanelDate2Classnames[data?.status],
                  'font-medium text-sm leading-5.5 font-montserrat',
                )}
              >
                {formatEpochToHumanReadable(getProjectPanelDate2Values(data)[data?.status] ?? 0)}
              </h1>
              <h1
                className={classNames(
                  ProjectPanelDate2Classnames[data?.status],
                  'font-normal text-xs leading-4.5 font-montserrat no-ligatures',
                )}
              >
                {ProjectPanelCaptionDate2[data?.status]}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start w-full gap-5 text-gray-600">
          <div className="flex flex-row items-start justify-between w-full">
            <div className="text-grey-heading font-normal text-sm leading-[21px] font-montserrat">
              Estimated Duration :{' '}
              <span className="text-grey-heading font-medium text-sm leading-[21px] font-montserrat">
                {data?.details?.expectedDuration?.duration} Weeks
              </span>
            </div>
            <div
              onClick={() => {
                if (data?.details?.documents?.length > 0) {
                  setDocumentsModal(true);
                } else {
                  showToastMessage(ToastType.ERROR, 'No documents found');
                }
              }}
              className="flex flex-row items-center gap-1 cursor-pointer"
            >
              <Paperclip size={14} />
              <h1 className="text-grey-heading font-normal text-sm leading-[21px] font-montserrat">
                {data?.details?.documents?.length}
              </h1>
            </div>
          </div>
          {secondaryStatus && (
            <>
              {userDetails.userType === UserType.CLIENT
                ? data.isDocumentsNeeded || secondaryStatus !== ProjectSecondaryStatus.SIGN_REQUESTED
                : userDetails.userType === UserType.TALENT &&
                  ![
                    ProjectSecondaryStatus.SIGN_NDA,
                    ProjectSecondaryStatus.SIGN_CONTRACT,
                    ProjectSecondaryStatus.SIGN_DOCUMENTS,
                  ].includes(secondaryStatus) && (
                    <div className="flex flex-row items-start gap-3">
                      <div className="text-grey font-normal text-sm leading-[21px] font-montserrat">Status:</div>
                      <ProjectStatusChip
                        status={secondaryStatus}
                        statusType={StatusType?.SECONDARY}
                        rounded={true}
                        lastInProgressMilestone={data.lastInProgressMilestone}
                      />
                    </div>
                  )}
            </>
          )}

          {(data?.skillsData?.length! > 0 || data?.toolsData?.length! > 0) && (
            <div className="flex flex-row items-start w-full justify-start gap-2">
              <h1 className="text-grey font-normal text-sm leading-[21px] font-montserrat m-0">Tags:</h1>
              <BadgeGroup tags={tagsData || []} className="bg-skyblue-light text-skyblue" />
            </div>
          )}

          <div className="flex flex-col w-full ">
            <h1 className="text-grey font-medium text-sm leading-[21px] font-montserrat">Description: </h1>
            <p className="text-grey font-normal text-sm leading-[21px] font-montserrat break-words">
              {`${data?.details?.description?.slice(0, 100)}` + (data?.details?.description?.length > 100 ? '...' : '')}
              <span onClick={handleToggle} className="text-skyblue cursor-pointer">
                {data?.details?.description?.length > 100 ? (showMore ? ' read less' : ' read more') : null}
              </span>
            </p>
          </div>

          <div className="w-full flex flex-row items-center justify-center gap-x-8">
            {secondaryAction && (
              <PrimaryButton className="m-0" onClick={secondaryActionHandler} cancel>
                {getTextByAction(secondaryAction)}
              </PrimaryButton>
            )}
            {primaryAction && (
              <PrimaryButton onClick={primaryActionHandler} className="m-0">
                {getTextByAction(primaryAction)}
              </PrimaryButton>
            )}
          </div>
        </div>

        {showMore && (
          <ProjectDescriptionModal
            modalRef={modalRef}
            isOpen={showMore}
            onClose={handleCloseDescriptionModal}
            data={data?.details?.description}
          />
        )}
        {projectId &&
          currentProjectFlow &&
          {
            [ProjectFlowType.RELIST]: (
              <ProjectRelistFlow
                project={{ id: projectId, name: data?.details?.name }}
                onClose={closeCurrentProjectFlow}
              />
            ),
            [ProjectFlowType.TERMINATE]: (
              <ProjectTerminateFlow
                project={{ id: projectId, name: data?.details?.name }}
                onClose={closeCurrentProjectFlow}
                initiateRelist={initiateRelistFlow}
                withRelist={data.status === ProjectPrimaryStatus.ACTIVE}
              />
            ),
            [ProjectFlowType.WITHDRAW]: (
              <ProjectWithdrawFlow
                project={{ id: projectId, name: data?.details?.name }}
                onClose={closeCurrentProjectFlow}
                initiateRelist={initiateRelistFlow}
              />
            ),
          }[currentProjectFlow]}
      </SimpleElevatedCard>
      <SimpleElevatedCard className="bg-white p-4 flex flex-col gap-y-3">
        <div className="flex flex-row items-center gap-x-3">
          <div className="text-sm font-medium leading-5.5 text-black">Quick Actions</div>
          {secondaryStatus === ProjectSecondaryStatus.MILESTONE && (
            <div className="py-[1px] px-[9px] rounded-4.5 bg-orange-light text-orange-dark text-xs font-semibold leading-4.5">
              Milestone {data.lastInProgressMilestone}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <PrimaryIconText
            text={`Give ${userDetails.userType === UserType.TALENT ? 'Kudos!' : 'a WOW!'}`}
            icon={
              <img
                src={userDetails.userType === UserType.TALENT ? kudosIcon : wowIcon}
                alt={'Recognition Icon'}
                className="size-[18px]"
              />
            }
            disabled={!data?.giveRecognition}
            onClick={handleGiveRecognitionClick}
          />
          <PrimaryIconText
            text={`View ${userDetails.userType === UserType.TALENT ? 'Kudos' : 'WOWs'}!`}
            icon={<Eye className="text-trublue-secondary-500" size={18} />}
            onClick={handleViewRecognitionClick}
            disabled={!data?.viewRecognition}
          />
        </div>
      </SimpleElevatedCard>
    </div>
  );
};

export default LeftSideBarProjectDetails;
