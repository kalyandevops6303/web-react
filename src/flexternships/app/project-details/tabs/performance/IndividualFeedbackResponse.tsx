import SteppedProgress from '@/flexternships/app/components/core/progress/SteppedProgress';
import Spinner from '@/flexternships/app/components/core/Spinner';
import CompetencyTag from '@/flexternships/app/components/core/tags/CompetencyTag';
import VerticalTimeline from '@/flexternships/app/components/core/timelines/VerticalTimeline';
import { Avatar, AvatarFallback, AvatarImage } from '@/flexternships/app/components/ui/avatar';
import { FeedbackTypesAPI } from '@/flexternships/constraints/enums/feedback-enums';
import { useFeedbackStore } from '@/flexternships/stores/feedback-stores';
import { useEffect, useState } from 'react';
import { User } from 'react-feather';

export default function IndividualFeedbackResponse(props: any) {
  const { feedbackOverview, milestoneId, feedbackType } = props;

  const getFeedbackResponse = useFeedbackStore((state) => state.getFeedbackResponse);
  const feedbackResponse = useFeedbackStore((state) => state.feedbackResponse);

  const [response, setResponse] = useState<any>([]);
  const [formattedFeedbackResponse, setFormattedFeedbackResponse] = useState<any>([]);
  const [isFeedbackResponseLoading, setIsFeedbackResponseLoading] = useState<boolean>(true);

  useEffect(() => {
    if (feedbackOverview && feedbackOverview?.feedback_id) {
      getFeedbackResponse(feedbackOverview?.user_id, milestoneId, feedbackType, () => {
        setIsFeedbackResponseLoading(false);
      });
    }
  }, [feedbackOverview, milestoneId, feedbackType]);

  useEffect(() => {
    if (feedbackType === FeedbackTypesAPI.INDIVIDUAL || feedbackType === FeedbackTypesAPI.PEER) {
      if (feedbackResponse && feedbackResponse[feedbackOverview?.user_id]) {
        setResponse(feedbackResponse[feedbackOverview?.user_id]);
      }
    } else {
      if (feedbackResponse && feedbackResponse[milestoneId]) {
        setResponse(feedbackResponse[milestoneId]);
      }
    }
  }, [feedbackResponse]);

  const convertToAnsweredQuestions = (
    input: Record<string, any>,
    feedback: any[], // Feedback array containing name and title
  ) => {
    const answeredQuestions: {
      index: number; // Question's index
      name: string; // Question's name
      answer: {
        value: any; // Main value
        comment: any; // Optional comment
        competency: any; // Optional competency
      };
      title: string; // Title from feedback
      type: string; // Type from feedback
    }[] = [];

    // Group questions and their comments
    const grouped = Object.keys(input).reduce((acc, key) => {
      const [mainKey, subKey] = key.split('-');

      if (!acc[mainKey]) {
        acc[mainKey] = { value: null, comment: null, competency: null };
      }

      if (subKey === 'Comment') {
        acc[mainKey].comment = input[key];
      } else if (subKey === 'competency') {
        acc[mainKey].competency = input[key];
      } else {
        acc[mainKey].value = input[key];
      }

      return acc;
    }, {} as Record<string, { value: any; comment: any; competency: any }>);

    // Map questions with feedback for title
    Object.keys(grouped).forEach((questionKey, index) => {
      const { value, comment, competency } = grouped[questionKey];
      const feedbackItem = feedback.find((item) => item.name === questionKey);
      const title = feedbackItem?.tag?.text || 'Unknown Title'; // Fallback for missing titles

      answeredQuestions.push({
        index,
        name: questionKey,
        answer: { value, comment, competency },
        title,
        type: feedbackItem?.type,
      });
    });

    return answeredQuestions;
  };

  useEffect(() => {
    if (response?.feedback_result) {
      const formattedResponse = convertToAnsweredQuestions(response?.feedback_result, response?.feedback?.elements);
      setFormattedFeedbackResponse(formattedResponse);
    }
  }, [response]);

  const getResponseComponent = (data: any, index: number) => {
    return (
      <div className="max-w-full flex flex-col gap-3">
        <div className="text-sm font-medium leading-5.5 text-grey-600 font-montserrat">
          {index + 1}. {data?.title}
        </div>
        <div>
          {data?.type === 'numberRating' && (
            <div className="mb-5">
              <SteppedProgress value={data?.answer?.value} muted />
            </div>
          )}
          {data?.type === 'areacheckbox' && (
            <div className="mb-5 rounded-md border border-grey-50 bg-white px-3 py-2 min-h-[38px]">
              <ul>
                {data?.answer?.value?.map((item: any) => (
                  <li className="text-sm font-medium leading-5.5 text-grey-heading font-montserrat">&#8226; {item}</li>
                ))}
              </ul>
            </div>
          )}
          {data?.type === 'gridcheckbox' && (
            <div className="rounded-md bg-white min-h-[38px] flex flex-wrap gap-3">
              {data?.answer?.value?.map((item: any) => (
                <span className="w-[200px] text-left text-sm font-semibold leading-5.5 font-montserrat text-grey shadow-[2px_2px_12px_0px_rgba(33,150,243,0.5)] border border-blue px-3 py-1 rounded-lg">
                  <div>
                    <div className="flex gap-1 items-center mt-1">
                      <Avatar className="w-7 h-7">
                        <AvatarImage src={item?.image_uri} className="w-full h-full rounded-full" />
                        <AvatarFallback className="w-full h-full">
                          <User color="#6E6B7B" />
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col">
                        <div className="flex flex-nowrap w-[120px] whitespace-nowrap overflow-hidden text-ellipsis font-montserrat">
                          {item?.first_name} {item?.last_name}
                        </div>
                        <div className="text-xs font-normal leading-5 font-montserrat text-grey font-montserrat">
                          {item?.role_name}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* {JSON.stringify(item)} */}
                </span>
              ))}
            </div>
          )}
          {(data?.type === 'kudosgroup' || data?.type === 'wowgroup') && (
            <div className="flex flex-col gap-y-4">
              {/* Competencies */}
              <div className="flex flex-row flex-wrap gap-2">
                {data?.answer?.competency?.map((competency: { name: string; colorCode: string }, index: number) => (
                  <CompetencyTag key={index} competency={competency} />
                ))}
              </div>

              {/* Comment Box */}
              <div className="mb-5 rounded-md border border-grey-50 bg-white px-3 py-2 min-h-[38px]">
                <div className="text-sm font-medium leading-5.5 text-grey-heading font-montserrat">
                  {data?.answer?.value == 'na' ? 'Not Applicable' : data?.answer?.value}
                </div>
              </div>
            </div>
          )}
          {(data?.type === 'comment' || data?.answer?.comment) && (
            <div className="rounded-md border border-grey-50 bg-white px-3 py-2 min-h-[38px]">
              <div className="text-sm font-medium leading-5.5 text-grey-heading font-montserrat">
                {data?.answer?.comment || data?.answer?.value}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const timelineItems = formattedFeedbackResponse?.map((item: any, index: number) => {
    return {
      component: getResponseComponent(item, index),
    };
  });

  if (isFeedbackResponseLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-48 w-full">
        <div className="h-8 w-8">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 mt-5">
      <VerticalTimeline timelineItems={timelineItems} checked />
    </div>
  );
}
