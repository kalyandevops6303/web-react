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
import {
  MilestoneFeedbackStatus,
  MilestoneFeedbackErrorType,
} from '@/flexternships/constraints/enums/beta-feedback-enums';
import { MilestoneFeedbackProgress } from '@/flexternships/constraints/types/beta-feedback-types';
import FeedbackItem from './components/FeedbackItem';
import { useMilestoneFeedbackStore } from '@/flexternships/stores/beta-store';
import { fetchTeamDetails } from '@/flexternships/services/project-details';
import { CellProps } from '@/flexternships/constraints/types/beta-feedback-form-types';
import { getFeedbackStatusService } from '@/flexternships/services/beta-service';
import ShowToastMessage from '@/@core/components/toast';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import CustomBreadCrumbs from '../../core/CustomBreadCrumbs';
// import { PanelRightOpen } from 'lucide-react';
// import MilestoneInsights from "./components/milestone-insight/MilestoneInsights";
// import classNames from 'classnames';

// const milestoneFeedbackProgress = {
//   project: {
//     id: '1',
//     name: 'Project 1',
//   },
//   milestone: {
//     id: '1',
//     name: 'Milestone 1',
//   },
//   overallStatus: MilestoneFeedbackStatus.PENDING,
//   feedbacks: [
//     {
//       type: MilestoneFeedbackType.INDIVIDUAL_FEEDBACK,
//       status: MilestoneFeedbackStatus.PENDING,
//     },
//     {
//       type: MilestoneFeedbackType.TEAM_FEEDBACK,
//       status: MilestoneFeedbackStatus.PENDING,
//     },
//   ],
// };

const GiveMilestoneFeedback = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<MilestoneFeedbackErrorType | undefined>();
  const [feedbackProgress, setFeedbackProgress] = useState<MilestoneFeedbackProgress | undefined>();
  const { populateFeedbackSkeletons, isFeedbackSkeletonsLoading } = useMilestoneFeedbackStore();
  // const [showMilestoneInsights, setShowMilestoneInsights] = useState(false);
  const { projectId } = useParams();
  const { milestoneId } = useParams();
  const navigate = useNavigate();
  const [teamDetails, setTeamDetails] = useState<CellProps[]>([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isTeamDetailsLoading, setIsTeamDetailsLoading] = useState(false);
  const [teamId, setTeamId] = useState<string>('');

  useEffect(() => {
    populateFeedbackSkeletons();
  }, [populateFeedbackSkeletons]);

  useEffect(() => {
    const fetchFeedbackStatus = async () => {
      setIsLoading(true);
      if (!projectId) {
        setErrorType(MilestoneFeedbackErrorType.PROJECT_NOT_FOUND);
        setIsLoading(false);
        return;
      }
      if (!milestoneId) {
        setErrorType(MilestoneFeedbackErrorType.MILESTONE_NOT_FOUND);
        setIsLoading(false);
        return;
      }
      try {
        const milestoneFeedbackProgress = await getFeedbackStatusService(milestoneId);
        if (
          milestoneFeedbackProgress &&
          milestoneFeedbackProgress.overallStatus === MilestoneFeedbackStatus.COMPLETED
        ) {
          setErrorType(MilestoneFeedbackErrorType.FEEDBACK_ALREADY_SUBMITTED);
        }
        setFeedbackProgress(milestoneFeedbackProgress);
      } catch (error) {
        ShowToastMessage(ToastType.ERROR, 'Error fetching feedback status');
        if (error instanceof Error && error.message.includes('Milestone not found')) {
          setErrorType(MilestoneFeedbackErrorType.MILESTONE_NOT_FOUND);
        } else if (error instanceof Error && error.message.includes('Project not found')) {
          setErrorType(MilestoneFeedbackErrorType.PROJECT_NOT_FOUND);
        } else {
          setErrorType(MilestoneFeedbackErrorType.SOMETHING_WENT_WRONG);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedbackStatus();
  }, []);

  useEffect(() => {
    if (!projectId) return;
    const fetchTeamMembersDetails = async () => {
      try {
        setIsTeamDetailsLoading(true);
        const teamDetails = await fetchTeamDetails(projectId);
        setTeamMembers(teamDetails);
        const memberList = teamDetails
          .filter((member: any) => member._id !== '')
          .map((member: any) => {
            return {
              value: member.first_name + ' ' + member.last_name,
              identifier: member._id,
            };
          });
        setTeamDetails(memberList);
        setTeamId(teamDetails[0].team_id);
      } catch (error) {
        ShowToastMessage(ToastType.ERROR, 'Error fetching team details');
        if (error instanceof Error && error.message.includes('Project not found')) {
          setErrorType(MilestoneFeedbackErrorType.PROJECT_NOT_FOUND);
        }
      } finally {
        setIsTeamDetailsLoading(false);
      }
    };
    fetchTeamMembersDetails();
  }, [projectId]);

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

  if (isLoading || isFeedbackSkeletonsLoading || isTeamDetailsLoading) return <MilestoneFeedbackStatusLoader />;
  if (errorType) return getErrorComponent();

  // Calculate left content width based on sidebar state
  // const leftContentClass = classNames(
  //   'flex flex-col transition-all duration-300',
  //   showMilestoneInsights ? 'w-[calc(100%-22rem)]' : 'w-full',
  // );

  return (
    <div className="bg-grey-50/10 relative min-h-screen">
      <div>
        <CustomBreadCrumbs
          items={[
            { label: 'Project', href: `/project-details/${projectId}` },
            { label: 'Milestone', href: `/project-details/${projectId}/milestone/${milestoneId}` },
            { label: 'Milestone Feedback' },
          ]}
          startWithHome
        />
      </div>
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
            <FeedbackItem
              milestoneId={milestoneId!}
              teamDetails={teamDetails}
              teamId={teamId}
              teamMembers={teamMembers}
              setErrorType={setErrorType}
            />
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
