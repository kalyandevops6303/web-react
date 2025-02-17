import SimpleElevatedCard from '../../../core/cards/SimpleElevatedCard';
import NoCommentsFoundGif from '@/flexternships/assets/gifs/no-submissions-found.gif';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { UserType } from '@/flexternships/constraints/enums/core-enums';
import { QuickActionCategory } from '@/flexternships/constraints/enums/quick-actions-enums';

function NoCommentsFound({ category = QuickActionCategory.RECOGNITION }: { category?: QuickActionCategory }) {
  const userDetails = useFlexternUserStore((state) => state.userDetails);
  return (
    <SimpleElevatedCard className="px-6 pb-7 bg-white">
      <div className="flex flex-col items-center gap-y-2">
        <img src={NoCommentsFoundGif} alt="No Comments Found" className="w-[169px]" />
        <div className="text-lg font-medium leading-[21px] text-trublue-secondary-500">
          No{' '}
          {category === QuickActionCategory.NOTE
            ? 'Notes'
            : userDetails.userType === UserType.TALENT
            ? 'Kudos'
            : 'WOWs!'}{' '}
          Found
        </div>
      </div>
    </SimpleElevatedCard>
  );
}

export default NoCommentsFound;
