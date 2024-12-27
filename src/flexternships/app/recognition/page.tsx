import { useState } from 'react';
import PrimaryIconText from '../components/core/buttons/PrimaryIconText';
import { ArrowLeft, Eye } from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import TopStatCard from '../components/core/cards/TopStatCard';
import wowIcon from '@flexternships/assets/icons/core/wow/wow-blue.svg';
import ViewRecognitions from '../components/pages/recognition/view-recognitions/ViewRecognitions';
import GiveRecognition from '../components/pages/recognition/give-recognition/GiveRecognition';

// Specific to recognition page
enum RecognitionAction {
  GIVE_RECOGNITION = 'give-recognition',
  VIEW_RECOGNITIONS = 'view-recognitions',
}

export default function FlexternProjectRecognition() {
  const [selectedAction, setSelectedAction] = useState<RecognitionAction>(RecognitionAction.VIEW_RECOGNITIONS);

  const navigate = useNavigate();
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
        return <GiveRecognition />;
      case RecognitionAction.VIEW_RECOGNITIONS:
        return <ViewRecognitions />;
      default:
        return null;
    }
  };
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <PrimaryIconText icon={<ArrowLeft className="text-white" size={18} />} text="Back" bgDark onClick={goBack} />
      </div>
      <div className="flex flex-row gap-x-7 mb-2">
        <TopStatCard
          title="Give a WOW!"
          value="12 team members"
          icon={
            <div className="p-3 rounded-full bg-trublue-secondary-500 bg-opacity-10">
              <img src={wowIcon} alt="wow" className="w-6 h-6" />
            </div>
          }
          selected={selectedAction === RecognitionAction.GIVE_RECOGNITION}
          onClick={giveRecognition}
        />
        <TopStatCard
          title="View WOWs!"
          value="Total 40"
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
    </div>
  );
}
