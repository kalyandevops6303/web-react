import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SendInvitationModal from '../modals/SendInvitationModal';
import SendClubInvitationModal from '../modals/SendClubInvitationModal';
import InvitationSentModal from '../modals/InvitationSentModal';
import InviteTeamMemberModal from '../modals/InviteTeamMemberModal';
import ShareInviteModal from '../modals/ShareInviteModal';
import InviteClubMemberModal from '../modals/InviteClubMemberModal';

const InviteTalentToTeam = ({
  createTeamView,
  projectId,
  inviteRole,
  inviteTeamMemberModal,
  toggleInviteTeamMemberModal,
  isClubInvitation,
}) => {
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
      {inviteTeamMemberModal && !isClubInvitation && (
        <InviteTeamMemberModal
          createTeamView={createTeamView}
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
      {inviteTeamMemberModal && isClubInvitation && (
        <InviteClubMemberModal
          createTeamView={createTeamView}
          projectId={projectId}
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

      {sendInvitationModal && !isClubInvitation && (
        <SendInvitationModal
          createTeamView={createTeamView}
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
      {sendInvitationModal && isClubInvitation && (
        <SendClubInvitationModal
          createTeamView={createTeamView}
          projectId={projectId}
          inviteRole={inviteRole}
          modal={sendInvitationModal}
          toggleModal={toggleSendInvitationModal}
          selectedTalents={selectedTalents}
          setSelectedTalents={setSelectedTalents}
          setInvitationSentModal={setInvitationSentModal}
          message={message}
          setMessage={setMessage}
          description="You are inviting the below to join your club."
        />
      )}
      {invitationSentModal && (
        <InvitationSentModal
          createTeamView={createTeamView}
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
          createTeamView={createTeamView}
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
  isClubInvitation: PropTypes.bool,
  toggleInviteTeamMemberModal: PropTypes.func,
  projectId: PropTypes.string,
  inviteRole: PropTypes.string,
  createTeamView: PropTypes.bool,
};
InviteTalentToTeam.defaultProps = {
  inviteTeamMemberModal: false,
  toggleInviteTeamMemberModal: () => {},
  projectId: '',
  inviteRole: '',
  createTeamView: false,
  isClubInvitation: false,
};
export default InviteTalentToTeam;
