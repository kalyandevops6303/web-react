import Rating from '../../../../core/feedback/Rating';
import KudosAndWow from '../../../../core/feedback/KudosAndWow';
import { stringToColour } from '@/flexternships/utils/miscellaneous-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/flexternships/app/components/ui/avatar';

export default function JoinedTeamMemberCard(props: InputProps) {
  const { averageRating, ratingText, ratingColor, name, profileImage, designation, kudos, wow } = props;
  return (
    <div className="flex py-5 px-5 items-center gap-x-7 rounded-md bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-x-4">
        <Avatar>
          <AvatarImage src={profileImage} />
          <AvatarFallback
            className="p-2 leading-6 font-semibold text-lg"
            style={{
              color: stringToColour(name ?? ''),
              backgroundColor: `${stringToColour(name ?? '', { opacity: 10 })}`,
            }}
          >
            {name
              ?.split(' ')
              .slice(0, 2)
              .map((word) => word.charAt(0).toUpperCase())
              .join('')}
          </AvatarFallback>
        </Avatar>
        <span className="text-grey text-sm font-semibold w-[200px]">{name}</span>
      </div>
      <span className="text-grey text-sm font-medium w-[200px]"> {designation}</span>
      {!(!averageRating && averageRating !== 0) && (
        <Rating rating={averageRating} ratingText={ratingText} ratingColor={ratingColor} />
      )}
      {kudos && <KudosAndWow kudos={kudos} />}
      {wow && <KudosAndWow wow={wow} />}
    </div>
  );
}

type InputProps = {
  averageRating?: number;
  ratingText?: string;
  ratingColor: string;
  name?: string;
  profileImage?: string;
  designation?: string;
  kudos?: number;
  wow?: number;
};
