import { Avatar, AvatarFallback, AvatarImage } from '@flexternships/app/components/ui/avatar';
import { ChevronRight, User } from 'react-feather';
import { Link, useParams } from 'react-router-dom';
import { addQueryParams } from '@/flexternships/utils/miscellaneous-utils';
import { useAppStore } from '@/flexternships/stores/core-stores';

type TalentHeaderProps = {
  firstName: string;
  lastName: string;
  role: string;
  imageUri: string;
  education: {
    name: string;
    startYear: string;
    endYear: string;
    institution: string;
  };
  flexternshipStartDate: string;
  flexternshipEndDate: string;
  className?: string;
};

export default function TalentHeader(props: Readonly<TalentHeaderProps>) {
  const { firstName, lastName, role, imageUri, education, flexternshipStartDate, flexternshipEndDate, className } =
    props;

  const blobSasTokenParams = useAppStore((state) => state.blobSasTokenParams);
  const { userId } = useParams();

  return (
    <div className={className}>
      <div className="flex p-5 justify-between flex-wrap items-center gap-5 self-stretch rounded-10 shadow-card">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={addQueryParams(imageUri, blobSasTokenParams)} />
            <AvatarFallback>
              <User color="#6E6B7B" />
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="flex gap-2 items-center overflow-hidden text-trublue-secondary-500 text-ellipsis font-montserrat text-base leading-6">
              <Link to={`/profile/talent/${userId}`}>
                <div className="text-trublue-secondary-500 font-montserrat text-base font-semibold leading-5font-semibold">
                  {firstName} {lastName}
                </div>
              </Link>
              <ChevronRight size={18} className="text-trublue-secondary-500" />
            </div>
            <div className="text-grey-500 font-montserrat text-xs leading-5">{role}</div>
          </div>
        </div>

        <div className="border-l border-border pl-5">
          <div className="text-dark-100 font-montserrat text-base leading-6 font-semibold">{education?.name}</div>
          <div className="flex gap-2 items-center">
            <div className="text-grey-500 font-montserrat text-xs leading-5">
              {education?.startYear} - {education?.endYear}
            </div>
            <div className="text-dark-200 font-montserrat text-xs leading-5">{education?.institution}</div>
          </div>
        </div>

        <div className="flex gap-3 items-center border-l border-border pl-5">
          <div>
            <div className="text-grey-700 font-montserrat text-base leading-6 font-semibold">
              {flexternshipStartDate}
            </div>
            <div className="text-dark-200 font-montserrat text-xs leading-5">Flexternship Start Date</div>
          </div>
        </div>

        <div className="flex gap-3 items-center border-l border-border pl-5">
          <div>
            <div className="text-grey-700 font-montserrat text-base leading-6 font-semibold">{flexternshipEndDate}</div>
            <div className="text-dark-200 font-montserrat text-xs leading-5">
              Flexternship End Date (As of {new Date().toLocaleDateString()})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
