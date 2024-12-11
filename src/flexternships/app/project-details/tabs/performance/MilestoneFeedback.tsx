import CollapsableCard from '@/flexternships/app/components/core/cards/CollapsableCard';
import Spinner from '@/flexternships/app/components/core/Spinner';
import { UserType } from '@/flexternships/constraints/enums/core-enums';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IndividualFeedbackResponse from './IndividualFeedbackResponse';
import Rating from '@/flexternships/app/components/core/feedback/Rating';

export default function MilestoneFeedback(props: MilestoneFeedbackProps) {
  const { feedbackType, milestoneId } = props;
  const params = useParams();

  const performanceDetails = useProjectsStore((state) => state.performanceDetails);
  const getPerformanceDetails = useProjectsStore((state) => state.getSelfOrTeamPerformanceDetails);
  const isPerformanceDetailsLoading = useProjectsStore((state) => state.isPerformanceDetailsLoading);
  const currentUserType = useFlexternUserStore((state) => state.userDetails?.userType);
  const currentUserId = useFlexternUserStore((state) => state.userDetails?.id);

  const teamDetails = useProjectsStore((state) => state.teamDetails);
  const populateTeamDetails = useProjectsStore((state) => state.populateTeamDetails);

  const [filteredPerformanceDetails, setFilteredPerformanceDetails] = useState<any>([]);

  useEffect(() => {
    getPerformanceDetails(params?.projectId as string, feedbackType);
    populateTeamDetails(params?.projectId);
  }, []);

  useEffect(() => {
    const receiverId = currentUserType === UserType.CLIENT ? teamDetails[0]?.id : currentUserId;

    if (milestoneId && performanceDetails) {
      setFilteredPerformanceDetails(
        performanceDetails
          ?.map((feedback: any, index: number) => {
            return {
              ...feedback,
              index,
              user_id: receiverId,
            };
          })
          .filter((feedback: any) => feedback?.milestone_id === milestoneId),
      );
    } else if (performanceDetails) {
      setFilteredPerformanceDetails(
        performanceDetails?.map((feedback: any, index: number) => {
          return {
            ...feedback,
            index,
            user_id: receiverId,
          };
        }),
      );
    }
  }, [performanceDetails, milestoneId, teamDetails]);

  const getHeaderContent = (peerFeedback: any) => {
    const { score } = peerFeedback;

    return (
      <div className="flex items-center justify-between w-full mr-5 h-10">
        <div className="flex items-center gap-2">
          <div className="flex flex-col text-left">
            <div className="text-[14px] leading-[21px] font-[600] font-[Montserrat] text-[#6E6B7B] ml-3">
              Milestone #{peerFeedback?.index + 1}
            </div>
          </div>
        </div>

        {score != undefined && (
          <div className="flex items-center gap-5">
            <div className="text-[#5E5873] text-right font-[600] font-[Montserrat] text-[14px]"></div>
            <Rating rating={score} ratingText={''} ratingColor={'#0185E4'} showTotalScore={true} />
          </div>
        )}
      </div>
    );
  };

  if (isPerformanceDetailsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-48 w-full">
        <div className="h-8 w-8">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div>
      {filteredPerformanceDetails?.map((peerFeedback: any) => (
        <div>
          {peerFeedback?.feedback_id && (
            <CollapsableCard
              white
              className="my-5 bg-white rounded-[10px]"
              headerContent={getHeaderContent(peerFeedback)}
            >
              <IndividualFeedbackResponse
                feedbackOverview={peerFeedback}
                milestoneId={peerFeedback?.milestone_id}
                feedbackType={feedbackType}
              />
            </CollapsableCard>
          )}
        </div>
      ))}
    </div>
  );
}

type MilestoneFeedbackProps = {
  feedbackType: string;
  milestoneId?: string;
};
