/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { useParams } from 'react-router';
import { capitalize } from 'lodash';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { GrayBorderContainer, GrayCardWrapper } from '../styled';
import InfoIcon from '../../assets/images/timeline-info-icon.png';
import { updateInvitation } from '../../redux/actions/dashboardActions';
import { getItem, setItem } from '../../utility/localStorageControl';
import { selectUserData } from '../../redux/selectors/authSelectors';
import { getWhoInvited } from '../../redux/actions/teamsActions';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';

const TeamInvitation = () => {
  const breadCrumb = [{ title: 'Dashboard' }, { title: `Team Name` || 'User', link: '#' }];
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const inviteToken = getItem('inviteToken');
  const params = useParams();
  const [invitedByData, setInvitedByData] = useState('');
  const [status, setStatus] = useState(invitedByData?.invitation_status);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [isGetWhoInvitedLoading, setGetWhoInvitedLoading] = useState(false);

  useEffect(() => {
    setItem('isInviteRead', true);
  }, []);

  const onSuccess = (res) => {
    setInvitedByData(res);
    setGetWhoInvitedLoading(false);
    setStatus(res?.invitation_status);
  };

  const onError = () => {
    setGetWhoInvitedLoading(false);
  };
  useEffect(() => {
    setGetWhoInvitedLoading(true);
    dispatch(getWhoInvited({ id: params.inviteId, onSuccess, onError }));
  }, []);

  const handleAccept = () => {
    const data = {
      token: inviteToken ? getItem('inviteToken') : '',
      status: 'ACCEPTED',
      user_id: userData?._id,
    };
    setIsStatusUpdating(true);
    dispatch(
      updateInvitation({
        data,
        onSuccess: () => {
          setStatus('ACCEPTED');
          setIsStatusUpdating(false);
        },
        onError: () => {
          setIsStatusUpdating(false);
        },
      }),
    );
  };
  const handleDecline = () => {
    const data = {
      token: inviteToken ? getItem('inviteToken') : '',
      status: 'DECLINED',
      user_id: userData?._id,
    };
    dispatch(
      updateInvitation({
        data,
        onSuccess: () => {
          setStatus('DECLINED');
          setIsStatusUpdating(false);
        },
        onError: () => {
          setIsStatusUpdating(false);
        },
      }),
    );
  };
  if (isGetWhoInvitedLoading) {
    <ComponentSpinner />;
  }

  return (
    <>
      <BreadCrumbs data={breadCrumb} />
      <Row>
        <Col sm="12" md="12" lg="10">
          <GrayCardWrapper>
            <Card>
              <CardHeader className="p-0">
                <GrayBorderContainer className="w-100 px-2 pt-2 pb-1">
                  <h4 className="m-0">Team Acceptance</h4>
                </GrayBorderContainer>
              </CardHeader>
              <CardBody>
                <div className="d-flex mt-2 align-items-start">
                  <img src={InfoIcon} alt="info" className="mt-2 me-1" />
                  <Card className="white-card-bg w-100">
                    <CardBody>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mt-1">Invite</h5>
                        {isStatusUpdating ? (
                          'Loading..'
                        ) : status === 'PENDING' ? (
                          <div className="d-flex text-blue text-decoration-underline">
                            <p className="me-2 cursor-pointer mb-0" onClick={handleDecline}>
                              Decline
                            </p>
                            <p className="cursor-pointer mb-0" onClick={handleAccept}>
                              Accept
                            </p>
                          </div>
                        ) : (
                          status && capitalize(status)
                        )}
                      </div>
                      <h5 className="mt-2 pt-50 font-small-4 mb-0">Invite Sent</h5>
                      <p className="font-small-4">
                        {invitedByData?.created_at
                          ? DateTime.fromMillis(invitedByData?.created_at).toFormat('MMM dd, yy')
                          : '-'}
                      </p>
                      <div className="d-flex align-items-center">
                        <Avatar
                          img={invitedByData?.invitation_by?.image_uri || defaultAvatar}
                          imgHeight="38"
                          imgWidth="38"
                          className="me-50 user-pic"
                        />
                        <div>
                          <p className="fw-bolder m-0">
                            {invitedByData?.invitation_by?.first_name} {invitedByData?.invitation_by?.last_name} (Team
                            Member)
                          </p>
                          <p className="m-0">{invitedByData?.role?.name || 'Role'} </p>
                        </div>
                      </div>
                      {invitedByData?.invitation_message && (
                        <>
                          <p className="fw-bolder mt-2 mb-0">Message</p>
                          <div className="w-75">
                            <p className="font-small-3 w-50">{invitedByData?.invitation_message} </p>
                          </div>
                        </>
                      )}
                    </CardBody>
                  </Card>
                </div>
              </CardBody>
            </Card>
          </GrayCardWrapper>
        </Col>
      </Row>
    </>
  );
};

export default TeamInvitation;
