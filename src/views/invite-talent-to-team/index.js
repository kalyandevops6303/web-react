import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SendInvitationModal from '../modals/SendInvitationModal';
import InvitationSentModal from '../modals/InvitationSentModal';
import InviteTeamMemberModal from '../modals/InviteTeamMemberModal';
import ShareInviteModal from '../modals/ShareInviteModal';

const InviteTalentToTeam = ({ projectId, inviteRole, inviteTeamMemberModal, toggleInviteTeamMemberModal }) => {
  const [selectedTalents, setSelectedTalents] = useState([]);
  const [invitedIds, setInvitedIds] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [shareModal, setShareModal] = useState(false);
  const [message, setMessage] = useState('');
  const [sendInvitationModal, setSendInvitationModal] = useState(false);
  const [invitationSentModal, setInvitationSentModal] = useState(false);

  const toggleSendInvitationModal = () => {
    setSendInvitationModal(!sendInvitationModal);
  };

  const toggleInvitationSentModal = () => {
    setInvitationSentModal(!invitationSentModal);
  };

  const toggleInviteModal = () => {
    setShareModal(!shareModal);
  };
  return (
    <>
      {inviteTeamMemberModal && (
        <InviteTeamMemberModal
          inviteRole={inviteRole}
          projectId={projectId}
          selectedTalents={selectedTalents}
          setSelectedTalents={setSelectedTalents}
          invitedIds={invitedIds}
          setInvitedIds={setInvitedIds}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          modal={inviteTeamMemberModal}
          toggleInviteShareModal={toggleInviteModal}
          toggleModal={toggleInviteTeamMemberModal}
          setSendInvitationModal={setSendInvitationModal}
        />
      )}
      {sendInvitationModal && (
        <SendInvitationModal
          projectId={projectId}
          inviteRole={inviteRole}
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
          projectId={projectId}
          inviteRole={inviteRole}
          modal={invitationSentModal}
          toggleModal={toggleInvitationSentModal}
          selectedTalents={selectedTalents}
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
      {shareModal && (
        <ShareInviteModal
          projectId={projectId}
          inviteRole={inviteRole}
          modal={shareModal}
          toggleModal={toggleInviteModal}
        />
      )}
    </>
  );
};
InviteTalentToTeam.propTypes = {
  inviteTeamMemberModal: PropTypes.bool,
  toggleInviteTeamMemberModal: PropTypes.func,
  projectId: PropTypes.string,
  inviteRole: PropTypes.string,
};
InviteTalentToTeam.defaultProps = {
  inviteTeamMemberModal: false,
  toggleInviteTeamMemberModal: () => {},
  projectId: '',
  inviteRole: '',
};
export default InviteTalentToTeam;
