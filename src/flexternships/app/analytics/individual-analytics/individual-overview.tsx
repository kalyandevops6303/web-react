import { Avatar, AvatarFallback, AvatarImage } from '@flexternships/app/components/ui/avatar';
import { ChevronRight, Info, User } from 'react-feather';
import AIGeneratedIcon from '@flexternships/assets/icons/core/AIGenerated.svg';
import { Link, useParams } from 'react-router-dom';

type IndividualOverviewProps = {
  userId: string;
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
  wowCount: number;
  kudosCount: number;
  trumioAttractivenessScore: number;
  aiGeneratedSummary: string;
};

export default function IndividualOverview(props: Readonly<IndividualOverviewProps>) {
  const {
    firstName,
    lastName,
    role,
    imageUri,
    education,
    flexternshipStartDate,
    flexternshipEndDate,
    wowCount,
    kudosCount,
    trumioAttractivenessScore,
    aiGeneratedSummary,
  } = props;

  const { userId } = useParams();

  return (
    <>
      <div>
        <div className="flex p-5 justify-between flex-wrap items-center gap-5 self-stretch rounded-10 bg-white shadow-card">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={imageUri} />
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
              <div className="text-grey-700 font-montserrat text-base leading-6 font-semibold">
                {flexternshipEndDate}
              </div>
              <div className="text-dark-200 font-montserrat text-xs leading-5">
                Flexternship End Date (As of {new Date().toLocaleDateString()})
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <div className="flex flex-col items-center gap-1 mb-4 p-[16px_24px_20px] rounded-10 bg-white shadow-card">
            <div>
              <span className="text-dark text-center font-montserrat text-[32px] font-semibold">
                {trumioAttractivenessScore}
              </span>
              <span className="text-grey-500 text-center font-montserrat text-xl font-normal">/100</span>
            </div>
            <div className="flex items-center gap-2">
              <div>Attractiveness Score</div>
              <Info size={18} className="text-grey-500" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex w-1/2 flex-col items-center gap-1 px-6 pt-4 pb-5 rounded-10 bg-white shadow-card">
              <div>
                <span className="text-dark text-center font-montserrat text-[32px] font-semibold">{wowCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div>Wows!</div>
                <Info size={18} className="text-grey-500" />
              </div>
            </div>
            <div className="flex w-1/2 flex-col items-center gap-1 px-6 pt-4 pb-5 rounded-10 bg-white shadow-card">
              <div>
                <span className="text-dark text-center font-montserrat text-[32px] font-semibold">{kudosCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div>Kudos!</div>
                <Info size={18} className="text-grey-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-2 rounded-10 bg-white shadow-card">
          <div className="p-[16px_16px_0] flex flex-col flex-grow gap-2">
            <div className="flex md:items-center gap-2 flex-col md:flex-row">
              <div className="text-trublue-secondary-500 font-montserrat text-xs leading-5 flex px-2 py-1 justify-center items-center gap-1 rounded-52 border border-trublue-secondary-500">
                <img src={AIGeneratedIcon} alt="AIGenerated" />
                <span className="font-semibold">AI Generated</span>
              </div>
              <div className="text-dark-100 font-montserrat text-sm leading-5.5 font-medium">Performance Summary</div>
            </div>
            <div className="text-dark-200 font-montserrat text-sm leading-5.5">{aiGeneratedSummary}</div>
          </div>

          <div className="bg-primary-light bottom-0 left-0 w-full p-[12px_16px] rounded-b-10">
            <span className="text-primary font-montserrat text-xs leading-4">Note: </span>
            <span className="text-dark-200 font-montserrat text-xs leading-4">
              Generative AI may produce inaccurate or incomplete information. Verify critical details while reviewing
              the content.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
