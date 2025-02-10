import { useEffect, useState } from 'react';
import JoinedTeamMemberCard from '@/flexternships/app/components/pages/project-details/tabs/team/JoinedTeamMemberCard';
import InvitedTeamMemberCard from '@/flexternships/app/components/pages/project-details/tabs/team/InvitedTeamMemberCard';
import { useParams } from 'react-router-dom';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { UserType } from '@/flexternships/constraints/enums/core-enums';
import Spinner from '@/flexternships/app/components/core/Spinner';
import teamPuzzleGif from '@/flexternships/assets/gifs/team-puzzle.gif';
import { TeamMemberDetails } from '@/flexternships/constraints/types/project-details-types';

export default function TeamTab(props: InputProps) {
  const { className } = props;
  const { projectId } = useParams<{ projectId: string }>();
  const populateTeamDetails = useProjectsStore((state) => state.populateTeamDetails);
  const isTeamDetailsLoading = useProjectsStore((state) => state.isTeamDetailsLoading);
  const teamDetails = useProjectsStore((state) => state.teamDetails);

  const userDetails = useFlexternUserStore((state) => state.userDetails);

  const [joinedTeamMembers, setJoinedTeamMembers] = useState<TeamMemberDetails[]>([]);
  const [pendingTeamMembers, setPendingTeamMembers] = useState<TeamMemberDetails[]>([]);

  useEffect(() => {
    setJoinedTeamMembers(teamDetails.filter((member) => member.isDocumentsSigned));
    setPendingTeamMembers(teamDetails.filter((member) => !member.isDocumentsSigned));
  }, [teamDetails]);

  useEffect(() => {
    if (!projectId) throw new Error('Project ID is required to fetch team details');
    populateTeamDetails(projectId);
  }, [populateTeamDetails, projectId]);

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
    <>
      {/* Joined Team Members */}
      <div className="my-5 max-w-5xl rounded-md bg-grey-light shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]">
        <div className="pt-6">
          <p className="text-lg px-6 pb-4 font-medium text-grey-heading border-b-1 border-grey-border">Project Team</p>
        </div>
        <div className={`flex flex-col gap-6 p-6 ${className ?? ''}`}>
          {joinedTeamMembers.length === 0 ? (
            <div className="py-5 gap-y-5 flex flex-col items-center rounded-md bg-white shadow-card">
              <img src={teamPuzzleGif} alt="team-puzzle" className="w-[176px] h-[141px] object-cover" />
              <p className="text-grey-300 text-sm font-medium tracking-wide">No talents found</p>
            </div>
          ) : (
            joinedTeamMembers.map((teamMember, index) => (
              <div className="w-full" key={index}>
                <JoinedTeamMemberCard
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
      {/* Invited Members */}
      {userDetails.userType === UserType.CLIENT && pendingTeamMembers.length > 0 && (
        <div className="my-5 max-w-5xl rounded-md bg-grey-light shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]">
          <div className="pt-6">
            <p className="text-lg px-6 pb-4 font-medium text-grey-heading border-b-1 border-grey-border">
              Invites Sent
            </p>
          </div>
          <div className={`flex flex-col gap-6 p-6 ${className ?? ''}`}>
            {pendingTeamMembers.map((teamMember, index) => (
              <div className="w-full" key={index}>
                <InvitedTeamMemberCard
                  member={{
                    name: teamMember.name,
                    profileImage: teamMember.profileImage,
                    email: teamMember.email ?? 'Unknown Email',
                    designation: teamMember.designation ?? 'Unknown Designation',
                    invitedOn: teamMember.invitedOn ?? 0,
                    isDocumentsSigned: teamMember.isDocumentsSigned ?? false,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

type InputProps = {
  className?: string;
};
