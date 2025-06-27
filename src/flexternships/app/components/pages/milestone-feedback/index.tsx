import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import routes from '@/flexternships/routes';
import { ChevronLeft } from 'react-feather';
import PrimaryIconText from '../../core/buttons/PrimaryIconText';
import FeedbackAlreadySubmitted from './components/FeedbackSubmitted';
import MilestoneNotFound from './components/MilestoneNotFound';
import ProjectNotFound from './components/ProjectNotFound';
import SomethingWentWrong from './components/SomethingWentWrong';
import MilestoneFeedbackStatusLoader from './components/Loader';
import { MilestoneFeedbackStatus } from '@/flexternships/constraints/enums/core-enums';
import { MilestoneFeedbackErrorType } from '@/flexternships/constraints/enums/feedback-enums';
import { MilestoneFeedbackProgress } from '@/flexternships/constraints/types/milestone-insight-types';
import FeedbackItem from './components/FeedbackItem';
// import { PanelRightOpen } from 'lucide-react';
// import MilestoneInsights from "./components/milestone-insight/MilestoneInsights";
// import classNames from 'classnames';

const milestoneFeedbackProgress = {
  project: {
    id: '1',
    name: 'Project 1',
  },
  milestone: {
    id: '1',
    name: 'Milestone 1',
  },
  overallStatus: MilestoneFeedbackStatus.PENDING,
  feedbacks: [
    {
      type: MilestoneFeedbackType.INDIVIDUAL_FEEDBACK,
      status: MilestoneFeedbackStatus.PENDING,
    },
    {
      type: MilestoneFeedbackType.TEAM_FEEDBACK,
      status: MilestoneFeedbackStatus.PENDING,
    },
  ],
};

const GiveMilestoneFeedback = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<MilestoneFeedbackErrorType | undefined>();
  const [feedbackProgress, setFeedbackProgress] = useState<MilestoneFeedbackProgress | undefined>();
  // const [showMilestoneInsights, setShowMilestoneInsights] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // add api call
    if (milestoneFeedbackProgress.overallStatus === MilestoneFeedbackStatus.COMPLETED) {
      setErrorType(MilestoneFeedbackErrorType.FEEDBACK_ALREADY_SUBMITTED);
      setIsLoading(false);
      return;
    }
    setFeedbackProgress(milestoneFeedbackProgress);
    setIsLoading(false);
  }, []);

  const getErrorComponent = () => {
    switch (errorType) {
      case MilestoneFeedbackErrorType.FEEDBACK_ALREADY_SUBMITTED:
        return <FeedbackAlreadySubmitted />;
      case MilestoneFeedbackErrorType.MILESTONE_NOT_FOUND:
        return <MilestoneNotFound />;
      case MilestoneFeedbackErrorType.PROJECT_NOT_FOUND:
        return <ProjectNotFound />;
      default:
        return <SomethingWentWrong />;
    }
  };

  if (isLoading) return <MilestoneFeedbackStatusLoader />;
  if (errorType) return getErrorComponent();

  const { projectId } = useParams();
  const navigate = useNavigate();

  // Calculate left content width based on sidebar state
  // const leftContentClass = classNames(
  //   'flex flex-col transition-all duration-300',
  //   showMilestoneInsights ? 'w-[calc(100%-22rem)]' : 'w-full',
  // );

  return (
    <div className="bg-grey-50/10 relative min-h-screen">
      <div className="flex flex-col gap-12 w-full max-w-screen-2xl mx-auto px-4 pt-12">
        {/* Header */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-grey-heading">{feedbackProgress?.project.name}</h1>
            <p className="text-gray-600">Milestone: {feedbackProgress?.milestone.name}</p>
          </div>
        </header>

        {/* Back Button */}
        <div>
          <PrimaryIconText
            text="Back to Project"
            icon={<ChevronLeft size={16} />}
            onClick={() => navigate(routes.projectDetails.generate(projectId!))}
          />
        </div>

        {/* Main Content Row */}
        <div className="flex flex-row gap-6 relative">
          {/* Left Content Area */}
          <section className="w-full">
            <FeedbackItem />
          </section>

          {/* Open Insights Button */}
          {/* {!showMilestoneInsights && (
            <button
              className="absolute right-0 top-0 bg-white border border-gray-200 rounded-l px-2 py-1 shadow hover:bg-gray-50 transition"
              onClick={() => setShowMilestoneInsights(true)}
              aria-label="Open AI Insights"
            >
              <PanelRightOpen size={20} />
            </button>
          )} */}

          {/* Milestone Insights Sidebar */}
          {/* <MilestoneInsights
            show={showMilestoneInsights}
            onClose={() => setShowMilestoneInsights(false)}
            projectId={projectId!}
            milestoneId={milestoneId!}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default GiveMilestoneFeedback;
