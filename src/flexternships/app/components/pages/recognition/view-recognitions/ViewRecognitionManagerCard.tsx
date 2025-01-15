// Core enums and types
import { RecognitionSource } from '@/flexternships/constraints/enums/core-enums';

// UI Components
import CompetencyTag from '../../../core/tags/CompetencyTag';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';

// Utils
import { stringToColour } from '@/flexternships/utils/miscellaneous-utils';
import { Competency } from '@/flexternships/constraints/types/competency-types';
import { getReadableTimeDifference } from '@/flexternships/utils/date-utils';

interface ViewRecognitionManagerCardProps {
  clientInfo: {
    name: string;
    profileImage: string;
    designation: string;
    company: string;
  };
  type: RecognitionSource;
  milestoneNumber: number;
  timestamp: number;
  selectedCompetencies: Competency[];
  comment: string;
}

export default function ViewRecognitionManagerCard({
  clientInfo,
  type,
  milestoneNumber,
  timestamp,
  selectedCompetencies,
  comment,
}: ViewRecognitionManagerCardProps) {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-between gap-x-6 flex-wrap">
          <div className="flex flex-row gap-x-2 items-center">
            <div>
              <Avatar className="size-10">
                <AvatarImage src={clientInfo.profileImage} />
                <AvatarFallback
                  className="p-2 font-semibold text-sm"
                  style={{
                    color: stringToColour(clientInfo.name),
                    backgroundColor: `${stringToColour(clientInfo.name, { opacity: 10 })}`,
                  }}
                >
                  {clientInfo.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="w-[345px]">
              <div className="text-grey-heading text-sm font-medium leading-[23px]">{clientInfo.name}</div>
              <div className="text-grey text-sm font-normal leading-[21px]">{clientInfo.designation}</div>
            </div>
          </div>
          <div className="min-w-[211px]">
            <div className="text-grey-heading text-sm font-medium leading-[23px]">
              Via {type === RecognitionSource.FEEDBACK ? 'Feedback' : 'Quick Actions'}
            </div>
            <div className="text-grey text-sm font-normal leading-[21px]">Type</div>
          </div>
          <div>
            <div className="text-grey-heading text-sm font-medium leading-[23px]">Milestone #{milestoneNumber}</div>
            <div className="text-grey text-sm font-normal leading-[21px]">Milestone</div>
          </div>
        </div>
        <div className="text-grey-muted text-xs font-normal leading-4.5">{getReadableTimeDifference(timestamp)}</div>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="text-grey text-xs font-normal leading-5">Competencies</div>
        <div className="flex flex-row flex-wrap gap-x-2 gap-y-1">
          {selectedCompetencies.map((competency) => (
            <CompetencyTag key={competency.id} competency={competency} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="text-grey text-xs font-normal leading-5">Comment</div>
        <div className="text-sm font-normal leading-5.5 text-grey-700">{comment}</div>
      </div>
    </div>
  );
}
