import { Navigate, useParams } from 'react-router-dom';
import SelfFeedback from './SelfFeedback';
import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';

/**
 * TODO:
 * - Add sidebar
 * - Render feedback based on the feedbackType param
 */

export default function HandleFeedbacks() {
  const { feedbackType } = useParams();
  const allowedFeedbackTypes = Object.values(MilestoneFeedbackType).map((type) => type.toLowerCase());
  if (!feedbackType || !allowedFeedbackTypes.includes(feedbackType)) {
    return <Navigate to={'/404'} />;
  }
  return <SelfFeedback />;
}
