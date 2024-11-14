import CollapsableCard from '@/flexternships/app/components/core/cards/CollapsableCard';
import SteppedProgress from '@/flexternships/app/components/core/progress/SteppedProgress';
import Spinner from '@/flexternships/app/components/core/Spinner';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import { getScoreLabel } from '@/flexternships/utils/score-utils';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function MilestoneFeedback(props: MilestoneFeedbackProps) {
  const { feedbackType } = props;
  const params = useParams();

  const performanceDetails = useProjectsStore((state) => state.performanceDetails);
  const getPerformanceDetails = useProjectsStore((state) => state.getSelfOrTeamPerformanceDetails);
  const isPerformanceDetailsLoading = useProjectsStore((state) => state.isPerformanceDetailsLoading);

  useEffect(() => {
    getPerformanceDetails(params?.projectId as string, feedbackType);
  }, []);

  const getHeaderContent = (peerFeedback: any) => {
    const { name, score } = peerFeedback;

    return (
      <div className="flex items-center justify-between w-full mr-5 h-10">
        <div className="flex items-center gap-2">
          <div className="flex flex-col text-left">
            <div className="text-[14px] leading-[21px] font-[600] font-[Montserrat] text-[#6E6B7B] ml-3">{name}</div>
          </div>
        </div>

        {score && (
          <div className="flex items-center gap-5">
            <div className="text-[#5E5873] text-right font-[600] font-[Montserrat] text-[14px]">
              {getScoreLabel(score as number)}
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
        <div className="flex flex-col items-center justify-center min-h-48">
          <div className="h-8 w-8">
            <Spinner />
          </div>
        </div>
      ) : (
        <div>
          {performanceDetails?.map((peerFeedback: any) => (
            <CollapsableCard
              white
              className="my-5 bg-white rounded-[10px]"
              headerContent={getHeaderContent(peerFeedback)}
            >
              Form
            </CollapsableCard>
          ))}
        </div>
      )}
    </div>
  );
}

type MilestoneFeedbackProps = {
  feedbackType: string;
};
