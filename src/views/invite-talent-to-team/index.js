import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SendInvitationModal from '../modals/SendInvitationModal';
import InvitationSentModal from '../modals/InvitationSentModal';
import InviteTeamMemberModal from '../modals/InviteTeamMemberModal';

const InviteTalentToTeam = ({ inviteTeamMemberModal, toggleInviteTeamMemberModal }) => {
  const [selectedTalents, setSelectedTalents] = useState([]);
  const [invitedIds, setInvitedIds] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  //   const userDetailsData = useSelector(selectUserData);
  const [message, setMessage] = useState('');
  const [sendInvitationModal, setSendInvitationModal] = useState(false);
  const [invitationSentModal, setInvitationSentModal] = useState(false);

  const toggleSendInvitationModal = () => {
    setSendInvitationModal(!sendInvitationModal);
  };

  const toggleInvitationSentModal = () => {
    setInvitationSentModal(!invitationSentModal);
  };
  //   const onTeamInvite = () => {
  //     setInviteTeamMemberModal(true);
  //   };

  return (
    <>
      {inviteTeamMemberModal && (
        <InviteTeamMemberModal
          selectedTalents={selectedTalents}
          setSelectedTalents={setSelectedTalents}
          invitedIds={invitedIds}
          setInvitedIds={setInvitedIds}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          modal={inviteTeamMemberModal}
          toggleModal={toggleInviteTeamMemberModal}
          setSendInvitationModal={setSendInvitationModal}
        />
      )}
      {sendInvitationModal && (
        <SendInvitationModal
          modal={sendInvitationModal}
          toggleModal={toggleSendInvitationModal}
          selectedTalents={selectedTalents}
          setInvitationSentModal={setInvitationSentModal}
          message={message}
          setMessage={setMessage}
          description="You are inviting the below to join your team."
        />
      )}
      {invitationSentModal && (
        <InvitationSentModal
          modal={invitationSentModal}
          toggleModal={toggleInvitationSentModal}
          selectedTalents={selectedTalents}
          projectId=""
          message={message}
          toggleSendInvitationModal={toggleSendInvitationModal}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          invitedIds={invitedIds}
          setInvitedIds={setInvitedIds}
          setSelectedTalents={setSelectedTalents}
          description="You’ve sent a team member invitation"
        />
      )}
    </>
  );
};
InviteTalentToTeam.propTypes = {
  inviteTeamMemberModal: PropTypes.bool,
  toggleInviteTeamMemberModal: PropTypes.func,
};
InviteTalentToTeam.defaultProps = {
  inviteTeamMemberModal: false,
  toggleInviteTeamMemberModal: () => {},
};
export default InviteTalentToTeam;
