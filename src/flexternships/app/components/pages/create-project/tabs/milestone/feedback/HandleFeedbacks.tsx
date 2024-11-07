import { Navigate, useParams } from 'react-router-dom';
import SelfFeedback from './SelfFeedback';

export default function HandleFeedbacks() {
  const { feedbackType } = useParams();
  const allowedFeedbackTypes = ['self', 'peer', 'team', 'individual'];
  if (!feedbackType || !allowedFeedbackTypes.includes(feedbackType)) {
    return <Navigate to={'/404'} />;
  }
  return <SelfFeedback />;
}
