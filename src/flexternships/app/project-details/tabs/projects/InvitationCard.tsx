import Spinner from '@/flexternships/app/components/core/Spinner';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import { formatEpochToHumanReadable, getDaysLeft } from '@/flexternships/utils/date-utils';
import CollapsableCard from '@flexternships/app/components/core/cards/CollapsableCard';
import { Avatar, AvatarFallback, AvatarImage } from '@flexternships/app/components/ui/avatar';
import parse from 'html-react-parser';

// styles
import Styles from '@flexternships/styles/pages/project-details/projects-tab/tab-content.module.css';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function InvitationCard({ hideSubtitle = false }) {
  const params = useParams();

  const projectDetails = useProjectsStore((state) => state.projectDetails);
  const projectInvitationDetails = useProjectsStore((state) => state.projectInvitationDetails);
  const isProjectInvitationDetailsLoading = useProjectsStore((state) => state.isProjectInvitationDetailsLoading);
  const setProjectInvitationRead = useProjectsStore((state) => state.setProjectInvitationRead);

  const getProjectInvitationDetails = useProjectsStore((state) => state.getProjectInvitationDetails);

  useEffect(() => {
    if (!projectInvitationDetails?.is_read) {
      setProjectInvitationRead(params?.projectId as string);
    }
  }, [projectInvitationDetails]);
  const invitationCardData = {
    isCollapsible: false,
    bordered: true,
    isOpen: true,
    headerContent: (
      <div className="flex w-full items-center mr-3 justify-between">
        <div className="flex flex-col text-left">
          {!hideSubtitle && <div className="text-grey-muted font-sans text-xs font-semibold leading-4">STEP 1</div>}
          <div className="relative">
            {projectInvitationDetails?.is_read && (
              <div className="absolute top-0 -right-2 w-2 h-2 border bg-error rounded-full border-error"></div>
            )}
            <div className="text-grey-heading font-sans text-base font-medium leading-6 !no-underline hover:!no-underline">
              Invitation
            </div>
          </div>
        </div>
        <div>
          <Link
            to={`/project-details/${params?.projectId}/milestone`}
            className="text-center text-sm font-semibold tracking-wide text-trublue-secondary-500"
          >
            View Milestone(s)
          </Link>
        </div>
      </div>
    ),
  };

  const invitationCardDetailsData = {
    company: `${projectDetails?.clientInfo?.firstName} ${projectDetails?.clientInfo?.lastName}`,
    department: projectDetails?.clientInfo?.departmentName,
    image_uri: projectDetails?.clientInfo?.imageUri,
    start_date: formatEpochToHumanReadable(projectInvitationDetails?.project_start_date || 1),
    role: projectInvitationDetails?.talent_role,
    estimated_duration: `${projectInvitationDetails?.project_estimated_duration?.duration} Weeks`,
    message: projectInvitationDetails?.message,
  };

  useEffect(() => {
    getProjectInvitationDetails(params?.projectId as string);
  }, []);

  if (isProjectInvitationDetailsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-48">
        <div className="h-8 w-8">
          <Spinner />
        </div>
      </div>
    );
  }
  const timeGapOfInvite = getDaysLeft(projectInvitationDetails?.project_start_date || 1, Date.now());
  return (
    <CollapsableCard {...invitationCardData}>
      <div className="p-3 flex flex-col gap-5 w-full">
        <div className="flex flex-row items-start w-full justify-between">
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage
                src={invitationCardDetailsData?.image_uri ? invitationCardDetailsData?.image_uri : defaultAvatar}
              />
              <AvatarFallback>
                {invitationCardDetailsData?.company
                  ?.split(' ')
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className={Styles.invitationCardDetailsTitle}>{invitationCardDetailsData?.company}</div>
              <div className={Styles.invitationCardDetailsSubtitle}>{invitationCardDetailsData?.department}</div>
            </div>
          </div>
          <div className="min-w-20">
            <h1 className="text-xs">{timeGapOfInvite} Day(s) ago</h1>
          </div>
        </div>
        <div className="flex">
          <div className="border-l-0 border-y-0 px-9 border-r-1 border-grey-50 ">
            <div className={Styles.invitationCardDetailsTitle}>{invitationCardDetailsData?.start_date}</div>
            <div className={Styles.invitationCardDetailsSubtitle}>Start Date</div>
          </div>
          <div className="border-l-0 border-y-0 px-9 border-r-1 border-grey-50 ">
            <div className={Styles.invitationCardDetailsTitle}>{invitationCardDetailsData?.role}</div>
            <div className={Styles.invitationCardDetailsSubtitle}>Role</div>
          </div>
          <div className="px-9">
            <div className={Styles.invitationCardDetailsTitle}>{invitationCardDetailsData?.estimated_duration}</div>
            <div className={Styles.invitationCardDetailsSubtitle}>Estimated Duration</div>
          </div>
        </div>
        {invitationCardDetailsData?.message && (
          <div className="flex flex-col w-fit">
            <div className={Styles.invitationCardDetailsTitle}>Message</div>
            <div className={Styles.invitationCardDetailsSubtitle}>{parse(invitationCardDetailsData?.message)}</div>
          </div>
        )}
      </div>
    </CollapsableCard>
  );
}
