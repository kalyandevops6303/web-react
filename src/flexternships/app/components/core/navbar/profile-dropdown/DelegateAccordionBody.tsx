import FlexternAvatar from '@flexternships/components/core/avatars/FlexternAvatar';
import PrimaryIconText from '@flexternships/components/core/buttons/PrimaryIconText';
import { Plus, Settings } from 'react-feather';
import TooltipInfo from '../../tooltips/TooltipInfo';
import { FlexternDelegateInvitationStatus, ToastType } from '@/flexternships/constraints/enums/core-enums';
import { delegateInvitationsData } from '@/flexternships/mocks/navbar-data';
import { useState } from 'react';
import { inviteDelegate } from '@/flexternships/services/user-management';
import { showToastMessage } from '@/flexternships/utils/core-utils';

type DelegateItemProps = {
  name?: string;
  email: string;
  imageUri?: string;
  status: FlexternDelegateInvitationStatus;
};

function DelegateItem(props: DelegateItemProps) {
  const { name, email, imageUri, status } = props;

  const [isResending, setIsResending] = useState(false);
  const [inviteStatus, setInviteStatus] = useState<FlexternDelegateInvitationStatus>(status);

  const isExpired = inviteStatus === FlexternDelegateInvitationStatus.EXPIRED;
  const isAccepted = inviteStatus === FlexternDelegateInvitationStatus.ACCEPTED;

  const handleResendInvite = async () => {
    setIsResending(true);
    try {
      await inviteDelegate(email);
      setInviteStatus(FlexternDelegateInvitationStatus.INVITED);
    } catch (error: unknown) {
      showToastMessage(
        ToastType.ERROR,
        error instanceof Error ? error.message : 'An unexpected error occurred while resending invite',
      );
    } finally {
      setIsResending(false);
    }
  };

  const delegate = (
    <div className="text-sm leading-5 font-normal text-grey-heading max-w-40 truncate cursor-default">
      {name || email}
    </div>
  );

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center gap-x-3">
        <FlexternAvatar name={name || email} imageUri={imageUri} />
        <div>
          <TooltipInfo trigger={delegate}>{email}</TooltipInfo>
          {isExpired && <div className="text-error text-xs leading-4.5 font-normal">Invitation Expired</div>}
        </div>
      </div>
      <div>
        {isAccepted && (
          <span className="py-[1px] px-[9px] rounded-[17px] border-1 border-trublue-secondary-500 text-xs font-semibold leading-4.5 text-trublue-secondary-500">
            Accepted
          </span>
        )}
        {isExpired && (
          <PrimaryIconText
            className="py-1 px-2"
            text={isResending ? 'Resending...' : 'Resend Invite'}
            onClick={handleResendInvite}
            disabled={isResending}
          />
        )}
        {!isAccepted && !isExpired && (
          <span className="py-[1.5px] px-[9px] rounded-[17px] text-xs font-semibold leading-4.5 text-trublue-secondary-500 bg-trublue-light">
            Invited
          </span>
        )}
      </div>
    </div>
  );
}

export default function DelegateAccordionBody() {
  return (
    <div className="flex flex-col gap-y-5 pt-3 pb-4 px-4">
      {delegateInvitationsData.data.map((delegateInvitation) => (
        <DelegateItem
          key={delegateInvitation.id}
          name={delegateInvitation.invitee.name}
          email={delegateInvitation.invitee.email}
          imageUri={delegateInvitation.invitee.imageUri}
          status={delegateInvitation.status}
        />
      ))}
      <div className="flex flex-col gap-y-2 text-trublue-secondary-500 self-start">
        <PrimaryIconText
          text="Add Delegate"
          icon={<Plus size={18} className="text-trublue-secondary-500" />}
          onClick={() => {}}
        />
        <PrimaryIconText
          text="Delegate Settings"
          icon={<Settings size={18} className="text-trublue-secondary-500" />}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
