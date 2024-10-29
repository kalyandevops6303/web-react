import React from 'react';
import Rating from '../rating/Rating';
import KudosAndWow from '../kudosAndWow/KudosAndWow';

export default function TeamCard(props: InputProps) {
  const { rating, ratingText, ratingColor, name, profileImage, designation, kudos, wow } = props;
  return (
    <div className="flex h-[4.5rem] py-[0.625rem] px-[1.25rem] items-center gap-7 self-stretch rounded-[0.375rem] bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.06)]">
      <div className=' flex items-center'>
        <div
          style={{
            backgroundImage:
              `url(${profileImage})`,
          }}
          className="w-8 h-8 rounded-[1rem] bg-lightgray bg-center bg-cover bg-no-repeat mr-4"
        ></div>
        <span className=' text-grey text-sm font-semibold'>{name}</span>
      </div>
      <span className=" text-grey text-sm font-medium"> {designation}</span>
      {
        rating && <Rating rating={rating} ratingText={ratingText || ''} ratingColor={ratingColor} />
      }
      {
        kudos && <KudosAndWow kudos={kudos} />
      }
      {
        wow && <KudosAndWow wow={wow} />
      }
    </div>
  );
}

type InputProps = {
    rating?: number;
    ratingText?: string;
    ratingColor: string;
    name?: string;
    profileImage?: string;
    designation?: string;
    kudos?: number;
    wow?: number;
};
