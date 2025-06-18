import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import BoxSkeleton from '@/flexternships/app/components/core/skeletons/BoxSkeleton';
import { StatusBadge } from '@/flexternships/app/components/tds/status-badge/StatusBadge';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/flexternships/app/components/ui/select';
// import { TimePeriodOptionLabels, TimePeriodOptions } from '@/flexternships/constraints/enums/analytics-enums';
import { useAnalyticsStore } from '@/flexternships/stores/analytics-store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessageSquare, Video } from 'react-feather';

export default function MessageStats() {
  const { projectId, userId } = useParams();

  const data = useAnalyticsStore((state) => state.conversationParticipationStats);
  const getData = useAnalyticsStore((state) => state.getConversationParticipationStats);
  const isLoading = useAnalyticsStore((state) => state.isConversationParticipationStatsLoading);

  // const [messagesCountState, setMessagesCountState] = useState(TimePeriodOptions.LAST_7_DAYS);
  // const [participationPercentageState, setParticipationPercentageState] = useState(TimePeriodOptions.LAST_7_DAYS);

  useEffect(() => {
    getData(projectId, userId);
  }, [userId, projectId]);

  if (isLoading) return <BoxSkeleton className="w-full h-[100px]" />;

  return (
    <div className="flex gap-5">
      <SimpleElevatedCard className="bg-white px-6 py-6 flex flex-col gap-5 shadow-card justify-evenly w-2/3">
        <div className="flex flex-row gap-5 justify-evenly">
          <div className="flex flex-col items-center gap-1 justify-center">
            <div className="text-grey-900 text-center font-montserrat text-[22px] font-semibold leading-6.5">
              {data?.messagesCount}
            </div>
            <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">Messages</div>
          </div>
          <div className="w-[1px] bg-black border-r border-[#E6E7E7]"></div>
          <div className="flex flex-col items-center gap-1 justify-center">
            <div className="text-grey-900 text-center font-montserrat text-[22px] font-semibold leading-6.5">
              {data?.participationPercentage}%
            </div>
            <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">
              Participation
            </div>
          </div>
          <div className="w-[1px] bg-black border-r border-[#E6E7E7]"></div>
          <div className="flex flex-col items-center gap-1 justify-center">
            <div className="text-grey-900 text-center font-montserrat text-[22px] font-semibold leading-6.5">
              {data?.countOfMessagesPerDay}
            </div>
            <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">Frequency</div>
          </div>
          <div className="w-[1px] bg-black border-r border-[#E6E7E7]"></div>
          <div className="flex flex-col items-center gap-1 justify-center">
            <div className="text-grey-900 text-center font-montserrat text-[22px] font-semibold leading-6.5">
              {Math.round(data?.averageResponseTimeInSeconds)}
            </div>
            <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">
              Average Response Time
            </div>
          </div>
        </div>
        <div className="text-center text-sm font-medium leading-5.5">
          <StatusBadge
            label={
              <div className="flex flex-row gap-1 items-center">
                <MessageSquare size={14} />
                <div className="text-sm font-medium leading-5.5">Messages</div>
              </div>
            }
            type={data?.messagesCountStatus}
            className="bg-[#FF9F43]/10 text-[#FF9F43]"
          />
        </div>
      </SimpleElevatedCard>

      <SimpleElevatedCard className="bg-white px-4 py-4 flex flex-col gap-5 flex-wrap shadow-card justify-evenly w-1/3">
        <div className="flex flex-row gap-5 justify-evenly">
          <div className="flex flex-col items-center gap-1 justify-center">
            <div className="text-grey-900 text-center font-montserrat text-[22px] font-semibold leading-6.5">
              {data?.meetingAttendancePercentage}%
            </div>
            <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">Attendance</div>
          </div>
          <div className="w-[1px] bg-black border-r border-[#E6E7E7]"></div>
          <div className="flex flex-col items-center gap-1 justify-center">
            <div className="text-grey-900 text-center font-montserrat text-[22px] font-semibold leading-6.5">
              {data?.meetingParticipationPercentage}%
            </div>
            <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">
              Participation
            </div>
          </div>
        </div>
        <div className="text-center text-sm font-medium leading-5.5">
          <StatusBadge
            label={
              <div className="flex flex-row gap-1 items-center">
                <Video size={16} />
                <div className="text-sm font-medium leading-5.5">Meetings</div>
              </div>
            }
            type={data?.messagesCountStatus}
            className="bg-[#414DFD]/10 text-[#414DFD]"
          />
        </div>
      </SimpleElevatedCard>
    </div>
  );
}
