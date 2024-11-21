import { SurveyModel } from 'survey-react-ui';
import MilestoneFeedbackSurvey from '@/flexternships/app/components/core/surveys/MilestoneFeedbackSurvey';
import { useEffect, useState } from 'react';
import { useFeedbackStore } from '@/flexternships/stores/feedback-stores';
import { useParams } from 'react-router-dom';
import { FeedbackTypesAPI } from '@/flexternships/constraints/enums/feedback-enums';
import Sidebar from '@/flexternships/app/components/core/surveys/Sidebar';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { UserType } from '@/flexternships/constraints/enums/core-enums';

export { MyQuestion } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/MyQuestion';
export { Kudos } from '@flexternships/app/components/pages/project-details/tabs/milestone/feedback/Kudos';
export { numberRating } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/NumericRating';
export { SmileyRating } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/SmileyRating';

export default function IndividualFeedback() {
  const params = useParams();

  const currentUserDetails = useFlexternUserStore((state) => state.userDetails);
  const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);

  const getIndividualFeedbackForm = useFeedbackStore((state) => state.getMilestoneFeedbackForm);
  const individualFeedbackForm = useFeedbackStore((state) => state.feedbackForm);

  const submitFeedback = useFeedbackStore((state) => state.submitFeedbackForm);

  const getTeam = useProjectsStore((state) => state.getPeerOrIndividualPerformanceDetails);
  const team = useProjectsStore((state) => state.performanceDetails);
  const [formattedTeamInfo, setFormattedTeamInfo] = useState([]);

  const [activeTeamMember, setActiveTeamMember] = useState<any>(null);

  useEffect(() => {
    getIndividualFeedbackForm(params?.projectId, FeedbackTypesAPI.INDIVIDUAL);
    getTeam(params?.milestoneId as string, FeedbackTypesAPI.INDIVIDUAL);
    populateUserDetails();
  }, []);

  useEffect(() => {
    if (team) setActiveTeamMember(team[0]);
  }, [team]);

  useEffect(() => {
    if (activeTeamMember) {
      setFormattedTeamInfo(
        team?.map((person: any) => {
          return {
            image: person?.image_uri,
            name: `${person?.first_name} ${person?.last_name}`,
            role: person?.role,
            completed: person?.is_feedback ?? false,
            lastMessageTime: '3 min',
            isActive: activeTeamMember?.user_id == person?.user_id,
            userId: person?.user_id,
          };
        }),
      );

      if (!activeTeamMember?.is_feedback) getIndividualFeedbackForm(params?.projectId, FeedbackTypesAPI.INDIVIDUAL);
    }
  }, [activeTeamMember]);

  const handleSurveyComplete = (survey: SurveyModel) => {
    const submitFeedbackData: any = {
      feedback_id: individualFeedbackForm?._id,
      milestone_id: params?.milestoneId,
      receiver: {
        user_id: activeTeamMember?.user_id,
        user_type: UserType.TALENT,
      },
      feedback_result: survey.data,
    };

    submitFeedback(submitFeedbackData);
  };

  const handleActiveMemberChange = (userId: any) => {
    const activeMember = team?.find((member: any) => member.user_id === userId);
    setActiveTeamMember(activeMember);
  };

  return (
    <div className="flex items-start justify-between gap-2">
      {formattedTeamInfo && <Sidebar data={formattedTeamInfo} onChange={handleActiveMemberChange} />}
      {individualFeedbackForm && (
        <MilestoneFeedbackSurvey surveyJson={individualFeedbackForm?.feedback} onComplete={handleSurveyComplete} />
      )}
    </div>
  );
}
