import { Navigate, useParams } from 'react-router-dom';
import SelfFeedback from './SelfFeedback';
import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import TeamFeedback from './TeamFeedback';
import PeerFeedback from './PeerFeedback';
import IndividualFeedback from './IndividualFeedback';
import FunFacts from './FunFacts';

export default function HandleFeedbacks() {
  const componentsByFeedbackType = {
    self: <SelfFeedback />,
    manager_to_team: <TeamFeedback />,
    peer_to_peer: <PeerFeedback />,
    manager_to_peer: <IndividualFeedback />,
  };

  const { feedbackType } = useParams();
  const allowedFeedbackTypes = Object.values(MilestoneFeedbackType).map((type) => type.toLowerCase());

  if (!feedbackType || !allowedFeedbackTypes.includes(feedbackType)) {
    return <Navigate to="/404" />;
  }

    return <div>{componentsByFeedbackType[feedbackType as keyof typeof componentsByFeedbackType]}</div>;


  // return (
  //   <div className="w-full flex flex-row flex-wrap items-start gap-[10px] lg:gap-[26px]">
  //     <div>{componentsByFeedbackType[feedbackType as keyof typeof componentsByFeedbackType]}</div>
  //     <FunFacts />
  //   </div>
  // );
}
