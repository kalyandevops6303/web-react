import { SurveyModel } from 'survey-react-ui';
import MilestoneFeedbackSurvey from '@/flexternships/app/components/core/surveys/MilestoneFeedbackSurvey';
import { useEffect, useState } from 'react';
import { useFeedbackStore } from '@/flexternships/stores/feedback-stores';
import { useParams } from 'react-router-dom';
import { FeedbackTypesAPI } from '@/flexternships/constraints/enums/feedback-enums';
import { ToastType, UserType } from '@/flexternships/constraints/enums/core-enums';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import { ArrowLeft } from 'react-feather';
import FunFacts from './FunFacts';
import Spinner from '@/flexternships/app/components/core/Spinner';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { useProjectMilestonesStore } from '@/flexternships/stores/project-milestones-store';
import SucessModal from './modals/SucessModal';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';

export { MyQuestion } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/MyQuestion';
export { Kudos } from '@flexternships/app/components/pages/project-details/tabs/milestone/feedback/KudosRecognition';
export { numberRating } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/NumericRating';
export { SmileyRating } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/SmileyRating';
export { AreaCheckbox } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/AreaCheckBox';
export { GridCheckbox } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/GridCheckBox';
export { Wow } from '@flexternships/app/components/pages/project-details/tabs/milestone/feedback/WowRecognition';

export default function TeamFeedback({ goBack }: { goBack: () => void }) {
  const params = useParams();

  const populateTeamDetails = useProjectsStore((state) => state.populateTeamDetails);
  const teamDetails = useProjectsStore((state) => state.teamDetails);

  const getProjectDetails = useProjectsStore((state) => state.getProjectDetails);
  const projectDetails = useProjectsStore((state) => state.projectDetails);
  const isFeedbackFormLoading = useFeedbackStore((state) => state.isFeedbackFormLoading);
  const milestones = useProjectMilestonesStore((state) => state.projectMilestones);

  const getTeamFeedbackForm = useFeedbackStore((state) => state.getMilestoneFeedbackForm);
  const teamFeedbackForm = useFeedbackStore((state) => state.feedbackForm);
  const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);

  const submitFeedback = useFeedbackStore((state) => state.submitFeedbackForm);
  const getMilestones = useProjectMilestonesStore((state) => state.populateProjectMilestones);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (!params?.projectId) throw new Error('Project ID is required to fetch team feedback form');
    getTeamFeedbackForm(params?.projectId, FeedbackTypesAPI.TEAM);
    populateTeamDetails(params?.projectId);
    getProjectDetails(params?.projectId);
    getMilestones(params?.projectId);
  }, [params?.projectId, getTeamFeedbackForm, populateTeamDetails, getProjectDetails, getMilestones]);

  const handleSurveyComplete = (survey: SurveyModel) => {
    const submitFeedbackData: any = {
      feedback_id: teamFeedbackForm?._id,
      milestone_id: params?.milestoneId,
      receiver: {
        user_type: UserType.TALENT,
        team_id: teamDetails && teamDetails[0].id,
      },
      feedback_result: survey.data,
    };

    submitFeedback(submitFeedbackData, () => {
      setShowSuccessModal(true);
    });
  };

  const handleCloseSuccessModal = () => {
    if (!params?.projectId) throw new Error('Project ID is required to submit feedback');
    populateUserDetails(true);
    getProjectDetails(params?.projectId);
    setShowSuccessModal(false);
    goBack();
    showToastMessage(ToastType.SUCCESS, 'Feedback has been submitted successfully');
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
        text="Team Feedback"
        onClick={goBack}
      />

      <div className="flex gap-3">
        <div>
          {teamFeedbackForm && (
            <MilestoneFeedbackSurvey
              surveyJson={teamFeedbackForm?.feedback}
              onComplete={handleSurveyComplete}
              estimatedTime={1}
              projectName={projectDetails?.details?.name}
              milestoneNumber={milestones.findIndex((milestone) => milestone.id === params?.milestoneId) + 1}
            />
          )}
        </div>
        <FunFacts />
      </div>

      {showSuccessModal && <SucessModal isOpen={showSuccessModal} onClose={handleCloseSuccessModal} />}
    </div>
  );
}
