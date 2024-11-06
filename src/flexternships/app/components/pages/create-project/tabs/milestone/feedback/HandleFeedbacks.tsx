import { useParams } from 'react-router-dom';
import SelfFeedback from './SelfFeedback';

export default function HandleFeedbacks() {
  const { feedbackType } = useParams();
  return <SelfFeedback />;
}
