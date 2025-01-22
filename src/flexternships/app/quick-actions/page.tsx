// External dependencies
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Eye, MessageSquare } from 'react-feather';

// Components
import PrimaryIconText from '../components/core/buttons/PrimaryIconText';
import TopStatCard from '../components/core/cards/TopStatCard';
import GiveComments from '../components/pages/quick-actions/give-comments/GiveComments';
import ViewComments from '../components/pages/quick-actions/view-comments/ViewComments';
import NoCommentsFound from '../components/pages/quick-actions/view-comments/NoCommentsFound';
import Spinner from '../components/core/Spinner';

// Services and Stores
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { getQuickActionsCount } from '@/flexternships/services/project-management-v2';

// Types and Enums
import { ToastType, UserType } from '@/flexternships/constraints/enums/core-enums';
import { QuickActionsStats } from '@/flexternships/constraints/types/quick-actions-types';
import { QuickActionCategory } from '@/flexternships/constraints/enums/quick-actions-enums';

// Utils
import { showToastMessage } from '@/flexternships/utils/core-utils';

// Assets
import wowIcon from '@flexternships/assets/icons/core/wow/wow-blue.svg';
import kudosIcon from '@flexternships/assets/icons/core/kudos/kudos-blue.svg';

// Page-specific enums
enum QuickAction {
  GIVE_RECOGNITION = 'give-recognition',
  VIEW_RECOGNITIONS = 'view-recognitions',
  ADD_NOTES = 'add-notes',
  VIEW_NOTES = 'view-notes',
}

export default function FlexternProjectQuickActions() {
  const [selectedAction, setSelectedAction] = useState<QuickAction>(QuickAction.GIVE_RECOGNITION);
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [stats, setStats] = useState<QuickActionsStats | undefined>();

  const userDetails = useFlexternUserStore((state) => state.userDetails);

  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams();

  /**
   * Handles navigation when user clicks back
   * If there is browser history, goes back one page
   * Otherwise redirects to dashboard as fallback
   */
  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1); // Go back one page in history
    } else {
      navigate(`/project-details/${projectId}`); // Fallback to dashboard if no history
    }
  };

  const viewRecognitions = () => {
    setSelectedAction(QuickAction.VIEW_RECOGNITIONS);
  };

  const giveRecognition = () => {
    setSelectedAction(QuickAction.GIVE_RECOGNITION);
  };

  const addNotes = () => {
    setSelectedAction(QuickAction.ADD_NOTES);
  };

  const viewNotes = () => {
    setSelectedAction(QuickAction.VIEW_NOTES);
  };

  const getComponentBySelection = () => {
    const quickActionCategory = [QuickAction.ADD_NOTES, QuickAction.VIEW_NOTES].includes(selectedAction)
      ? QuickActionCategory.NOTE
      : QuickActionCategory.RECOGNITION;
    switch (selectedAction) {
      case QuickAction.GIVE_RECOGNITION:
      case QuickAction.ADD_NOTES:
        return <GiveComments refreshStats={fetchStats} category={quickActionCategory} />;
      case QuickAction.VIEW_RECOGNITIONS:
      case QuickAction.VIEW_NOTES:
        // if stats are loaded and there are no recognitions, show no recognition found, otherwise show the actual recognitions
        return !isStatsLoading && stats?.totalRecognitions === 0 ? (
          <NoCommentsFound category={quickActionCategory} />
        ) : (
          <ViewComments category={quickActionCategory} />
        );
      default:
        return null;
    }
  };

  const fetchStats = useCallback(async () => {
    if (!projectId) throw new Error('Project ID is required');
    setIsStatsLoading(true);
    try {
      const stats = await getQuickActionsCount(projectId);
      setStats(stats);
      setIsStatsLoading(false);
    } catch (error: unknown) {
      showToastMessage(
        ToastType.ERROR,
        error instanceof Error ? error.message : 'An error occurred while fetching recognition stats',
      );
    }
  }, [projectId]);

  useEffect(() => {
    fetchStats();
  }, [projectId, fetchStats]);

  useEffect(() => {
    // TODO: Update this to include all other cases
    if (!stats) return;
    if (!stats.teamMembers || (location?.state as { viewRecognitions?: boolean })?.viewRecognitions) {
      setSelectedAction(QuickAction.VIEW_RECOGNITIONS);
    }
  }, [stats, location.state]);

  const recognitionIcon = userDetails.userType === UserType.TALENT ? kudosIcon : wowIcon;
  const giveRecognitionTitle = userDetails.userType === UserType.TALENT ? 'Give Kudos' : 'Give a WOW!';
  const viewRecognitionTitle = userDetails.userType === UserType.TALENT ? 'View Kudos' : 'View WOWs!';

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <PrimaryIconText icon={<ArrowLeft className="text-white" size={18} />} text="Back" bgDark onClick={goBack} />
      </div>
      {isStatsLoading ? (
        <div className="h-full min-h-40 flex flex-col items-center justify-center">
          <div className="size-10">
            <Spinner />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-row gap-x-7 mb-2">
            <TopStatCard
              title={giveRecognitionTitle}
              value={`${stats?.teamMembers} team members`}
              icon={
                <div className="p-3 rounded-full bg-trublue-secondary-500 bg-opacity-10">
                  <img src={recognitionIcon} alt={giveRecognitionTitle} className="w-6 h-6" />
                </div>
              }
              selected={selectedAction === QuickAction.GIVE_RECOGNITION}
              onClick={giveRecognition}
              disabled={!stats?.teamMembers}
            />
            <TopStatCard
              title={viewRecognitionTitle}
              value={`${stats?.totalRecognitions} total recognitions`}
              icon={
                <div className="p-3 rounded-full bg-trublue-secondary-500 bg-opacity-10 text-trublue-secondary-500">
                  <Eye size={24} />
                </div>
              }
              selected={selectedAction === QuickAction.VIEW_RECOGNITIONS}
              onClick={viewRecognitions}
            />
            {userDetails.userType === UserType.CLIENT && (
              <>
                <TopStatCard
                  title="Add Notes"
                  value={`${stats?.teamMembers} team members`}
                  icon={
                    <div className="p-3 rounded-full bg-purple-light text-purple">
                      <MessageSquare size={24} />
                    </div>
                  }
                  selected={selectedAction === QuickAction.ADD_NOTES}
                  onClick={addNotes}
                  disabled={!stats?.teamMembers}
                />
                <TopStatCard
                  title="View Notes"
                  value={`Total ${stats?.totalNotes}`}
                  icon={
                    <div className="p-3 rounded-full bg-purple-light text-purple">
                      <Eye size={24} />
                    </div>
                  }
                  selected={selectedAction === QuickAction.VIEW_NOTES}
                  onClick={viewNotes}
                />
              </>
            )}
          </div>
          <div>{getComponentBySelection()}</div>
        </>
      )}
    </div>
  );
}
