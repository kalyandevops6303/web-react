import { SurveyModel } from 'survey-react-ui';
import MilestoneFeedbackSurvey from '@/flexternships/app/components/core/surveys/MilestoneFeedbackSurvey';
import { useEffect, useState } from 'react';
import { useFeedbackStore } from '@/flexternships/stores/feedback-stores';
import { useParams } from 'react-router-dom';
import { FeedbackTypesAPI } from '@/flexternships/constraints/enums/feedback-enums';
import Sidebar from '@/flexternships/app/components/core/surveys/Sidebar';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { ToastType, UserType } from '@/flexternships/constraints/enums/core-enums';
import { ArrowLeft } from 'react-feather';
import { keysToCamelCase, showToastMessage } from '@/flexternships/utils/core-utils';
import FunFacts from './FunFacts';
import Spinner from '@/flexternships/app/components/core/Spinner';
import SucessModal from './modals/SucessModal';
import { FormattedTeamMemberInfo } from '@/flexternships/constraints/types/project-details-types';
import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';

export default function IndividualFeedback({ goBack }: { goBack: () => void }) {
  const params = useParams();

  const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);

  const getIndividualFeedbackForm = useFeedbackStore((state) => state.getMilestoneFeedbackForm);
  const individualFeedbackForm = useFeedbackStore((state) => state.feedbackForm);
  const isFeedbackFormLoading = useFeedbackStore((state) => state.isFeedbackFormLoading);

  const submitFeedback = useFeedbackStore((state) => state.submitFeedbackForm);

  const getTeam = useProjectsStore((state) => state.getPeerOrIndividualPerformanceDetails);
  const team = useProjectsStore((state) => state.performanceDetails);

  const getProjectDetails = useProjectsStore((state) => state.getProjectDetails);

  const [formattedTeamInfo, setFormattedTeamInfo] = useState<FormattedTeamMemberInfo[]>([]);
  const [activeTeamMember, setActiveTeamMember] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [filteredTeam, setFilteredTeam] = useState(team);

  useEffect(() => {
    setFilteredTeam(team?.filter((member: any) => member.is_document_signed));
  }, [team]);

  useEffect(() => {
    getIndividualFeedbackForm(params?.projectId, FeedbackTypesAPI.INDIVIDUAL);
    getTeam(params?.milestoneId as string, FeedbackTypesAPI.INDIVIDUAL);
    populateUserDetails();
  }, []);

  useEffect(() => {
    if (filteredTeam) {
      const firstMemberWithoutFeedback = filteredTeam.find((member: any) => member.feedback_id === undefined);
      if (!firstMemberWithoutFeedback) {
        // Navigate if all members have feedback
        goBack();
      } else {
        // Set the active team member to the first one without feedback
        setActiveTeamMember(firstMemberWithoutFeedback);
      }
    }
  }, [filteredTeam, goBack]);

  useEffect(() => {
    if (activeTeamMember) {
      setFormattedTeamInfo(
        filteredTeam?.map((person: any) => {
          return {
            image: person?.image_uri,
            name: `${person?.first_name} ${person?.last_name}`,
            role: person?.role,
            completed: person?.feedback_id ?? false,
            lastMessageTime: '1 min',
            isActive: activeTeamMember?.user_id == person?.user_id,
            userId: person?.user_id,
            isDocumentsSigned: person?.is_document_signed,
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
    showToastMessage(ToastType.SUCCESS, 'Feedback has been submitted successfully');
    getTeam(params?.milestoneId as string, FeedbackTypesAPI.INDIVIDUAL);
    populateUserDetails(true);
    getProjectDetails(params?.projectId as string);
  };

  const handleActiveMemberChange = (userId: any) => {
    const activeMember = filteredTeam?.find((member: any) => member.user_id === userId);
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
    <div className="px-5">
      <PrimaryIconText
        className="mb-5"
        bgDark
        icon={<ArrowLeft className="text-white" size="20px" />}
        text="Individual Feedback"
        onClick={goBack}
      />

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
    </div>
  );
}
