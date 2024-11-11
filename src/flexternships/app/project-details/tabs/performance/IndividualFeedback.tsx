import CollapsableCard from '@/flexternships/app/components/core/cards/CollapsableCard';
import SteppedProgress from '@/flexternships/app/components/core/progress/SteppedProgress';
import { Avatar, AvatarFallback, AvatarImage } from '@/flexternships/app/components/ui/avatar';
import { useEffect } from 'react';
import { User } from 'react-feather';

export default function IndividualFeedback(props: IndividualFeedbackProps) {
  const { milestoneId } = props;

  const individualFeedbackData = [
    {
      user_id: '23762736872',
      role: 'API Developer',
      is_feedback: true,
      score: '33',
      first_name: 'John',
      last_name: 'Doe',
      image_uri: '',
      feedback_id: '329879873',
      feedback_type: 'self',
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
      feedback_type: 'self',
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
      feedback_type: 'self',
    },
  ];

  useEffect(() => {
    console.log('milestone: ', milestoneId);
  }, []);

  const getScoreLabel = (score: number) => {
    if (score) return 'Good';
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
      {individualFeedbackData?.map((individualFeedback) => (
        <CollapsableCard
          white
          className="mb-5 bg-white rounded-[10px]"
          headerContent={getHeaderContent(individualFeedback)}
        >
          Form
        </CollapsableCard>
      ))}
    </div>
  );
}

type IndividualFeedbackProps = {
  milestoneId: string;
};
