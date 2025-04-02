import EmptyStateGif from '@/assets/images/gifs/empty_state.gif';
import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import SecondaryButton from '@flexternships/app/components/core/buttons/SecondaryButton';
import { useNavigate, useParams } from 'react-router-dom';
export default function AnalyticsEmptyCard() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  return (
    <SimpleElevatedCard className="bg-white w-full flex flex-col items-center justify-center">
      <img src={EmptyStateGif} alt="empty-state" className="h-[142px] w-[154px]" />
      <div className="font-montserrat font-normal text-base leading-5">
        Analytics will be generated once the milestone feedbacks are submitted.
      </div>
      <SecondaryButton className="mt-3 outline-none" onClick={() => navigate(`/project-details/${projectId}`)}>
        View Project
      </SecondaryButton>
    </SimpleElevatedCard>
  );
}
