import { Row } from '@tanstack/react-table';
import FlexternAvatar from '@/flexternships/app/components/core/avatars/FlexternAvatar';
import { useEffect } from 'react';

export default function MemberCell({ row }: Readonly<{ row: Row<any> }>) {
  useEffect(() => {
    console.log(row.original.member);
  }, [row.original.member]);

  return (
    <div>
      <div className="flex items-center gap-3">
        <FlexternAvatar
          name={`${row.original.member.firstName} ${row.original.member.lastName}`}
          imageUri={row.original.member.imageUri}
        />
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
