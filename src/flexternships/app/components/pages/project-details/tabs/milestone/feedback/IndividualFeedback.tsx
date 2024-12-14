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
import { keysToCamelCase } from '@/flexternships/utils/core-utils';
import FunFacts from './FunFacts';
import Spinner from '@/flexternships/app/components/core/Spinner';
import SucessModal from './modals/SucessModal';

export default function IndividualFeedback() {
  const params = useParams();
  const navigate = useNavigate();

  const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);

  const getIndividualFeedbackForm = useFeedbackStore((state) => state.getMilestoneFeedbackForm);
  const individualFeedbackForm = useFeedbackStore((state) => state.feedbackForm);
  const isFeedbackFormLoading = useFeedbackStore((state) => state.isFeedbackFormLoading);

  const submitFeedback = useFeedbackStore((state) => state.submitFeedbackForm);

  const getTeam = useProjectsStore((state) => state.getPeerOrIndividualPerformanceDetails);
  const team = useProjectsStore((state) => state.performanceDetails);
  const [formattedTeamInfo, setFormattedTeamInfo] = useState([]);

  const [activeTeamMember, setActiveTeamMember] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
      if (!firstMemberWithoutFeedback) {
        // Navigate if all members have feedback
        navigate(`/project-details/${params?.projectId}/milestone/${params?.milestoneId}`);
      } else {
        // Set the active team member to the first one without feedback
        setActiveTeamMember(firstMemberWithoutFeedback);
      }
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
            lastMessageTime: '1 min',
            isActive: activeTeamMember?.user_id == person?.user_id,
            userId: person?.user_id,
            isDocumentsSigned: person?.is_documents_signed,
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
      setShowSuccessModal(true);
    });
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    getTeam(params?.milestoneId as string, FeedbackTypesAPI.INDIVIDUAL);
    populateUserDetails();
  };

  const handleActiveMemberChange = (userId: any) => {
    const activeMember = team?.find((member: any) => member.user_id === userId);
    setActiveTeamMember(activeMember);
  };

  if (isFeedbackFormLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-48 w-full">
        <div className="h-8 w-8">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="flex items-center gap-1 cursor-pointer mb-5 pr-0 max-w-[7/12] p-0 flex-nowrap"
        onClick={() => navigate(`/project-details/${params?.projectId}/milestone/${params?.milestoneId}`)}
      >
        <div className="bg-[#0185E4] w-min text-white rounded-full p-1">
          <ArrowLeft size="20px" />
        </div>
        <div className="text-[#0185E4] font-montserrat text-[16px] font-light leading-normal">Individual Feedback</div>
      </div>
      <div className="flex gap-2 items-start">
        <div className="flex items-start justify-center gap-2">
          {formattedTeamInfo && <Sidebar data={formattedTeamInfo} onChange={handleActiveMemberChange} />}
          {individualFeedbackForm && (
            <MilestoneFeedbackSurvey
              surveyJson={individualFeedbackForm?.feedback}
              userDetails={keysToCamelCase(activeTeamMember)}
              onComplete={handleSurveyComplete}
              estimatedTime={1}
            />
          )}
        </div>
        <div className="max-h-screen">
          <FunFacts />
        </div>
      </div>

      {showSuccessModal && <SucessModal isOpen={showSuccessModal} onClose={handleCloseSuccessModal} />}
    </>
  );
}
