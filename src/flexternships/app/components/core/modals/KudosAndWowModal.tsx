import { useEffect, useState } from 'react';
import PrimaryButton from '../buttons/PrimaryButton';
import CloseModalButton from '../buttons/CloseModalButton';
import { RecognitionSubHeading, RecognitionType } from '@/flexternships/constraints/enums/feedback-enum';
import Wow from '@flexternships/assets/icons/core/achieve.png';
import ThumbsUp from '@flexternships/assets/icons/core/ThumbsUp.svg';
import { TeamMemberDetails } from '@/flexternships/constraints/types/project-details-types';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { fetchTeamDetails } from '@/flexternships/services/project-details';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import Spinner from '../Spinner';
import { submitKudosOrWow } from '@/flexternships/services/project-management-v2';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';

function KudosAndWowModal(props: KudosAndWowModalProps) {
  const { recognitionType, isOpen = false, closeModal, projectId, milestoneId } = props;

  const [isTeamMembersLoading, setIsTeamMembersLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState<Array<TeamMemberDetails & { selected?: boolean }>>([]);
  const [selectedCount, setSelectedCount] = useState(0); // to keep track of the selected team members

  const userDetails = useFlexternUserStore((state) => state.userDetails);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      setIsTeamMembersLoading(true);
      try {
        const response = await fetchTeamDetails(projectId);
        const formattedData = response
          .map((member: any) => ({
            ...member,
            id: member._id,
            name: `${member.first_name} ${member.last_name}`,
            profileImage: member.image_uri,
            selected: false,
          }))
          .filter((member: any) => member.id !== userDetails.id);
        setTeamMembers(formattedData);
      } catch (error) {
        showToastMessage(ToastType.ERROR, error instanceof Error ? error.message : 'Error fetching team details');
      } finally {
        setIsTeamMembersLoading(false);
      }
    };
    fetchTeamMembers();
  }, [projectId]);

  useEffect(() => {
    setSelectedCount(teamMembers.filter((member) => member.selected).length);
  }, [teamMembers]);

  // Reset selections when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTeamMembers((members) => members.map((member) => ({ ...member, selected: false })));
    }
  }, [isOpen]);

  const toggleSelect = (index: number) => {
    if (isSubmitLoading) return;
    setTeamMembers((cur) =>
      cur.map((member, i) => ({ ...member, selected: i === index ? !member.selected : member.selected })),
    );
  };

  const handleSubmit = async () => {
    //get all selected team members
    setIsSubmitLoading(true);
    const selectedTeamMembers = teamMembers.filter((member) => member.selected);
    const selectedTeamMemberIds = selectedTeamMembers.map((member) => member.id);
    try {
      await submitKudosOrWow(milestoneId, selectedTeamMemberIds);
      closeModal();
      showToastMessage(
        ToastType.SUCCESS,
        `${recognitionType === RecognitionType.WOW ? 'WoW' : 'Kudos'} submitted successfully`,
      );
    } catch (error) {
      showToastMessage(
        ToastType.ERROR,
        error instanceof Error ? error.message : 'An unexpected error occurred while submitting kudos or wow',
      );
    } finally {
      setIsSubmitLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="relative w-full min-w-[64.875rem] max-w-sm rounded-lg bg-white-fa  shadow-[0px_4px_15px_rgba(44,63,88,0.35)]">
        <CloseModalButton onClick={closeModal} />
        <p className="mt-10 text-center w-full text-[1.75rem] font-medium text-grey-700">
          Recognition: {recognitionType === RecognitionType.WOW ? 'WoW' : 'Kudos'}
        </p>
        {isTeamMembersLoading ? (
          <div className="w-10 h-10 flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="mt-[3.38rem] mb-[3.31rem] mx-[3.75rem] bg-white  pl-4 pb-8">
            <p className="w-[40.5rem] text-grey-600 text-sm font-medium leading-snug pt-8">
              {recognitionType === RecognitionType.WOW ? RecognitionSubHeading.WOW : RecognitionSubHeading.KUDOS}
            </p>
            <p className="mt-[1.63rem] text-grey-heading text-lg font-medium">
              Selected {selectedCount}/{teamMembers.length}
            </p>
            <div className="mt-4 flex items-center flex-wrap gap-7">
              {teamMembers?.map((teamMember, index) => (
                <div
                  key={index}
                  onClick={() => toggleSelect(index)}
                  style={
                    teamMember.selected
                      ? {
                          background:
                            'linear-gradient(0deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.90) 100%), #0185E4',
                        }
                      : {}
                  }
                  className={`flex justify-center items-center gap-[0.875rem] w-[14.75rem] border bg-trublue-bg_secondary cursor-pointer ${
                    teamMember.selected ? 'border-trublue-secondary-500' : 'border-grey-50'
                  } rounded-md p-[0.625rem_1.25rem_0.625rem_2.0625rem]`}
                >
                  {recognitionType === RecognitionType.WOW ? (
                    <img
                      src={Wow}
                      style={!teamMember.selected ? { mixBlendMode: 'luminosity' } : {}}
                      className="w-8 h-8 object-cover"
                    />
                  ) : (
                    <img
                      src={ThumbsUp}
                      style={!teamMember.selected ? { mixBlendMode: 'luminosity' } : {}}
                      className="w-8 h-8"
                    />
                  )}
                  <img
                    src={teamMember.profileImage || defaultAvatar}
                    className="w-9 h-9 rounded-[50%] border-[0.25rem] border-white"
                  />
                  <p className="min-w-[7.875rem] text-sm font-normal text-grey-heading">{teamMember.name}</p>
                </div>
              ))}
            </div>
            <PrimaryButton onClick={handleSubmit} className="mt-[1.63rem]" loading={isSubmitLoading}>
              Submit
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
}

type KudosAndWowModalProps = {
  // onConfirm: () => void;
  recognitionType: RecognitionType;
  projectId: string;
  milestoneId: string;
  isOpen: boolean;
  closeModal: () => void;
};

export default KudosAndWowModal;
