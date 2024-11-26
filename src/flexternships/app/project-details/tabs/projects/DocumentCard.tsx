import { useLegalStore } from '@/flexternships/stores/legal-store';
import SimpleElevatedCard from '@flexternships/app/components/core/cards/SimpleElevatedCard';
import { toUpper } from 'lodash';
import { useEffect } from 'react';
import { ChevronRight } from 'react-feather';
import { Link, useParams } from 'react-router-dom';

export default function DocumentCard(props: DocumentCardProps) {
  const { title, subtitle, link } = props;
  const params = useParams();

  const getLegalDocSignedStatus = useLegalStore((state) => state.getLegalDocStatus);
  const legalDocSignedStatus = useLegalStore((state) => state.legal?.signedStatus);

  useEffect(() => {
    getLegalDocSignedStatus(params?.projectId, toUpper(title));
  }, [params]);

  return (
    <a href={link?.href}>
      <SimpleElevatedCard className="flex items-center bg-white justify-between p-3 rounded-[6px] cursor-pointer border border-transparent hover:border-[#0578FB] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col text-left">
          <div className="text-[#B9B9C3] font-sans text-[12px] font-semibold leading-[16px]">{subtitle}</div>
          <div className="text-[#5E5873] font-sans text-[16px] font-medium leading-[24px] !no-underline hover:!no-underline">
            {title}
          </div>
        </div>

        <Link to={link?.href || '#'} className="text-center text-[14px] font-semibold tracking-[0.4px] text-[#0185E4]">
          {legalDocSignedStatus && legalDocSignedStatus[toUpper(title as string)]?.is_signed ? <ChevronRight size="20" color="#B4B7B8" /> : `Sign ${title}`}
        </Link>
      </SimpleElevatedCard>
    </a>
  );
}

type DocumentCardProps = {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  link?: {
    text: string;
    href: string;
  };
};
