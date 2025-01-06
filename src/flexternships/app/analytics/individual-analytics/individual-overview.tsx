import { Avatar, AvatarFallback, AvatarImage } from '@flexternships/app/components/ui/avatar';
import { ChevronRight, Info, User } from 'react-feather';
import AIGeneratedIcon from '@flexternships/assets/icons/core/AIGenerated.svg';

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

  return (
    <>
      <div>
        <div className="flex p-5 justify-between flex-wrap items-center gap-5 self-stretch rounded-lg bg-white shadow-card">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={imageUri} />
              <AvatarFallback>
                <User className="text-dark-200" />
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="flex gap-2 items-center overflow-hidden text-primary text-ellipsis font-montserrat text-lg font-semibold">
                <div>
                  {firstName} {lastName}
                </div>
                <ChevronRight size={18} className="text-primary" />
              </div>
              <div className="text-dark-300 font-montserrat text-sm font-normal">{role}</div>
            </div>
          </div>

          <div className="border-l border-border pl-5">
            <div className="text-dark-100 font-montserrat text-lg font-semibold">{education?.name}</div>
            <div className="flex gap-2 items-center">
              <div className="text-grey-500 font-montserrat text-sm font-medium">
                {education?.startYear} - {education?.endYear}
              </div>
              <div className="text-dark-200 font-montserrat text-sm font-normal">{education?.institution}</div>
            </div>
          </div>

          <div className="flex gap-3 items-center border-l border-border pl-5">
            <div>
              <div className="text-grey-700 font-montserrat text-lg font-semibold">{flexternshipStartDate}</div>
              <div className="text-dark-200 font-montserrat text-sm font-normal">Flexternship Start Date</div>
            </div>
          </div>

          <div className="flex gap-3 items-center border-l border-border pl-5">
            <div>
              <div className="text-grey-700 font-montserrat text-lg font-semibold">{flexternshipEndDate}</div>
              <div className="text-dark-200 font-montserrat text-sm font-normal">
                Flexternship End Date (As of {new Date().toLocaleDateString()})
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <div className="flex flex-col items-center gap-1 mb-4 p-6 rounded-lg bg-white shadow-card">
            <div>
              <span className="text-dark text-center font-montserrat text-4xl font-semibold">
                {trumioAttractivenessScore}
              </span>
              <span className="text-dark-300 text-center font-montserrat text-2xl font-normal">/100</span>
            </div>
            <div className="flex items-center gap-2">
              <div>Attractiveness Score</div>
              <Info size={18} className="text-dark-300" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex w-1/2 flex-col items-center gap-1 p-4 rounded-lg bg-white shadow-card">
              <div>
                <span className="text-dark text-center font-montserrat text-4xl font-semibold">{wowCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div>Wows!</div>
                <Info size={18} className="text-dark-300" />
              </div>
            </div>
            <div className="flex w-1/2 flex-col items-center gap-1 p-4 rounded-lg bg-white shadow-card">
              <div>
                <span className="text-dark text-center font-montserrat text-4xl font-semibold">{kudosCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div>Kudos!</div>
                <Info size={18} className="text-dark-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-2 rounded-lg bg-white shadow-card">
          <div className="p-4 flex flex-col flex-grow gap-2">
            <div className="flex md:items-center gap-2 flex-col md:flex-row">
              <div className="text-primary font-montserrat text-sm font-semibold flex p-1 px-2 justify-center items-center gap-1 rounded-2xl border border-primary">
                <img src={AIGeneratedIcon} alt="AIGenerated" />
                <span>AI Generated</span>
              </div>
              <div className="text-dark-100 font-montserrat text-base font-medium">Performance Summary</div>
            </div>
            <div className="text-dark-200 font-montserrat text-base font-normal">{aiGeneratedSummary}</div>
          </div>

          <div className="bg-primary-light w-full p-3 px-4 rounded-b-lg">
            <span className="text-primary font-montserrat text-sm font-medium">Note: </span>
            <span className="text-dark-200 font-montserrat text-sm font-normal">
              Generative AI may produce inaccurate or incomplete information. Verify critical details while reviewing
              the content.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
