import { Row } from '@tanstack/react-table';
import { Avatar, AvatarImage, AvatarFallback } from '@/flexternships/app/components/ui/avatar';

export default function MemberCell({ row }: Readonly<{ row: Row<any> }>) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={row.original.member.imageUri} />
          <AvatarFallback>{row.original.member.firstName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-start">
          <div className="overflow-hidden text-grey font-montserrat text-sm font-semibold leading-5.5">
            {row.original.member.firstName} {row.original.member.lastName}
          </div>
          <div className="text-grey font-montserrat text-xs font-normal leading-5.5">{row.original.member.role}</div>
        </div>
      </div>
    </div>
  );
}
