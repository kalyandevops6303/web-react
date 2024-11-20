import CollapsableCard from '@/flexternships/app/components/core/cards/CollapsableCard';
import SteppedProgress from '@/flexternships/app/components/core/progress/SteppedProgress';
import Spinner from '@/flexternships/app/components/core/Spinner';
import { UserType } from '@/flexternships/constraints/enums/core-enums';
import { FeedbackTypesAPI } from '@/flexternships/constraints/enums/feedback-enums';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { useFeedbackStore } from '@/flexternships/stores/feedback-stores';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import { getScoreLabel } from '@/flexternships/utils/score-utils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IndividualFeedbackResponse from './IndividualFeedbackResponse';

export default function MilestoneFeedback(props: MilestoneFeedbackProps) {
  const { feedbackType } = props;
  const params = useParams();

  const performanceDetails = useProjectsStore((state) => state.performanceDetails);
  const getPerformanceDetails = useProjectsStore((state) => state.getSelfOrTeamPerformanceDetails);
  const isPerformanceDetailsLoading = useProjectsStore((state) => state.isPerformanceDetailsLoading);
  const currentUserType = useFlexternUserStore((state) => state.userDetails?.userType);
  const currentUserId = useFlexternUserStore((state) => state.userDetails?.id);

  const getFeedbackResponse = useFeedbackStore((state) => state.getFeedbackResponse);
  const feedbackResponse = useFeedbackStore((state) => state.feedbackResponse);

  const teamDetails = useProjectsStore((state) => state.teamDetails);
  const populateTeamDetails = useProjectsStore((state) => state.populateTeamDetails);
  
  const [currentOpened, setCurrentOpened] = useState<any>(null);
  const [formattedFeedbackResponse, setFormattedFeedbackResponse] = useState<any>(null);

  const handleAccordionToggle = (peerFeedback: any) => {
    if (peerFeedback._id === currentOpened?._id) setCurrentOpened(null);
    else setCurrentOpened(peerFeedback);
  }

  useEffect(() => {
    getPerformanceDetails(params?.projectId as string, feedbackType);
    populateTeamDetails(params?.projectId);
  }, []);

  useEffect(() => {
    setFormattedFeedbackResponse(
      feedbackResponse?.feedback?.pages?.map((page: any) => {
        return (
          {
            name: page?.name,
            values: page?.elements?.map((element: any) => {
              return (
                {
                  type: element?.type,
                  name: element?.name,
                  value: feedbackResponse?.feedback_result[element?.name] ?? ""
                }
              )
            })
          }
        )
      })
    )
  }, [feedbackResponse])

  useEffect(() => {
    if (currentOpened && teamDetails && currentOpened?.feedback_id) {
      const receiverId = currentUserType === UserType.CLIENT ? teamDetails[0].id : currentUserId
      const feedbackType = currentUserType === UserType.CLIENT ? FeedbackTypesAPI.TEAM : FeedbackTypesAPI.SELF;
      const milestoneId = currentOpened?.milestone_id

      console.log(currentOpened)
      getFeedbackResponse(receiverId, milestoneId, feedbackType)
    }
    console.log(currentOpened)
  }, [currentOpened])

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
              isOpen={peerFeedback?._id === currentOpened?._id}
              onToggle={() => handleAccordionToggle(peerFeedback)}
            >
              <IndividualFeedbackResponse response={formattedFeedbackResponse}/>
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
