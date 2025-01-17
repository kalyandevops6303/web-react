import { Row } from '@tanstack/react-table';
import { Avatar, AvatarImage, AvatarFallback } from '@/flexternships/app/components/ui/avatar';

export default function MemberCell({ row }: Readonly<{ row: Row<any> }>) {
  return (
    <div>
      <div className="flex items-center gap-[12px]">
        <Avatar className="w-[40px] h-[40px]">
          <AvatarImage src={row.original.member.imageUri} />
          <AvatarFallback>{row.original.member.firstName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-start gap-0">
          <div className="overflow-hidden text-[#6E6B7B] text-ellipsis font-montserrat text-[14px] font-semibold leading-[22px]">
            {row.original.member.firstName} {row.original.member.lastName}
          </div>
          <div className="text-[#6E6B7B] font-montserrat text-[12px] font-normal leading-[22px]">
            {row.original.member.role}
          </div>
        </div>
      </div>
    </div>
  );
}
