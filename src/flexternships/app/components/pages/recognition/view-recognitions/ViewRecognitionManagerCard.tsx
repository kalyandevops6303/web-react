// Core enums and types
import { Competency } from '@/flexternships/constraints/enums/miscellaneous-enums';
import { RecognitionSource } from '@/flexternships/constraints/enums/core-enums';

// UI Components
import CompetencyTag from '../../../core/tags/CompetencyTag';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';

// Utils
import { stringToColour } from '@/flexternships/utils/miscellaneous-utils';

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
  selectedCompetencies: { name: Competency; id: string }[];
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
  const getTimeDifference = (timestamp: number) => {
    const now = new Date().getTime();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} Days ago`;
  };

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
        <div className="text-grey-muted text-xs font-normal leading-4.5">{getTimeDifference(timestamp)}</div>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="text-grey text-xs font-normal leading-5">Competencies</div>
        <div className="flex flex-row flex-wrap gap-x-2 gap-y-1">
          {selectedCompetencies.map(({ name }) => (
            <CompetencyTag key={name} competency={name} />
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
