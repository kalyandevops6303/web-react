import { useEffect } from 'react';
import TeamCard from '@/flexternships/app/components/pages/project-details/tabs/team/TeamCard';
import { useParams } from 'react-router-dom';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { UserType } from '@/flexternships/constraints/enums/core-enums';
import Spinner from '@/flexternships/app/components/core/Spinner';
import teamPuzzleGif from '@/flexternships/assets/gifs/team-puzzle.gif';

export default function TeamTab(props: InputProps) {
  const { className } = props;
  const { projectId } = useParams<{ projectId: string }>();
  const populateTeamDetails = useProjectsStore((state) => state.populateTeamDetails);
  const isTeamDetailsLoading = useProjectsStore((state) => state.isTeamDetailsLoading);
  const teamDetails = useProjectsStore((state) => state.teamDetails);

  const userDetails = useFlexternUserStore((state) => state.userDetails);

  useEffect(() => {
    populateTeamDetails(projectId);
  }, [populateTeamDetails]);

  if (isTeamDetailsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-48">
        <div className="h-8 w-8">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="my-5 max-w-5xl rounded-md bg-grey-light shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]">
      <div className="w-full pt-6">
        <p className="text-lg px-6 pb-3 font-medium text-grey-heading">Project Team</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="1039" height="2" viewBox="0 0 1039 2" fill="none">
          <path d="M1 1L1038 0.999792" stroke="#EBE9F1" stroke-linecap="square" />
        </svg>
      </div>
      <div className={`flex w-full flex-col items-center gap-6  p-6 ${className ?? ''}`}>
        {teamDetails.length === 0 ? (
          <div className="w-full py-5 gap-y-5 flex flex-col items-center rounded-md bg-white shadow-card">
            <img src={teamPuzzleGif} alt="team-puzzle" className="w-[176px] h-[141px] object-cover" />
            <p className="text-grey-300 text-sm font-medium tracking-wide">No talents found</p>
          </div>
        ) : (
          teamDetails.map((teamMember, index) => (
            <div className="w-full" key={index}>
              <TeamCard
                name={teamMember.name}
                designation={teamMember?.designation}
                averageRating={teamMember?.averageRating}
                ratingColor={'#0185E4'}
                kudos={userDetails.userType === UserType.TALENT ? teamMember?.appreciationScore : undefined}
                wow={userDetails.userType === UserType.CLIENT ? teamMember?.appreciationScore : undefined}
                profileImage={teamMember?.profileImage}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

type InputProps = {
  className?: string;
};
