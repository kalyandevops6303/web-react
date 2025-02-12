import FlexternAvatar from '@flexternships/components/core/avatars/FlexternAvatar';
import PrimaryIconText from '@flexternships/components/core/buttons/PrimaryIconText';
import { Plus, Settings } from 'react-feather';
import TooltipInfo from '../../tooltips/TooltipInfo';
import { delegatesData } from '@/flexternships/mocks/navbar-data';
import { FlexternDelegateInvitationStatus } from '@/flexternships/constraints/enums/core-enums';

type DelegateItemProps = {
  name: string;
  imageUri?: string;
  status: FlexternDelegateInvitationStatus;
};

function DelegateItem(props: DelegateItemProps) {
  const { name, imageUri, status } = props;
  const isExpired = status === FlexternDelegateInvitationStatus.EXPIRED;
  const isAccepted = status === FlexternDelegateInvitationStatus.ACCEPTED;

  const handleResendInvite = () => {
    // TODO: Implement resend invite
    console.log('Resend Invite');
  };

  const delegate = <div className="text-sm leading-5 font-normal text-grey-heading max-w-40 truncate">{name}</div>;

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center gap-x-3">
        <FlexternAvatar name={name} imageUri={imageUri} />
        <div>
          <TooltipInfo trigger={delegate}>{name}</TooltipInfo>
          {isExpired && <div className="text-error text-xs leading-4.5 font-normal">Invitation Expired</div>}
        </div>
      </div>
      <div>
        {isAccepted && (
          <span className="py-[1px] px-[9px] rounded-[17px] border-1 border-trublue-secondary-500 text-xs font-semibold leading-4.5 text-trublue-secondary-500">
            Accepted
          </span>
        )}
        {isExpired && <PrimaryIconText className="py-1 px-2" text="Resend Invite" onClick={handleResendInvite} />}
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
      {delegatesData.data.map((delegate) => (
        <DelegateItem
          key={delegate.id}
          name={delegate.delegateName}
          imageUri={undefined}
          status={delegate.status as FlexternDelegateInvitationStatus}
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
