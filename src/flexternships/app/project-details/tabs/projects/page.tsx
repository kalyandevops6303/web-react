'use client';
import Styles from '@flexternships/styles/pages/project-details/projects-tab/tab-content.module.css';
import SimpleElevatedCard from '../../../components/core/cards/SimpleElevatedCard';
import VerticalTimeline from '../../../components/core/timelines/VerticalTimeline';
import InvitationCard from './InvitationCard';
import DocumentCard from './DocumentCard';
import { useParams } from 'react-router-dom';

export default function ProjectsTab() {
  const params = useParams();

  const ndaCardData = {
    title: 'NDA',
    subtitle: 'STEP 2',
    link: {
      text: '',
      href: `/project-details/${params?.projectId}/doc/nda`,
    },
  };

  const contractCardData = {
    title: 'Contract',
    subtitle: 'STEP 3',
    link: {
      text: '',
      href: `/project-details/${params?.projectId}/doc/contract`,
    },
  };

  const timelineItems = [
    {
      component: <InvitationCard />,
      color: '#651FFF',
    },
    {
      component: <DocumentCard {...ndaCardData} />,
      color: '#FF9F43',
    },
    {
      component: <DocumentCard {...contractCardData} />,
      color: '#FF9F43',
    },
  ];

  return (
    <div className="py-6 max-w-5xl">
      <SimpleElevatedCard className={Styles.tabContent}>
        <div className={Styles.tabContentHeader}>Project Invitation</div>
        <div className={Styles.tabContentBody}>
          <VerticalTimeline timelineItems={timelineItems} />
        </div>
      </SimpleElevatedCard>
    </div>
  );
}
