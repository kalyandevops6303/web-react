import Rating from '../../../../core/feedback/Rating';
import KudosAndWow from '../../../../core/feedback/KudosAndWow';
import defaultAvatar from '@flexternships/assets/icons/core/default-avatar.jpg';

export default function TeamCard(props: InputProps) {
  const { averageRating, ratingText, ratingColor, name, profileImage, designation, kudos, wow } = props;

  console.log(kudos, wow);
  return (
    <div className="flex py-5 px-5 items-center gap-x-7 rounded-md bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-x-4">
        <img src={profileImage || defaultAvatar} alt="profile-image" className="w-8 h-8 rounded-full object-cover" />
        <span className="text-grey text-sm font-semibold w-[200px]">{name}</span>
      </div>
      <span className="text-grey text-sm font-medium w-[200px]"> {designation}</span>
      {averageRating && <Rating rating={averageRating} ratingText={ratingText} ratingColor={ratingColor} />}
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
