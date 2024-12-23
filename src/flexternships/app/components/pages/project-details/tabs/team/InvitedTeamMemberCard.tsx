import { Avatar, AvatarFallback, AvatarImage } from '@/flexternships/app/components/ui/avatar';
import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';
import { stringToColour } from '@/flexternships/utils/miscellaneous-utils';
import { Mail } from 'react-feather';

export default function InvitedTeamMemberCard(props: InputProps) {
  const { member } = props;
  return (
    <div className="p-5 flex flex-row flex-wrap justify-between items-center gap-y-6 rounded-md bg-white shadow-card">
      <div className="flex flex-row flex-wrap items-center gap-x-7 gap-y-6">
        <div className="flex items-center gap-x-3">
          <Avatar>
            <AvatarImage src={member.profileImage} />
            <AvatarFallback
              className="p-2 leading-6 font-semibold text-lg"
              style={{
                color: stringToColour(member.email),
                backgroundColor: `${stringToColour(member.email, { opacity: 10 })}`,
              }}
            >
              {member.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-grey text-sm font-semibold leading-5.5 w-[270px]">{member.email}</span>
        </div>
        <span className="text-grey text-sm font-medium leading-5.5 w-[200px]">{member.designation}</span>
      </div>
      <div className="flex flex-col items-start gap-y-0.5">
        <div className="text-sm text-grey font-normal leading-[21px]">Invited On</div>
        <div className="text-base text-grey-heading font-medium leading-[21px]">
          {formatEpochToHumanReadable(member.invitedOn, true)}
        </div>
      </div>
      {!member.isDocumentsSigned && (
        <div className="flex flex-col items-start gap-y-0.5">
          <div className="text-sm text-grey font-normal leading-[21px]">Status</div>
          <div className="text-base text-grey-heading font-medium leading-[21px]">Pending</div>
        </div>
      )}
      <div className="p-[9px] rounded-full bg-trublue-light text-trublue-secondary-500 cursor-not-allowed">
        <Mail size={24} />
      </div>
    </div>
  );
}

type InputProps = {
  member: {
    profileImage?: string;
    email: string;
    designation: string;
    invitedOn: number;
    isDocumentsSigned: boolean;
  };
};
