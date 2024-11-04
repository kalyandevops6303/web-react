import { useEffect } from 'react';
import TeamCard from '@/flexternships/app/components/core/TeamCard/TeamCard';
import { useParams } from 'react-router-dom';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';

export default function TeamTab(props: InputProps) {
  const { className } = props;
  const { projectId } = useParams<{ projectId: string }>();
  const populateTeamDetails = useProjectsStore((state) => state.populateTeamDetails);
  const teamDetails = useProjectsStore((state) => state.teamDetails);
  useEffect(() => {
    populateTeamDetails(projectId);
  }, [populateTeamDetails]);
  return (
    <div className="w-[64.8125rem]  rounded-md bg-grey-light shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]">
      <div className=" w-full pt-6">
        <p className="text-lg px-6 pb-3 font-medium text-grey-heading">Project Team</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="1039" height="2" viewBox="0 0 1039 2" fill="none">
          <path d="M1 1L1038 0.999792" stroke="#EBE9F1" stroke-linecap="square" />
        </svg>
      </div>
      <div className={`flex w-full flex-col items-center gap-6  p-6 ${className ?? ''}`}>
        {teamDetails &&
          teamDetails.map((teamMember, index) => (
            <div className="w-full" key={index}>
              <TeamCard
                name={teamMember.name}
                designation={teamMember?.designation}
                rating={teamMember?.rating}
                ratingText={teamMember?.ratingText}
                ratingColor={'#0185E4'}
                kudos={teamMember?.kudos}
                profileImage={teamMember?.profileImage}
              />
            </div>
          ))}
        <TeamCard
          name="John Doe"
          designation="Software Engineer"
          rating={4.5}
          ratingText="Very Good"
          ratingColor="#0185E4"
          kudos={5}
          wow={3}
          profileImage={
            'https://s3-alpha-sig.figma.com/img/9e72/9cfc/2fb3451f2790627112ebba6732cb7a49?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ALsUZ8O14JtKOviBl-r6q6nxkwa~NMMcrLIoGDL0E~p5bXohuD0oZ00-DHJWNLdLx-ZArbaGh5-3BVPcuVeR7TFkZEPS85a-pvjqckik3RO10hmE0eyyCfENhLeqFEri4W0Pwq7b4DWfzGihIiWraBb9Rm-Vo7RnDuA0TYLUC4kR8Kh-JMAiAiXcdHHoLaJitgh3M8WdCizkfHskeUmiHT80AHWUYXxNhEojsF0ABPoxV43LxlZA2dv4DkMDIGnGeQGSNSnpZYxieMRGo8yea4OZ8WBqE3ST~Z8uidGnlX6sy2wMUHfwyPLJKTs0Ev~l1kYIGpPG-JUNKJhou0dI1w__'
          }
        />{' '}
        {/*Dummy Team Member*/}
      </div>
    </div>
  );
}

type InputProps = {
  className?: string;
};
