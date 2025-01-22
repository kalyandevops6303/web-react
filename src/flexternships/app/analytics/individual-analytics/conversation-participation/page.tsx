import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';
import BreadCrumbs from '@/flexternships/app/components/pages/project-details/BreadCrumbs';
import { ArrowLeft } from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import MessageStats from './MessageStats';
import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import { Info } from 'react-feather';
import FileStats from './FileStats';

export default function ConversationParticipationPage() {
  const navigate = useNavigate();
  const { projectId, userId } = useParams();

  return (
    <div className="flex flex-col gap-5 mx-2 md:mx-0 mt-20 md:mt-0">
      <BreadCrumbs
        steps={[
          {
            title: 'Analytics',
            link: `/analytics/project/${projectId}/individual/${userId}`,
          },
          {
            title: '...',
            link: `/analytics/project/${projectId}/individual/${userId}`,
          },
          {
            title: 'Conversation Participation',
            link: `/analytics/project/${projectId}/individual/${userId}/conversation-participation`,
            isActive: true,
          },
        ]}
      />

      <PrimaryIconText
        icon={<ArrowLeft size={16} color="#00B0FF" />}
        text="Analytics"
        className="text-sm font-medium leading-[150%] font-montserrat text-[#394042] w-fit"
        onClick={() => navigate(`/analytics/project/${projectId}/individual/${userId}`)}
      />

      <MessageStats />

      <SimpleElevatedCard className="bg-[#0185E41F] p-3 flex flex-col md:flex-row items-start md:items-center gap-1 shadow-card">
        <Info size={16} color="#0185E4" />
        <div className="text-sm font-medium leading-[150%] font-montserrat text-[#0185E4]">Note:</div>
        <div className="text-sm font-normal leading-[150%] font-montserrat text-[#0185E4] md:ml-2">
          This represented data is to help you get a better understanding of individual’s participation, this in no way
          is the representation of individual’s performance.{' '}
        </div>
      </SimpleElevatedCard>

      <FileStats />
    </div>
  );
}
