// External dependencies
import classNames from 'classnames';
import { MessageSquare } from 'react-feather';

// Core components
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';

// Enums and types
import { UserType } from '@/flexternships/constraints/enums/core-enums';
import { QuickActionCategory } from '@/flexternships/constraints/enums/quick-actions-enums';

// Icons and assets
import defaultKudosIcon from '@/flexternships/assets/icons/core/kudos/kudos-default.svg';
import defaultWowIcon from '@/flexternships/assets/icons/core/wow/wow-default.svg';

// Utils and stores
import { stringToColour } from '@/flexternships/utils/miscellaneous-utils';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';

export default function SelectTalentCard(props: SelectTalentCardProps) {
  const { selected, onClick, talentInfo, category = QuickActionCategory.RECOGNITION } = props;
  const userDetails = useFlexternUserStore((state) => state.userDetails);

  const cardClasses = classNames('flex flex-row justify-between gap-x-6 rounded-md p-4 border-1 min-w-[330px]', {
    'bg-trublue-light border-trublue-secondary-500': selected,
    'bg-white shadow-card border-transparent cursor-pointer': !selected,
  });

  const defaultAvatarStyle = {
    color: stringToColour(talentInfo.name),
    backgroundColor: `${stringToColour(talentInfo.name, { opacity: 10 })}`,
  };

  const isNoteCategory = category === QuickActionCategory.NOTE;
  const score = isNoteCategory ? talentInfo.noteCount : talentInfo.appreciationScore;
  const shouldShowScore = !!(isNoteCategory ? talentInfo.noteCount : talentInfo.appreciationScore);
  const recognitionIcon = userDetails.userType === UserType.CLIENT ? defaultWowIcon : defaultKudosIcon;

  return (
    <div className={cardClasses} onClick={onClick}>
      <div className="flex flex-row items-center gap-x-4">
        <div>
          <Avatar className="size-8">
            <AvatarImage src={talentInfo.profileImage} />
            <AvatarFallback className="p-2 font-semibold text-sm" style={defaultAvatarStyle}>
              {talentInfo.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="w-[174px]">
          <div className="text-grey text-sm font-semibold leading-5.5">{talentInfo.name}</div>
          <div className="text-sm leading-5.5 text-grey">{talentInfo.designation}</div>
        </div>
      </div>
      {shouldShowScore && (
        <div className="flex flex-row items-center gap-x-2">
          {isNoteCategory ? (
            <MessageSquare size={24} className="text-grey-600" />
          ) : (
            <img className="size-6" src={recognitionIcon} alt="Recognition" />
          )}
          <span className="text-base text-grey-600 font-medium">+{score}</span>
        </div>
      )}
    </div>
  );
}

type SelectTalentCardProps = {
  selected?: boolean;
  onClick?: () => void;
  talentInfo: {
    id: string;
    name: string;
    profileImage?: string;
    designation: string;
    appreciationScore?: number;
    noteCount?: number;
  };
  category?: QuickActionCategory;
};
