import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import CollapsableCard from '@flexternships/app/components/core/cards/CollapsableCard';
import { Avatar, AvatarFallback, AvatarImage } from '@flexternships/app/components/ui/avatar';

// styles
import Styles from '@flexternships/styles/pages/project-details/projects-tab/tab-content.module.css';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function InvitationCard() {
  const params = useParams();

  const projectDetails = useProjectsStore((state) => state.projectDetails);

  const invitationCardData = {
    isCollapsible: false,
    bordered: true,
    isOpen: true,
    headerContent: (
      <div className="flex w-full items-center mr-3 justify-between">
        <div className="flex flex-col text-left">
          <div className="text-[#B9B9C3] font-sans text-[12px] font-semibold leading-[16px]">STEP 1</div>
          <div className="text-[#5E5873] font-sans text-[16px] font-medium leading-[24px] !no-underline hover:!no-underline">
            Invitation
          </div>
        </div>
        <div>
          <Link
            to={`/project-details/${params?.projectId}/milestone`}
            className="text-center text-[14px] font-semibold tracking-[0.4px] text-[#0185E4]"
          >
            View Milestone(s)
          </Link>
        </div>
      </div>
    ),
  };

  const invitationCardDetailsData = {
    company: `${projectDetails?.clientDetails?.first_name} ${projectDetails?.clientDetails?.last_name}`,
    department: projectDetails?.clientDetails?.department,
    image_uri: projectDetails?.clientDetails?.image_uri,
    start_date: 'Sep 13, 2024',
    role: 'Backend Developer',
    estimated_duration: '2 Weeks',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim ut tellus elementum sagittis vitae et leo. Duis... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim ut tellus elementum sagittis vitae et leo. Duis...',
  };

  useEffect(() => {
    console.log(projectDetails);
  }, [projectDetails]);

  return (
    <CollapsableCard {...invitationCardData}>
      <div className="p-3 flex flex-col gap-5 w-full">
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src={projectDetails?.clientDetails?.image_uri} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <div className={Styles.invitationCardDetailsTitle}>{invitationCardDetailsData?.company}</div>
            <div className={Styles.invitationCardDetailsSubtitle}>{invitationCardDetailsData?.department}</div>
          </div>
        </div>
        <div className="flex gap-10">
          <div>
            <div className={Styles.invitationCardDetailsTitle}>{invitationCardDetailsData?.start_date}</div>
            <div className={Styles.invitationCardDetailsSubtitle}>Start Date</div>
          </div>
          <div>
            <div className={Styles.invitationCardDetailsTitle}>{invitationCardDetailsData?.role}</div>
            <div className={Styles.invitationCardDetailsSubtitle}>Role</div>
          </div>
          <div>
            <div className={Styles.invitationCardDetailsTitle}>{invitationCardDetailsData?.estimated_duration}</div>
            <div className={Styles.invitationCardDetailsSubtitle}>Estimated Duration</div>
          </div>
        </div>
        <div className="flex flex-col w-fit">
          <div className={Styles.invitationCardDetailsTitle}>Message</div>
          <div className={Styles.invitationCardDetailsSubtitle}>{invitationCardDetailsData?.message}</div>
        </div>
      </div>
    </CollapsableCard>
  );
}
