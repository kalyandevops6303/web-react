import { SurveyModel } from 'survey-react-ui';
import MilestoneFeedbackSurvey from '@/flexternships/app/components/core/surveys/MilestoneFeedbackSurvey';
import { useEffect, useState } from 'react';
import { useFeedbackStore } from '@/flexternships/stores/feedback-stores';
import { useNavigate, useParams } from 'react-router-dom';
import { FeedbackTypesAPI } from '@/flexternships/constraints/enums/feedback-enums';
import Sidebar from '@/flexternships/app/components/core/surveys/Sidebar';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { UserType } from '@/flexternships/constraints/enums/core-enums';
import { ArrowLeft } from 'react-feather';

export default function IndividualFeedback() {
  const params = useParams();
  const navigate = useNavigate();

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
    if (team) {
      const firstMemberWithoutFeedback = team.find(
        (member: { feedback_id: undefined }) => member.feedback_id === undefined,
      );
      setActiveTeamMember(firstMemberWithoutFeedback || team[0]); // Fallback to the first element if none matches
    }
  }, [team]);

  useEffect(() => {
    if (activeTeamMember) {
      setFormattedTeamInfo(
        team?.map((person: any) => {
          return {
            image: person?.image_uri,
            name: `${person?.first_name} ${person?.last_name}`,
            role: person?.role,
            completed: person?.feedback_id ?? false,
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

    submitFeedback(submitFeedbackData, () => {
      getTeam(params?.milestoneId as string, FeedbackTypesAPI.INDIVIDUAL);
    });
  };

  const handleActiveMemberChange = (userId: any) => {
    const activeMember = team?.find((member: any) => member.user_id === userId);
    setActiveTeamMember(activeMember);
  };

  return (
    <>
      <div
        className="flex items-center gap-1 cursor-pointer mb-5"
        onClick={() => navigate(`/project-details/${params?.projectId}/milestone/${params?.milestoneId}`)}
      >
        <div className="p-1 bg-[#0185E4] w-min text-white rounded-full">
          <ArrowLeft size="20px" />
        </div>
        <div className="text-[#0185E4] font-montserrat text-[16px] font-light leading-normal">
          {individualFeedbackForm?.feedback?.title}
        </div>
      </div>
      <div className="flex items-start justify-between gap-2">
        {formattedTeamInfo && <Sidebar data={formattedTeamInfo} onChange={handleActiveMemberChange} />}
        {individualFeedbackForm && (
          <MilestoneFeedbackSurvey surveyJson={individualFeedbackForm?.feedback} onComplete={handleSurveyComplete} />
        )}
      </div>
    </>
  );
}
