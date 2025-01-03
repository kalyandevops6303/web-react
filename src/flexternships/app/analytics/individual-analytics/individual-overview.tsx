import { Avatar, AvatarFallback, AvatarImage } from '@flexternships/app/components/ui/avatar';
import { ChevronRight, Info, User } from 'react-feather';
import AIGeneratedIcon from '@flexternships/assets/icons/core/AIGenerated.svg';
import { useEffect } from 'react';

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
  hardSkillsPre: number;
  hardSkillsPost: number;
  aiGeneratedSummary: string;
};

export default function IndividualOverview(props: IndividualOverviewProps) {
  const {
    userId,
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
    hardSkillsPre,
    hardSkillsPost,
    aiGeneratedSummary,
  } = props;

  // const formatDate = (epoch: number) => {
  //   const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
  //   const formattedDate = new Date(epoch).toLocaleDateString('en-US', options);
  //   return formattedDate;
  // };

  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <>
      <div>
        <div className="flex p-[20px] justify-between flex-wrap items-center gap-[20px] self-stretch rounded-[10px] bg-[#FFF] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-[12px] ">
            <Avatar>
              <AvatarImage src={imageUri} />
              <AvatarFallback>
                <User color="#6E6B7B" />
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="flex gap-[8px] items-center overflow-hidden text-[#0185E4] text-ellipsis font-montserrat text-[16px] font-semibold leading-[24px]">
                <div>
                  {firstName} {lastName}
                </div>
                <ChevronRight size={18} color="#0185E4" />
              </div>
              <div className="text-[#838889] font-montserrat text-[12px] font-normal leading-[20px]">{role}</div>
            </div>
          </div>

          <div className="border-l border-[#E6E7E7] pl-[20px]">
            <div className="text-[#394042] font-montserrat text-[16px] font-semibold leading-[24px]">
              {education?.name}
            </div>
            <div className="flex gap-[8px] items-center">
              <div className="text-grey-500 font-montserrat text-[12px] font-medium leading-[20px]">
                {education?.startYear} - {education?.endYear}
              </div>
              <div className="text-[#6A7071] font-montserrat text-[12px] font-normal leading-[20px]">
                {education?.institution}
              </div>
            </div>
          </div>

          <div className="flex gap-[12px] items-center border-l border-[#E6E7E7] pl-[20px]">
            <div>
              <div className="text-grey-700 font-montserrat text-[16px] font-semibold leading-[24px]">
                {flexternshipStartDate}
              </div>
              <div className="text-[#6A7071] font-montserrat text-[12px] font-normal leading-[20px]">
                Flexternship Start Date
              </div>
            </div>
          </div>

          <div className="flex gap-[12px] items-center border-l border-[#E6E7E7] pl-[20px]">
            <div>
              <div className="text-grey-700 font-montserrat text-[16px] font-semibold leading-[24px]">
                {flexternshipEndDate}
              </div>
              <div className="text-[#6A7071] font-montserrat text-[12px] font-normal leading-[20px]">
                Flexternship End Date (As of {new Date().toLocaleDateString()})
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-[16px]">
        <div className="w-full md:w-1/3">
          <div className="flex flex-col items-center gap-[4px] mb-[16px] p-[16px_24px_20px] rounded-[10px] bg-[#FFF] shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <div>
              <span className="text-[#071013] text-center font-montserrat text-[32px] font-semibold">
                {trumioAttractivenessScore}
              </span>
              <span className="text-[#838889] text-center font-montserrat text-[20px] font-normal ">/100</span>
            </div>
            <div className="flex items-center gap-[8px]">
              <div>Attractiveness Score</div>
              <Info size={18} color="#838889" />
            </div>
          </div>

          <div className="flex gap-[16px] mb-[24px]">
            <div className="flex w-1/2 flex-col items-center gap-[4px] p-[16px_24px_20px] rounded-[10px] bg-[#FFF] shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div>
                <span className="text-[#071013] text-center font-montserrat text-[32px] font-semibold">{wowCount}</span>
              </div>
              <div className="flex items-center gap-[8px]">
                <div>Wows!</div>
                <Info size={18} color="#838889" />
              </div>
            </div>
            <div className="flex w-1/2 flex-col items-center gap-[4px] p-[16px_24px_20px] rounded-[10px] bg-[#FFF] shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div>
                <span className="text-[#071013] text-center font-montserrat text-[32px] font-semibold">
                  {kudosCount}
                </span>
              </div>
              <div className="flex items-center gap-[8px]">
                <div>Kudos!</div>
                <Info size={18} color="#838889" />
              </div>
            </div>
          </div>
          <div className="flex gap-[16px]">
            <div className="flex w-full items-center gap-[4px] p-[16px_24px_20px] rounded-[10px] bg-[#FFF] shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div className="w-1/2 flex flex-col items-center gap-[4px]">
                <div>
                  <span className="text-[#071013] text-center font-montserrat text-[32px] font-semibold">
                    {hardSkillsPre}
                  </span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div>Hard Skills (Pre)</div>
                  <Info size={18} color="#838889" />
                </div>
              </div>
              <div className="flex h-full w-[1px] bg-[#E6E7E7]"></div>
              <div className="w-1/2 flex flex-col items-center gap-[4px]">
                <div>
                  <span className="text-[#071013] text-center font-montserrat text-[32px] font-semibold">
                    {hardSkillsPost}
                  </span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <div>Hard Skills (Post)</div>
                  <Info size={18} color="#838889" />
                </div>
              </div>
            </div>
            {/* <div className="flex w-1/2 flex-col items-center gap-[4px] p-[16px_24px_20px] rounded-[10px] bg-[#FFF] shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                            <div>
                                <span className="text-[#071013] text-center font-montserrat text-[32px] font-semibold">{hardSkillsPost}</span>
                            </div>
                            <div className="flex items-center gap-[8px]">
                                <div>Hard Skills (Post)</div>
                                <Info size={18} color="#838889" />
                            </div>
                        </div> */}
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-[8px] rounded-[10px] bg-[#FFF] shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <div className="p-[16px_16px_0] flex  flex-col flex-grow gap-[8px]">
            <div className="flex md:items-center gap-[8px] flex-col md:flex-row">
              <div className="text-[#0185E4] font-montserrat text-[12px] font-semibold leading-[20px] flex p-[4px_8px] justify-center items-center gap-[4px] rounded-[16px] border border-[#0185E4]">
                <img src={AIGeneratedIcon} alt="AIGenerated" />
                AI Generated
              </div>
              <div className="text-[#394042] font-montserrat text-[14px] font-medium leading-[22px]">
                Performance Summary
              </div>
            </div>
            <div className="text-[#6A7071] font-montserrat text-[14px] font-normal leading-[22px]">
              {aiGeneratedSummary}
            </div>
          </div>

          <div className="bg-[#0185E41F] bottom-0 left-0 w-full p-[12px_16px] rounded-b-[10px]">
            <span className="text-[#0185E4] font-montserrat text-[12px] font-medium leading-[16px]">Note: </span>
            <span className="text-[#6A7071] font-montserrat text-[12px] font-normal leading-[16px]">
              Generative AI may produce inaccurate or incomplete information. Verify critical details while reviewing
              the content.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
