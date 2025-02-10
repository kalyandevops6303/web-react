import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';
import { ArrowLeft } from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import MessageStats from './MessageStats';
import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import { Info } from 'react-feather';
import FileStats from './FileStats';
import CustomBreadCrumbs from '@/flexternships/app/components/core/CustomBreadCrumbs';

export default function ConversationParticipationPage() {
  const navigate = useNavigate();
  const { projectId, userId } = useParams();

  return (
    <div className="flex flex-col gap-5 mx-2 md:mx-0 mt-20 md:mt-0">
      <CustomBreadCrumbs
        items={[
          {
            label: 'Analytics',
            href: `/analytics/project/${projectId}/team`,
          },
          {
            label: 'Individual Analytics',
            href: `/analytics/project/${projectId}/individual/${userId}`,
          },
          {
            label: 'Conversation Participation',
            href: `/analytics/project/${projectId}/individual/${userId}/conversation-participation`,
          },
        ]}
      />

      <PrimaryIconText
        icon={<ArrowLeft size={18} className="text-trublue-secondary-500" />}
        text="Analytics"
        className="text-sm font-medium self-start tracking-wide"
        onClick={() => navigate(`/analytics/project/${projectId}/individual/${userId}`)}
      />

      <MessageStats />

      <SimpleElevatedCard className="bg-[#0185E41F] px-4 py-3 flex flex-row items-start flex-wrap md:flex-nowrap gap-1 shadow-card">
        <div className="flex flex-row items-center gap-x-2 text-trublue-secondary-500">
          <Info size={20} />
          <div className="text-base font-semibold leading-6 font-montserrat">Note:</div>
        </div>
        <div className="text-base font-normal leading-6 font-montserrat text-grey-500">
          This represented data is to help you get a better understanding of individual’s participation, this in no way
          is the representation of individual’s performance.{' '}
        </div>
      </SimpleElevatedCard>

      <FileStats />
    </div>
  );
}
