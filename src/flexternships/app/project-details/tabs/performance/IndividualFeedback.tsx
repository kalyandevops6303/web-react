import React from 'react';
import CollapsableCard from '@/flexternships/app/components/core/cards/CollapsableCard';
import Spinner from '@/flexternships/app/components/core/Spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/flexternships/app/components/ui/avatar';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import { useEffect } from 'react';
import { User } from 'react-feather';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import IndividualFeedbackResponse from './IndividualFeedbackResponse';
import Rating from '@/flexternships/app/components/core/feedback/Rating';

export default function IndividualFeedback(props: IndividualFeedbackProps) {
  const { milestoneId, feedbackType } = props;

  const performanceDetails = useProjectsStore((state) => state.performanceDetails);
  const getPerformanceDetails = useProjectsStore((state) => state.getPeerOrIndividualPerformanceDetails);
  const isPerformanceDetailsLoading = useProjectsStore((state) => state.isPerformanceDetailsLoading);

  useEffect(() => {
    if (milestoneId) getPerformanceDetails(milestoneId, feedbackType);
  }, [milestoneId]);

  const getHeaderContent = (individualFeedback: any) => {
    const { image_uri, first_name, last_name, role, score } = individualFeedback;

    return (
      <div className="flex items-center justify-between w-full mr-5 h-10">
        <div className="flex items-center gap-2 w-1/3">
          <Avatar>
            <AvatarImage src={image_uri ? image_uri : defaultAvatar} />
            <AvatarFallback>
              <User color="#6E6B7B" />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col text-left">
            <div className="text-[14px] leading-[21px] font-[600] font-[Montserrat] text-[#6E6B7B]">
              {first_name} {last_name}
            </div>
          </div>
        </div>

        <div className="text-[#6E6B7B] font-[Montserrat] text-[14px] font-medium leading-[22px] w-1/3">{role}</div>

        {score != undefined && (
          <div className="flex items-center gap-5 w-1/3">
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
      {performanceDetails?.map((individualFeedback: any, index: number) => (
        <React.Fragment key={index}>
          {individualFeedback?.feedback_id && (
            <CollapsableCard
              white
              className="mb-5 bg-white rounded-[10px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]"
              headerContent={getHeaderContent(individualFeedback)}
              isOpen={index === 0}
            >
              {individualFeedback && (
                <IndividualFeedbackResponse
                  feedbackOverview={individualFeedback}
                  milestoneId={milestoneId}
                  feedbackType={feedbackType}
                />
              )}
            </CollapsableCard>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

type IndividualFeedbackProps = {
  milestoneId: string;
  feedbackType: string; // individual or peer
};
