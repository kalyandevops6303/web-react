// React and hooks
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

// UI Components
import PrimaryIconText from '../components/core/buttons/PrimaryIconText';
import TopStatCard from '../components/core/cards/TopStatCard';
import GiveRecognition from '../components/pages/recognition/give-recognition/GiveRecognition';
import ViewRecognitions from '../components/pages/recognition/view-recognitions/ViewRecognitions';

// Icons and assets
import { ArrowLeft, Eye } from 'react-feather';
import wowIcon from '@flexternships/assets/icons/core/wow/wow-blue.svg';
import kudosIcon from '@flexternships/assets/icons/core/kudos/kudos-blue.svg';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { ToastType, UserType } from '@/flexternships/constraints/enums/core-enums';
import { getRecognitionsCount } from '@/flexternships/services/project-management-v2';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { RecognitionStats } from '@/flexternships/constraints/types/recognition-types';
import Spinner from '../components/core/Spinner';
import NoRecognitionFound from '../components/pages/recognition/view-recognitions/NoRecognitionFound';

// Page-specific enums
enum RecognitionAction {
  GIVE_RECOGNITION = 'give-recognition',
  VIEW_RECOGNITIONS = 'view-recognitions',
}

export default function FlexternProjectRecognition() {
  const [selectedAction, setSelectedAction] = useState<RecognitionAction>(RecognitionAction.GIVE_RECOGNITION);
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [stats, setStats] = useState<RecognitionStats | undefined>();

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
    setSelectedAction(RecognitionAction.VIEW_RECOGNITIONS);
  };

  const giveRecognition = () => {
    setSelectedAction(RecognitionAction.GIVE_RECOGNITION);
  };

  const getComponentBySelection = () => {
    switch (selectedAction) {
      case RecognitionAction.GIVE_RECOGNITION:
        return <GiveRecognition refreshStats={fetchStats} />;
      case RecognitionAction.VIEW_RECOGNITIONS:
        // if stats are loaded and there are no recognitions, show no recognition found, otherwise show the actual recognitions
        return !isStatsLoading && stats?.totalRecognitions === 0 ? <NoRecognitionFound /> : <ViewRecognitions />;
      default:
        return null;
    }
  };

  const fetchStats = useCallback(async () => {
    if (!projectId) throw new Error('Project ID is required');
    setIsStatsLoading(true);
    try {
      const stats = await getRecognitionsCount(projectId);
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
    if (!stats) return;
    if (!stats.teamMembers || (location?.state as { viewRecognitions?: boolean })?.viewRecognitions) {
      setSelectedAction(RecognitionAction.VIEW_RECOGNITIONS);
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
              selected={selectedAction === RecognitionAction.GIVE_RECOGNITION}
              onClick={giveRecognition}
              disabled={!stats?.teamMembers}
            />
            <TopStatCard
              title={viewRecognitionTitle}
              value={`${stats?.totalRecognitions} total recognitions`}
              icon={
                <div className="p-3 rounded-full bg-cyan bg-opacity-10 text-cyan">
                  <Eye size={24} />
                </div>
              }
              selected={selectedAction === RecognitionAction.VIEW_RECOGNITIONS}
              onClick={viewRecognitions}
            />
          </div>
          <div>{getComponentBySelection()}</div>
        </>
      )}
    </div>
  );
}
