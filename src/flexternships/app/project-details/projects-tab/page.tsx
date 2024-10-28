"use client"
import Styles from '@flexternships/styles/pages/project-details/projects-tab/tab-content.module.css';
import SimpleElevatedCard from "../../components/core/cards/SimpleElevatedCard"
import VerticalTimeline from '../../components/core/timelines/VerticalTimeline';
import InvitationCard from './InvitationCard';
import DocumentCard from './DocumentCard';

export default function ProjectsTab() {

    const ndaCardData = {
        title: 'NDA',
        subtitle: 'STEP 2',
        link: {
            text: '',
            href: '/nda'
        }
    }

    const contractCardData = {
        title: 'Contract',
        subtitle: 'STEP 3'
    }


    const timelineItems = [
        {
            component: <InvitationCard />,
            color: '#651FFF'
        },
        {
            component: <DocumentCard {...ndaCardData} />,
            color: '#FF9F43'
        },
        {
            component: <DocumentCard {...contractCardData} />,
            color: '#FF9F43'
        },
    ]

    return (
        <div className="flexternships-page py-6">
            <SimpleElevatedCard className={Styles.tabContent}>
                <div className={Styles.tabContentHeader}>
                    Project Invitation
                </div>
                <div className={Styles.tabContentBody}>
                    <VerticalTimeline
                        timelineItems={timelineItems}
                    />
                </div>
            </SimpleElevatedCard>
        </div>
    )
}