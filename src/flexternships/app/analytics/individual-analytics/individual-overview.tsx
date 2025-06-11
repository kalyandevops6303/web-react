import AIGeneratedIcon from '@flexternships/assets/icons/core/AIGenerated.svg';
import TooltipInfo from '../../components/core/tooltips/TooltipInfo';
import TalentHeader from './talent-header';

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
      <TalentHeader
        firstName={firstName}
        lastName={lastName}
        role={role}
        imageUri={imageUri}
        education={education}
        flexternshipStartDate={flexternshipStartDate}
        flexternshipEndDate={flexternshipEndDate}
        className="bg-white rounded-lg"
      />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <div className="flex flex-col items-center gap-1 mb-4 p-[16px_24px_20px] rounded-10 bg-white shadow-card">
            <div>
              <span className="text-dark text-center font-montserrat text-[26px] font-semibold">
                {trumioAttractivenessScore}
              </span>
              <span className="text-grey-500 text-center font-montserrat text-xl font-normal">/100</span>
            </div>
            <div className="flex items-center gap-2 text-dark-100 font-medium">
              <div>Learnability Score</div>
              <TooltipInfo iconSize={18}>
                <div>Learnability Score</div>
              </TooltipInfo>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex w-1/2 flex-col items-center gap-1 px-6 pt-4 pb-5 rounded-10 bg-white shadow-card">
              <div>
                <span className="text-dark text-center font-montserrat text-[26px] font-semibold">{wowCount}</span>
              </div>
              <div className="flex items-center gap-2 text-dark-100 font-medium">
                <div>Wows!</div>
                <TooltipInfo iconSize={18}>
                  <div>Wows!</div>
                </TooltipInfo>
              </div>
            </div>
            <div className="flex w-1/2 flex-col items-center gap-1 px-6 pt-4 pb-5 rounded-10 bg-white shadow-card">
              <div>
                <span className="text-dark text-center font-montserrat text-[26px] font-semibold">{kudosCount}</span>
              </div>
              <div className="flex items-center gap-2 text-dark-100 font-medium">
                <div>Kudos!</div>
                <TooltipInfo iconSize={18}>
                  <div>Kudos!</div>
                </TooltipInfo>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-2 rounded-10 bg-white shadow-card">
          <div className="p-[16px_16px_0] flex flex-col flex-grow gap-2">
            <div className="flex md:items-center gap-2 flex-col md:flex-row">
              <div className="text-trublue-ai font-montserrat text-xs leading-5 flex px-2 py-1 justify-center items-center gap-1 rounded-52 border border-trublue-ai">
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
