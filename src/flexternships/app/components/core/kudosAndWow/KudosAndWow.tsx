import React from 'react';
import { ThumbsUp } from 'react-feather';
import Wow from '@flexternships/assets/icons/core/wow.png';

export default function KudosAndWow(props: InputProps) {
  const { kudos, wow } = props;
  return (
    <div>
      {wow && (
        <div className="flex items-center">
          <img src={Wow} className="w-6 h-6 mr-2" />
          <p>+{wow}</p>
        </div>
      )}
      {kudos && (
        <div className="flex items-center">
          <ThumbsUp className="w-6 h-6 mr-2" />
          <p>+{kudos}</p>
        </div>
      )}
    </div>
  );
}

type InputProps = {
  kudos?: number;
  wow?: number;
};
