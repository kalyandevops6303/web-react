import { Navigate, useParams } from 'react-router-dom';
import SelfFeedback from './SelfFeedback';

/**
 * TODO:
 * - Add sidebar
 * - Render feedback based on the feedbackType param
 */

export default function HandleFeedbacks() {
  const { feedbackType } = useParams();
  const allowedFeedbackTypes = ['self', 'peer', 'team', 'individual'];
  if (!feedbackType || !allowedFeedbackTypes.includes(feedbackType)) {
    return <Navigate to={'/404'} />;
  }
  return <SelfFeedback />;
}
