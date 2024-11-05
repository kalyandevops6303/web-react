import CollapsableCard from '@flexternships/app/components/core/cards/CollapsableCard';
import { Avatar, AvatarFallback, AvatarImage } from '@flexternships/app/components/ui/avatar';

// styles
import Styles from '@flexternships/styles/pages/project-details/projects-tab/tab-content.module.css';
import { useParams } from 'react-router-dom';

export default function InvitationCard() {
  const params = useParams();

  const invitationCardData = {
    title: 'Invitation',
    subtitle: 'STEP 1',
    isCollapsible: false,
    bordered: true,
    isOpen: true,
    link: {
      text: 'View Milestone(s)',
      href: `/project-details/${params?.projectId}/milestone`,
    },
  };

  const invitationCardDetailsData = {
    company: 'Light Bulb (Team)',
    department: 'R&D',
    image_uri: '',
    start_date: 'Sep 13, 2024',
    role: 'Backend Developer',
    estimated_duration: '2 Weeks',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim ut tellus elementum sagittis vitae et leo. Duis... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim ut tellus elementum sagittis vitae et leo. Duis...',
  };

  return (
    <CollapsableCard {...invitationCardData}>
      <div className="p-3 flex flex-col gap-5 w-full">
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
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
