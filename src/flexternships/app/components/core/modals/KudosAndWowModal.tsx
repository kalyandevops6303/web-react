import React from 'react';
import PrimaryButton from '../buttons/PrimaryButton';
import CloseModalButton from '../buttons/CloseModalButton';
import { RecognitionSubHeading, RecognitionType } from '@/flexternships/constraints/enums/feedback-enum';
import Wow from '@flexternships/assets/icons/core/achieve.png';
import ThumbsUp from '@flexternships/assets/icons/core/ThumbsUp.svg';
import { TeamMemberDetails } from '@/flexternships/constraints/types/project-details-types';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';

function KudosAndWowModal(props: KudosAndWowModalProps) {
  const { recognitionType, teamMembers } = props;
  const [isOpen, setIsOpen] = React.useState(true);
  const [teamMember, setTeamMember] = React.useState<Array<any>>([]);
  const [selectedCount, setSelectedCount] = React.useState(0); // to keep track of the selected team members

  React.useEffect(() => {
    setTeamMember([...teamMembers]);
  }, [teamMembers]);

  const handleSelect = (index: number) => {
    let temp = [...teamMember];
    temp[index].selected = !temp[index].selected;
    setTeamMember(temp);
    if (temp[index].selected) {
      setSelectedCount(selectedCount + 1);
    } else {
      setSelectedCount(selectedCount - 1);
    }
  };

  const handleSubmit = () => {
    //get all selected team members
    const selectedTeamMembers: Array<TeamMemberDetails> = teamMember.filter((member) => {
      if (member.selected) {
        delete member.selected;
        return member;
      }
    });
    console.log(selectedTeamMembers); //change this with the submit function from props
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="relative w-full min-w-[64.875rem] max-w-sm rounded-lg bg-white-fa  shadow-[0px_4px_15px_rgba(44,63,88,0.35)]">
        <CloseModalButton onClick={handleClose} />
        <p className="mt-10 text-center w-full text-[1.75rem] font-medium text-grey-700">
          Recognition: {recognitionType === RecognitionType.WOW ? 'WoW' : 'Kudos'}
        </p>
        <div className="mt-[3.38rem] mb-[3.31rem] mx-[3.75rem] bg-white  pl-4 pb-8">
          <p className="w-[40.5rem] text-grey-600 text-sm font-medium leading-snug pt-8">
            {recognitionType === RecognitionType.WOW ? RecognitionSubHeading.WOW : RecognitionSubHeading.KUDOS}
          </p>
          <p className="mt-[1.63rem] text-grey-heading text-lg font-medium">Selected {selectedCount}/{teamMember.length}</p>
          <div className="mt-4 flex items-center flex-wrap gap-7">
            {teamMember?.map((teamMember, index) => (
              <div
                key={index}
                onClick={() => handleSelect(index)}
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
                    className="w-8 h-8"
                  />
                ) : (
                  <img src={ThumbsUp} style={!teamMember.selected ? { mixBlendMode: 'luminosity' } : {}} className="w-8 h-8" />
                )}
                <img src={teamMember.profileImage || defaultAvatar} className="w-9 h-9 rounded-[50%] border-[0.25rem] border-white" />
                <p className="min-w-[7.875rem] text-sm font-normal text-grey-heading">{teamMember.name}</p>
              </div>
            ))}
          </div>
          <PrimaryButton onClick={handleSubmit} className="mt-[1.63rem]">
            Submit
          </PrimaryButton>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

type KudosAndWowModalProps = {
  // onConfirm: () => void;
  recognitionType: string;
  teamMembers: Array<TeamMemberDetails>;
};

export default KudosAndWowModal;
