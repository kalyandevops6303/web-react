import CollapsableCard from '@/flexternships/app/components/core/cards/CollapsableCard';
import SteppedProgress from '@/flexternships/app/components/core/progress/SteppedProgress';
import Spinner from '@/flexternships/app/components/core/Spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/flexternships/app/components/ui/avatar';
import { UserType } from '@/flexternships/constraints/enums/core-enums';
import { FeedbackTypesAPI } from '@/flexternships/constraints/enums/feedback-enums';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { useFeedbackStore } from '@/flexternships/stores/feedback-stores';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import { getScoreLabel } from '@/flexternships/utils/score-utils';
import { useEffect, useState } from 'react';
import { User } from 'react-feather';
import IndividualFeedbackResponse from './IndividualFeedbackResponse';

export default function IndividualFeedback(props: IndividualFeedbackProps) {
  const { milestoneId, feedbackType } = props;

  const currentUserType = useFlexternUserStore((state) => state.userDetails?.userType);

  const performanceDetails = useProjectsStore((state) => state.performanceDetails);
  const getPerformanceDetails = useProjectsStore((state) => state.getPeerOrIndividualPerformanceDetails);
  const isPerformanceDetailsLoading = useProjectsStore((state) => state.isPerformanceDetailsLoading);

  const getFeedbackResponse = useFeedbackStore((state) => state.getFeedbackResponse);
  const feedbackResponse = useFeedbackStore((state) => state.feedbackResponse);

  const [currentOpened, setCurrentOpened] = useState<any>(null);
  const [formattedFeedbackResponse, setFormattedFeedbackResponse] = useState<any>(null);

  const handleAccordionToggle = (individualFeedback: any) => {
    if (individualFeedback.user_id === currentOpened?.user_id) setCurrentOpened(null);
    else setCurrentOpened(individualFeedback);
  };

  useEffect(() => {
    if (milestoneId) getPerformanceDetails(milestoneId, feedbackType);
  }, [milestoneId]);

  useEffect(() => {
    if (currentOpened && currentOpened?.feedback_id) {
      const receiverId = currentOpened?.user_id;
      const feedbackType = currentUserType === UserType.CLIENT ? FeedbackTypesAPI.INDIVIDUAL : FeedbackTypesAPI.PEER;

      getFeedbackResponse(receiverId, milestoneId, feedbackType);
    }
  }, [currentOpened]);

  useEffect(() => {
    setFormattedFeedbackResponse(
      feedbackResponse?.feedback?.pages?.map((page: any) => {
        return {
          name: page?.name,
          values: page?.elements?.map((element: any) => {
            return {
              type: element?.type,
              name: element?.name,
              value: feedbackResponse?.feedback_result[element?.name] ?? '',
            };
          }),
        };
      }),
    );
  }, [feedbackResponse]);

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

        {score != undefined && (
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
        <div className="flex flex-col items-center justify-center min-h-48">
          <div className="h-8 w-8">
            <Spinner />
          </div>
        </div>
      ) : (
        performanceDetails?.map((individualFeedback: any) => (
          <>
            {individualFeedback?.feedback_id && (
              <CollapsableCard
                white
                className="mb-5 bg-white rounded-[10px]"
                headerContent={getHeaderContent(individualFeedback)}
                isOpen={individualFeedback?.user_id === currentOpened?.user_id}
                onToggle={() => handleAccordionToggle(individualFeedback)}
              >
                <IndividualFeedbackResponse response={formattedFeedbackResponse} />
              </CollapsableCard>
            )}
          </>
        ))
      )}
    </div>
  );
}

type IndividualFeedbackProps = {
  milestoneId: string;
  feedbackType: string;
};
