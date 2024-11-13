import CollapsableCard from '@/flexternships/app/components/core/cards/CollapsableCard';
import SteppedProgress from '@/flexternships/app/components/core/progress/SteppedProgress';
import Spinner from '@/flexternships/app/components/core/Spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/flexternships/app/components/ui/avatar';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import { useEffect } from 'react';
import { User } from 'react-feather';

export default function IndividualFeedback(props: IndividualFeedbackProps) {
  const { milestoneId, feedbackType } = props;

  const performanceDetails = useProjectsStore((state) => state.performanceDetails);
  const getPerformanceDetails = useProjectsStore((state) => state.getPeerOrIndividualPerformanceDetails);
  const isPerformanceDetailsLoading = useProjectsStore((state) => state.isPerformanceDetailsLoading);

  useEffect(() => {
    if (milestoneId) getPerformanceDetails(milestoneId, feedbackType);
  }, [milestoneId]);

  const getScoreLabel = (score: number) => {
    if (score >= 0 && score < 1) return 'Poor';
    else if (score >= 1 && score < 2) return 'Below Average';
    else if (score >= 2 && score < 3) return 'Average';
    else if (score >= 3 && score < 4) return 'Above Average';
    else if (score >= 4 && score <= 5) return 'Excellent';
  };

  const getHeaderContent = (individualFeedback: any) => {
    const { image_uri, first_name, last_name, role, score } = individualFeedback;

    return (
      <div className="flex items-center justify-between w-full mr-5 h-10">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={image_uri} />
            <AvatarFallback>
              <User color="#6E6B7B" />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col text-left">
            <div className="text-[14px] leading-[21px] font-[600] font-[Montserrat] text-[#6E6B7B]">
              {first_name} {last_name}
            </div>
            <div className="text-[14px] leading-[21px] font-[400] font-[Montserrat] text-[#6E6B7B]">{role}</div>
          </div>
        </div>

        {score && (
          <div className="flex items-center gap-5">
            <div className="text-[#5E5873] text-right font-[600] font-[Montserrat] text-[14px]">
              {getScoreLabel(score)}
            </div>
            <SteppedProgress value={score} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {isPerformanceDetailsLoading ? (
        <div className="w-5">
          <Spinner />
        </div>
      ) : (
        performanceDetails?.map((individualFeedback: any) => (
          <CollapsableCard
            white
            className="mb-5 bg-white rounded-[10px]"
            headerContent={getHeaderContent(individualFeedback)}
          >
            Form
          </CollapsableCard>
        ))
      )}
    </div>
  );
}

type IndividualFeedbackProps = {
  milestoneId: string;
  feedbackType: string;
};
