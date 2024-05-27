/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, CardText } from 'reactstrap';
import { ChevronLeft } from 'react-feather';
import { ActionButtonWrapper } from './style';
import theme from '../../../configs/themeVariables';
import { profilePercentage } from '../../../redux/selectors/dashboardSelectors';
import getTeamId from '../../../utility/commonUtils';
import { userTypes } from '../../../utility/constants/Constant';
import { updateInvitation } from '../../../redux/actions/dashboardActions';
import { inviteTalents } from '../../../redux/actions/inviteTalent';
import { selectAuthUserData } from '../../../redux/selectors/authSelectors';
import SendInvitationModal from '../../modals/SendInvitationModal';
import AcceptRequestModal from '../../modals/AcceptRequestModal';
import CompleteProfileModal from '../../modals/CompleteProfileModal';
import { makeTeamMemberSuccess } from '../../../redux/reducers/profile';
import { getRequestStatusSuccess } from '../../../redux/reducers/inviteTalent';
import InvitationSentModal from '../../modals/InvitationSentModal';
import JoinTeamModal from '../../modals/JoinTeamModal';
import SendClubInvitationModal from '../../modals/SendClubInvitationModal';
import RejectRequestModal from '../../modals/RejectRequestModal';
import AcceptClubInviationModal from '../../modals/AcceptClubInviationModal';
import DeclineClubInvitaionModal from '../../modals/DeclineClubInvitationModal';

const DetailsCTAHeader = ({ isTeamView, data, isClubProfile }) => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();
  const userData = useSelector(selectAuthUserData);
  const isClubAdmin = useSelector((state) => state.inviteTalent.isClubAdmin);

  const [modalInformationText, setModalInformationText] = useState('');
  const teamId = getTeamId('team_id');
  const isEditable = userData?._id === param?.userId;

  const profilePercentageData = useSelector(profilePercentage);
  const inJoinTeamLoading = useSelector((state) => state.inviteTalent.inviteTalentsLoading);
  const requestStatusData = useSelector((state) => state.inviteTalent.getRequestStatus);
  const [selectedTalent, setSelectedTalent] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [sendInviteModal, setSendInviteModal] = useState(null);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [completeProfileModal, setCompleteProfileModal] = useState(null);
  const [accpetModal, setAccpetModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [acceptInvitationModal, setAcceptInvitationModal] = useState(null);
  const [declineInvitationModal, setDeclineInvitationModal] = useState(null);

  const [invitationSentModal, setInvitationSentModal] = useState(null);
  const [openJoinTeamModal, setOpenJoinTeamModal] = useState(false);
  const toggleInvitationSentModal = () => setInvitationSentModal(!invitationSentModal);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleAcceptInvitationModal = () => {
    setAcceptInvitationModal(!acceptInvitationModal);
  };

  const toggleDeclineInvitaionModal = () => {
    setDeclineInvitationModal(!declineInvitationModal);
  };

  const onAccept = () => {
    const postData = {
      action: 'ACCEPT',
      request_id: requestStatusData._id,
    };
    setIsStatusUpdating(true);
    dispatch(
      updateInvitation({
        data: postData,
        onSuccess: () => {
          setIsStatusUpdating(false);
          setAccpetModal(false);
          dispatch(getRequestStatusSuccess(null));
          dispatch(makeTeamMemberSuccess());
        },
        onError: () => {
          setIsStatusUpdating(false);
        },
      }),
    );
  };
  const onReject = () => {
    const postData = {
      action: 'REJECT',
      request_id: requestStatusData._id,
    };
    setIsStatusUpdating(true);
    dispatch(
      updateInvitation({
        data: postData,
        onSuccess: () => {
          setIsStatusUpdating(false);
          setDeclineModal(false);
          dispatch(getRequestStatusSuccess(null));
        },
        onError: () => {
          setIsStatusUpdating(false);
        },
      }),
    );
  };
  const handleAcceptRequest = () => {
    if (
      profilePercentageData?.values_missing?.includes('company_name') ||
      profilePercentageData?.values_missing?.includes('educational_institute') ||
      profilePercentageData?.values_missing?.includes('availability')
    ) {
      setCompleteProfileModal(true);
      setModalInformationText('accept request');
    } else {
      setAccpetModal(true);
    }
  };
  const handleDeclineRequest = () => {
    if (
      profilePercentageData?.values_missing?.includes('company_name') ||
      profilePercentageData?.values_missing?.includes('educational_institute') ||
      profilePercentageData?.values_missing?.includes('availability')
    ) {
      setCompleteProfileModal(true);
      setModalInformationText('decline request');
    } else {
      setDeclineModal(true);
    }
  };

  const toggleCompleteProfileModal = () => {
    setCompleteProfileModal(!completeProfileModal);
  };

  const handleCancel = () => {
    setCompleteProfileModal(false);
    setAccpetModal(false);
    setDeclineModal(false);
  };

  const handleJoinModalCancel = () => {
    setCompleteProfileModal(false);
    setOpenJoinTeamModal(false);
  };

  const sendJoinTeamRequest = () => {
    const newPostData = {
      message: '',
      requests_to: {
        user_ids: [],
        team_ids: [param?.userId],
        email_ids: [],
      },
      request_for: {
        project_id: '',
        team_id: '',
        role: '',
      },
    };
    const onSuccess = () => {
      setOpenJoinTeamModal(false);
    };
    dispatch(inviteTalents({ data: newPostData, onSuccess, isJoinRequest: true }));
  };

  const handleJoinTeam = () => {
    if (
      profilePercentageData?.values_missing?.includes('company_name') ||
      profilePercentageData?.values_missing?.includes('educational_institute') ||
      profilePercentageData?.values_missing?.includes('availability')
    ) {
      setCompleteProfileModal(true);
      setModalInformationText('join team');
    } else {
      setOpenJoinTeamModal(true);
    }
  };

  const toggleSendInviteModal = () => {
    setSendInviteModal(!sendInviteModal);
  };

  const handleInviteTalent = () => {
    setSelectedTalent([data]);
    setSendInviteModal(true);
  };

  return (
    <div className="fixed-head">
      <div className="inner-head">
        <div className="back back-wrap" onClick={handleBack}>
          <span className="chevron-left-bg">
            <ChevronLeft size={22} color={theme.acceptColor} />
          </span>
          <CardText className="back-text">Back</CardText>
        </div>
        <div className="d-flex align-items-center">
          <ActionButtonWrapper>
            <div className="d-flex gap-1 justify-content-center flex-wrap">
              {requestStatusData && !isClubProfile && (
                <span>
                  {!isEditable && teamId && data?.user_type === userTypes.talent && (
                    <Button className="ps-2 pe-2" color="flat-danger" onClick={handleDeclineRequest}>
                      Decline
                    </Button>
                  )}
                  {isTeamView && (
                    <Button className="ps-2 pe-2" color="flat-danger" onClick={handleDeclineRequest}>
                      Decline
                    </Button>
                  )}
                </span>
              )}
              {requestStatusData && !isClubProfile && (
                <span>
                  {!isEditable && teamId && data?.user_type === userTypes.talent && (
                    <Button className="btn-head-padding-25" color="primary" onClick={handleAcceptRequest}>
                      Accept
                    </Button>
                  )}
                  {isTeamView && (
                    <Button className="btn-head-padding-25" color="primary" onClick={handleAcceptRequest}>
                      Accept
                    </Button>
                  )}
                </span>
              )}
              {data.team_type === 'CLUB' && requestStatusData && (
                <div className="d-flex align-items-center">
                  <Button className="ps-2 pe-2" onClick={() => setDeclineInvitationModal(true)} color="flat-danger">
                    Decline
                  </Button>
                  <Button
                    color="primary"
                    className="btn-head-padding-25"
                    onClick={() => setAcceptInvitationModal(true)}
                  >
                    Accept
                  </Button>
                </div>
              )}

              {!requestStatusData &&
                !isEditable &&
                !data?.is_team_member &&
                teamId &&
                data?.user_type === userTypes.talent &&
                userData?.team_type !== userTypes.club && (
                  <Button className="btn-head-padding-25" color="primary" onClick={handleInviteTalent}>
                    Invite
                  </Button>
                )}

              {!data?.is_team_member &&
                userData?.team_type === userTypes.club &&
                isClubAdmin &&
                data?.user_type === userTypes.talent && (
                  <Button className="btn-head-padding-25" color="primary" onClick={handleInviteTalent}>
                    Invite
                  </Button>
                )}
              {!requestStatusData &&
                !data?.is_team_member &&
                isTeamView &&
                !teamId &&
                userData?.user_type === userTypes.talent &&
                !isClubProfile && (
                  <div className="d-flex gap-1 justify-content-center">
                    <Button
                      className="btn-head-padding-25"
                      disabled={inJoinTeamLoading}
                      color="primary"
                      onClick={handleJoinTeam}
                    >
                      Join Team
                    </Button>
                  </div>
                )}
            </div>
          </ActionButtonWrapper>
        </div>
      </div>
      {sendInviteModal && userData?.team_type !== 'CLUB' && (
        <SendInvitationModal
          modal={sendInviteModal}
          toggleModal={toggleSendInviteModal}
          selectedTalents={selectedTalent}
          setInvitationSentModal={setInvitationSentModal}
          message={inputMessage}
          setMessage={setInputMessage}
          description="You are inviting the below to join your team"
        />
      )}

      {sendInviteModal && userData?.team_type === 'CLUB' && (
        <SendClubInvitationModal
          modal={sendInviteModal}
          toggleModal={toggleSendInviteModal}
          selectedTalents={selectedTalent}
          setSelectedTalents={setSelectedTalent}
          setInvitationSentModal={setInvitationSentModal}
          message={inputMessage}
          setMessage={setInputMessage}
          description="You are inviting the below to join your club"
        />
      )}

      {invitationSentModal && (
        <InvitationSentModal
          modal={invitationSentModal}
          toggleModal={toggleInvitationSentModal}
          selectedTalents={selectedTalent}
          message={inputMessage}
          toggleSendInvitationModal={toggleSendInviteModal}
          setSelectedTalents={setSelectedTalent}
          description={`You’ve sent a ${userData?.team_type === 'CLUB' ? 'club' : 'team'} member invitation`}
        />
      )}
      {completeProfileModal && (
        <CompleteProfileModal
          modalInfoText={modalInformationText}
          modal={completeProfileModal}
          toggleModal={toggleCompleteProfileModal}
        />
      )}
      {accpetModal && (
        <AcceptRequestModal
          title={requestStatusData?.request_type}
          isLoading={isStatusUpdating}
          data={requestStatusData}
          onAccept={onAccept}
          modal={accpetModal}
          toggleModal={handleCancel}
        />
      )}
      {declineModal && (
        <RejectRequestModal
          title={requestStatusData?.request_type}
          isLoading={isStatusUpdating}
          data={requestStatusData}
          onReject={onReject}
          modal={declineModal}
          toggleModal={handleCancel}
        />
      )}
      {openJoinTeamModal && (
        <JoinTeamModal
          isLoading={inJoinTeamLoading}
          data={data}
          title="Join Team"
          toggleModal={handleJoinModalCancel}
          modal={openJoinTeamModal}
          onAccept={sendJoinTeamRequest}
        />
      )}
      {acceptInvitationModal && (
        <AcceptClubInviationModal
          modal={acceptInvitationModal}
          toggleModal={toggleAcceptInvitationModal}
          description="You’ve accepted club invitation"
          selectedTalents={[data]}
          onAccept={onAccept}
          onLoading={isStatusUpdating}
        />
      )}

      {declineInvitationModal && (
        <DeclineClubInvitaionModal
          modal={declineInvitationModal}
          toggleModal={toggleDeclineInvitaionModal}
          data={data}
          onDecline={onDecline}
          onLoading={isStatusUpdating}
        />
      )}
    </div>
  );
};

DetailsCTAHeader.propTypes = {
  data: PropTypes.object,
  isTeamView: PropTypes.bool,
  isClubProfile: PropTypes.bool,
};
DetailsCTAHeader.defaultProps = {
  data: {},
  isTeamView: false,
  isClubProfile: false,
};

export default DetailsCTAHeader;
