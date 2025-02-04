import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import BoxSkeleton from '@/flexternships/app/components/core/skeletons/BoxSkeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/flexternships/app/components/ui/select';
import { TimePeriodOptionLabels, TimePeriodOptions } from '@/flexternships/constraints/enums/analytics-enums';
import { useAnalyticsStore } from '@/flexternships/stores/analytics-store';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MessageStats() {
  const { projectId, userId } = useParams();

  const data = useAnalyticsStore((state) => state.conversationParticipation);
  const getData = useAnalyticsStore((state) => state.getConversationParticipation);
  const isLoading = useAnalyticsStore((state) => state.isConversationParticipationLoading);

  const [messagesCountState, setMessagesCountState] = useState(TimePeriodOptions.LAST_7_DAYS);
  const [participationPercentageState, setParticipationPercentageState] = useState(TimePeriodOptions.LAST_7_DAYS);

  useEffect(() => {
    console.log(messagesCountState, participationPercentageState);
    getData(projectId, userId, messagesCountState, participationPercentageState);
  }, [messagesCountState, participationPercentageState, userId, projectId]);

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
        <Select value={messagesCountState} onValueChange={(value) => setMessagesCountState(value as TimePeriodOptions)}>
          <SelectTrigger className="border-none outline-none shadow-none flex items-center justify-center gap-1 focus:ring-0 py-0 h-min">
            <SelectValue>
              <div className="text-[#838889] text-center font-montserrat text-[12px] font-medium leading-[20px] flex items-center gap-1">
                <div>
                  {
                    TimePeriodOptionLabels[
                      Object.keys(TimePeriodOptions).find(
                        (key) => TimePeriodOptions[key as keyof typeof TimePeriodOptions] === messagesCountState,
                      ) as keyof typeof TimePeriodOptionLabels
                    ]
                  }
                </div>
                {/* <ChevronDown size={18} color="#838889" /> */}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white">
            {Object.keys(TimePeriodOptions).map((key) => (
              <SelectItem key={key} value={TimePeriodOptions[key as keyof typeof TimePeriodOptions]}>
                {TimePeriodOptionLabels[key as keyof typeof TimePeriodOptionLabels]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-[1px] bg-black border-r border-[#E6E7E7]"></div>
      <div className="w-[194px] flex flex-col items-center gap-1 justify-center">
        <div className="text-[#071013] text-center font-montserrat text-[22px] font-semibold leading-[26px]">
          {data?.participationPercentage}%
        </div>
        <div className="text-[#6A7071] text-center font-montserrat text-[14px] font-medium leading-[22px]">
          Participation
        </div>
        <Select
          value={participationPercentageState}
          onValueChange={(value) => setParticipationPercentageState(value as TimePeriodOptions)}
        >
          <SelectTrigger className="border-none outline-none shadow-none flex items-center justify-center gap-1 focus:ring-0 py-0 h-min">
            <SelectValue>
              <div className="text-[#838889] text-center font-montserrat text-[12px] font-medium leading-[20px] flex items-center gap-1">
                <div>
                  {
                    TimePeriodOptionLabels[
                      Object.keys(TimePeriodOptions).find(
                        (key) =>
                          TimePeriodOptions[key as keyof typeof TimePeriodOptions] === participationPercentageState,
                      ) as keyof typeof TimePeriodOptionLabels
                    ]
                  }
                </div>
                {/* <ChevronDown size={18} color="#838889" /> */}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white">
            {Object.keys(TimePeriodOptions).map((key) => (
              <SelectItem key={key} value={TimePeriodOptions[key as keyof typeof TimePeriodOptions]}>
                {TimePeriodOptionLabels[key as keyof typeof TimePeriodOptionLabels]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
