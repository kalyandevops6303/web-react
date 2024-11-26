import { SurveyModel } from 'survey-react-ui';
import MilestoneFeedbackSurvey from '@/flexternships/app/components/core/surveys/MilestoneFeedbackSurvey';
import { useEffect } from 'react';
import { useFeedbackStore } from '@/flexternships/stores/feedback-stores';
import { useNavigate, useParams } from 'react-router-dom';
import { FeedbackTypesAPI } from '@/flexternships/constraints/enums/feedback-enums';
import { UserType } from '@/flexternships/constraints/enums/core-enums';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import { ArrowLeft } from 'react-feather';
import { mockTeamFeedbackSurveyJson } from '@/flexternships/mocks/survey-data';

export { MyQuestion } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/MyQuestion';
export { Kudos } from '@flexternships/app/components/pages/project-details/tabs/milestone/feedback/KudosRecognition';
export { numberRating } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/NumericRating';
export { SmileyRating } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/SmileyRating';
export { AreaCheckbox } from '@/flexternships/app/components/pages/project-details/tabs/milestone/feedback/AreaCheckBox';
export { Wow } from '@flexternships/app/components/pages/project-details/tabs/milestone/feedback/WowRecognition';

export default function TeamFeedback() {
  const params = useParams();
  const navigate = useNavigate();

  const populateTeamDetails = useProjectsStore((state) => state.populateTeamDetails);
  const teamDetails = useProjectsStore((state) => state.teamDetails);

  const getTeamFeedbackForm = useFeedbackStore((state) => state.getMilestoneFeedbackForm);
  const teamFeedbackForm = useFeedbackStore((state) => state.feedbackForm);

  const submitFeedback = useFeedbackStore((state) => state.submitFeedbackForm);

  useEffect(() => {
    getTeamFeedbackForm(params?.projectId, FeedbackTypesAPI.TEAM);
    populateTeamDetails(params?.projectId);
  }, []);

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

    submitFeedback(submitFeedbackData);
  };

  return (
    <div>
      {/* <div className="flex flex-row items-start"> */}
      {/* <Sidebar data={persons} /> */}
      {/* <TimelineStepper data={mockSelfFeedbackSurveyJson} /> */}
      {/* </div> */}
      <div
        className="flex items-center gap-1 cursor-pointer mb-5"
        onClick={() => navigate(`/project-details/${params?.projectId}/milestone/${params?.milestoneId}`)}
      >
        <div className="p-1 bg-[#0185E4] w-min text-white rounded-full">
          <ArrowLeft size="20px" />
        </div>
        <div className="text-[#0185E4] font-montserrat text-[16px] font-light leading-normal">
          {teamFeedbackForm?.feedback?.title}
        </div>
      </div>
      {teamFeedbackForm && (
        <MilestoneFeedbackSurvey surveyJson={mockTeamFeedbackSurveyJson} onComplete={handleSurveyComplete} />
      )}
    </div>
  );
}
