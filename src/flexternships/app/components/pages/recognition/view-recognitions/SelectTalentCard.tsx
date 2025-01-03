// Core enums and types
import { UserType } from '@/flexternships/constraints/enums/core-enums';

// UI Components
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';

// Icons and assets
import defaultKudosIcon from '@/flexternships/assets/icons/core/kudos/kudos-default.svg';
import defaultWowIcon from '@/flexternships/assets/icons/core/wow/wow-default.svg';

// Utils and stores
import { stringToColour } from '@/flexternships/utils/miscellaneous-utils';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';

export default function SelectTalentCard(props: SelectTalentCardProps) {
  const { selected, onClick } = props;
  const userDetails = useFlexternUserStore((state) => state.userDetails);
  return (
    <div
      className={`flex flex-row justify-between gap-x-6 rounded-md p-4 border-1 ${
        selected
          ? 'bg-trublue-light border-trublue-secondary-500'
          : 'bg-white shadow-card border-transparent cursor-pointer'
      }`}
      onClick={onClick}
    >
      <div className="flex flex-row items-center gap-x-4">
        <div>
          <Avatar className="size-8">
            <AvatarImage src={''} />
            <AvatarFallback
              className="p-2 font-semibold text-sm"
              style={{
                color: stringToColour('Varun Yadav'),
                backgroundColor: `${stringToColour('Varun Yadav', { opacity: 10 })}`,
              }}
            >
              {'Varun Yadav'.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="w-[174px]">
          <div className="text-grey text-sm font-semibold leading-5.5">Bob</div>
          <div className="text-sm leading-5.5 text-grey">Frontend Developer</div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-x-2">
        {/* TODO: Thumbs/Wows */}
        <img
          className="size-6"
          src={userDetails.userType === UserType.CLIENT ? defaultWowIcon : defaultKudosIcon}
          alt="Recognition"
        />
        <span className="text-base text-grey-700 font-medium">+3</span>
      </div>
    </div>
  );
}

type SelectTalentCardProps = {
  selected?: boolean;
  onClick?: () => void;
};
