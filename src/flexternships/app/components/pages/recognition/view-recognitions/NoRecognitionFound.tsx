import SimpleElevatedCard from '../../../core/cards/SimpleElevatedCard';
import NoRecognitionFoundGif from '@/flexternships/assets/gifs/no-submissions-found.gif';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { UserType } from '@/flexternships/constraints/enums/core-enums';

function NoRecognitionFound() {
  const userDetails = useFlexternUserStore((state) => state.userDetails);
  return (
    <SimpleElevatedCard className="px-6 pb-7 bg-white">
      <div className="flex flex-col items-center gap-y-2">
        <img src={NoRecognitionFoundGif} alt="No Recognition Found" className="w-[169px]" />
        <div className="text-lg font-medium leading-[21px] text-trublue-secondary-500">
          No {userDetails.userType === UserType.TALENT ? 'Kudos' : 'WOWs'}! found
        </div>
      </div>
    </SimpleElevatedCard>
  );
}

export default NoRecognitionFound;
