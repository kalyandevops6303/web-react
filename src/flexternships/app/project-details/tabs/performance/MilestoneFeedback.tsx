import CollapsableCard from '@/flexternships/app/components/core/cards/CollapsableCard';
import SteppedProgress from '@/flexternships/app/components/core/progress/SteppedProgress';

export default function MilestoneFeedback() {
  const milestoneFeedbackData = [
    {
      user_id: '23762736872',
      role: 'API Developer',
      is_feedback: true,
      score: '33',
      first_name: 'John',
      last_name: 'Doe',
      image_uri: '',
      feedback_id: '329879873',
      feedback_type: 'Self',
      milestone_name: 'Milestone 1',
    },
    {
      user_id: '23712736872',
      role: 'API Developer',
      is_feedback: true,
      score: '50',
      first_name: 'John',
      last_name: 'Doe',
      image_uri: '',
      feedback_id: '329879873',
      feedback_type: 'Self',
      milestone_name: 'Milestone 2',
    },
    {
      user_id: '23762733872',
      role: 'API Developer',
      is_feedback: true,
      score: '77',
      first_name: 'John',
      last_name: 'Doe',
      image_uri: '',
      feedback_id: '329879873',
      feedback_type: 'Self',
      milestone_name: 'Milestone 3',
    },
  ];

  const getScoreLabel = (score: number) => {
    if (score) return 'Good';
  };

  const getHeaderContent = (peerFeedback: any) => {
    const { milestone_name, score } = peerFeedback;

    return (
      <div className="flex items-center justify-between w-full mr-5 h-10">
        <div className="flex items-center gap-2">
          <div className="flex flex-col text-left">
            <div className="text-[14px] leading-[21px] font-[600] font-[Montserrat] text-[#6E6B7B] ml-3">
              {milestone_name}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="text-[#5E5873] text-right font-[600] font-[Montserrat] text-[14px]">
            {getScoreLabel(score)}
          </div>
          <SteppedProgress value={score} />
        </div>
      </div>
    );
  };

  return (
    <div>
      {milestoneFeedbackData?.map((peerFeedback) => (
        <CollapsableCard white className="my-5 bg-white rounded-[10px]" headerContent={getHeaderContent(peerFeedback)}>
          Form
        </CollapsableCard>
      ))}
    </div>
  );
}
