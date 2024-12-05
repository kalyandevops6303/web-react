import { UserType } from '@/flexternships/constraints/enums/core-enums';
import { Avatar, AvatarFallback, AvatarImage } from '@flexternships/app/components/ui/avatar';
import PrimaryButton from '../../../core/buttons/PrimaryButton';
import { Check, User } from 'react-feather';
import { MouseEvent, useEffect, useState } from 'react';
import { useLegalStore } from '@/flexternships/stores/legal-store';
import Spinner from '../../../core/Spinner';

export default function LegalDocSignee(props: LegalDocSigneeProps) {
  const { userType, company, image_uri, name, role, signed, signedDate, disabled, isCurrentUser, onClick } = props;

  const isSignDocumentLoading = useLegalStore((state) => state.isSignLegalDocumentLoading);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const styles = {
    signed:
      'bg-white border border-[#0185E4] text-[#0185E4] text-center font-medium font-montserrat text-sm tracking-[0.4px] hover:shadow-none cursor-default',
    pending: 'text-white text-center font-medium font-montserrat text-sm tracking-[0.4px]',
  };

  const handleClick = (event: any) => {
    setShowSpinner(true);
    onClick && onClick(event);
  };

  useEffect(() => {
    if (!isSignDocumentLoading) {
      setShowSpinner(false);
    }
  }, [isSignDocumentLoading]);

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={image_uri} />
          <AvatarFallback>
            <User color="#6E6B7B" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="text-[#5E5873] font-medium font-montserrat">
            {userType === UserType.CLIENT ? company : name}
          </div>
          <div className="text-[#6E6B7B] font-normal font-montserrat">{userType === UserType.CLIENT ? name : role}</div>
        </div>
      </div>

      <div className="flex flex-col">
        <PrimaryButton
          disabled={disabled || signed}
          className={`m-0 mb-2 flex w-[208px] h-[37px] p-[10px_22px] justify-center items-center gap-[8px] shrink-0 ${
            signed ? styles.signed : styles.pending
          }`}
          onClick={handleClick as any}
        >
          <div className={`flex items-center ${signed && 'gap-2'}`}>
            <div className="bg-[#28C76F30] rounded-full p-[2px]">
              {signed && <Check size="15.429px" color="#28C76F" />}
            </div>
            {showSpinner ? (
              <div className="flex">
                <Spinner white />
              </div>
            ) : (
              <div>{signed ? 'Confirmed' : isCurrentUser ? 'Confirm Agreement' : 'Pending Agreement'}</div>
            )}
          </div>
        </PrimaryButton>
        <div className="text-[#6E6B7B] font-normal font-montserrat text-sm leading-[21px]">
          <span className="font-medium">Sign on</span>: {signed && signedDate?.toDateString()}
        </div>
      </div>
    </div>
  );
}

type LegalDocSigneeProps = {
  userType: string;
  company?: string;
  image_uri: string;
  name: string;
  role?: string;
  signed: boolean;
  signedDate?: Date;
  disabled?: boolean;
  isCurrentUser: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
