import { Navigate, useNavigate, useParams } from 'react-router-dom';
import SelfFeedback from './SelfFeedback';
import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import TeamFeedback from './TeamFeedback';
import PeerFeedback from './PeerFeedback';
import IndividualFeedback from './IndividualFeedback';

export default function HandleFeedbacks() {
  const { feedbackType, projectId, milestoneId } = useParams();
  const allowedFeedbackTypes = Object.values(MilestoneFeedbackType).map((type) => type.toLowerCase());

  const navigate = useNavigate();

  const goToMilestonePage = () => {
    navigate(`/project-details/${projectId}/milestone/${milestoneId}`);
  };

  const componentsByFeedbackType = {
    self: <SelfFeedback goBack={goToMilestonePage} />,
    manager_to_team: <TeamFeedback goBack={goToMilestonePage} />,
    peer_to_peer: <PeerFeedback goBack={goToMilestonePage} />,
    manager_to_peer: <IndividualFeedback goBack={goToMilestonePage} />,
  };

  if (!feedbackType || !allowedFeedbackTypes.includes(feedbackType)) {
    return <Navigate to="/404" />;
  }

  return <div>{componentsByFeedbackType[feedbackType as keyof typeof componentsByFeedbackType]}</div>;
}
