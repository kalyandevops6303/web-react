import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import BoxSkeleton from '@/flexternships/app/components/core/skeletons/BoxSkeleton';
import { useAnalyticsStore } from '@/flexternships/stores/analytics-store';
import { useEffect } from 'react';
import { ChevronDown } from 'react-feather';
import { useParams } from 'react-router-dom';

export default function MessageStats() {
  const { projectId } = useParams();

  const data = useAnalyticsStore((state) => state.conversationParticipation);
  const getData = useAnalyticsStore((state) => state.getConversationParticipation);
  const isLoading = useAnalyticsStore((state) => state.isConversationParticipationLoading);

  useEffect(() => {
    getData(projectId);
  }, [projectId]);

  if (isLoading) return <BoxSkeleton className="w-full h-[100px]" />;

  return (
    <SimpleElevatedCard className="bg-white p-3 flex gap-5 w-fit flex-wrap shadow-card">
      <div className="w-[194px] flex flex-col items-center gap-1 justify-center">
        <div className="text-[#071013] text-center font-montserrat text-[22px] font-semibold leading-[26px]">
          {data?.messagesCount}
        </div>
        <div className="text-[#6A7071] text-center font-montserrat text-[14px] font-medium leading-[22px]">
          Messages
        </div>
        <div className="text-[#838889] text-center font-montserrat text-[12px] font-medium leading-[20px] flex items-center gap-1">
          <div>In the last 7 days</div>
          <ChevronDown size={18} color="#838889" />
        </div>
      </div>
      <div className="w-[1px] bg-black border-r border-[#E6E7E7]"></div>
      <div className="w-[194px] flex flex-col items-center gap-1 justify-center">
        <div className="text-[#071013] text-center font-montserrat text-[22px] font-semibold leading-[26px]">
          {data?.participationPercentage}%
        </div>
        <div className="text-[#6A7071] text-center font-montserrat text-[14px] font-medium leading-[22px]">
          Participation
        </div>
        <div className="text-[#838889] text-center font-montserrat text-[12px] font-medium leading-[20px] flex items-center gap-1">
          <div>In the last 7 days</div>
          <ChevronDown size={18} color="#838889" />
        </div>
      </div>
      <div className="w-[1px] bg-black border-r border-[#E6E7E7]"></div>
      <div className="w-[194px] flex flex-col items-center gap-1 justify-center">
        <div className="text-[#071013] text-center font-montserrat text-[22px] font-semibold leading-[26px]">
          {data?.frequencyOfMessagesMinutes} mins
        </div>
        <div className="text-[#6A7071] text-center font-montserrat text-[14px] font-medium leading-[22px]">
          Frequency of Messages
        </div>
      </div>
      <div className="w-[1px] bg-black border-r border-[#E6E7E7]"></div>
      <div className="w-[194px] flex flex-col items-center gap-1 justify-center">
        <div className="text-[#071013] text-center font-montserrat text-[22px] font-semibold leading-[26px]">
          {data?.averageResponseTimeMinutes} mins
        </div>
        <div className="text-[#6A7071] text-center font-montserrat text-[14px] font-medium leading-[22px]">
          Average Response Time
        </div>
      </div>
    </SimpleElevatedCard>
  );
}
