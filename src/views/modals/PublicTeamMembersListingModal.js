import React, { useEffect } from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Modal, ModalHeader, ModalBody, Card, CardBody, Row, Col } from 'reactstrap';
import { MessageSquare, Star } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@components/avatar';
import InfiniteScroll from 'react-infinite-scroll-component';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import DateTime from '../../lib/date-time';
import Rating from '../../lib/rating';
import { GrayBorderContainer } from '../styled';
import theme from '../../configs/themeVariables';
import { PublicTeamMembersListingModalWrapper } from './style';
import { selectSavedUserData } from '../../redux/selectors/authSelectors';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import { getPublicTeamMembers } from '../../redux/actions/profileActions';
import { publicTeamMembers, publicTeamMembersLoading } from '../../redux/selectors/profileSelectors';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';

const TeamMembersComponent = ({ teamId, isClubView }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const savedUserData = useSelector(selectSavedUserData);
  const publicTeamMembersData = useSelector(publicTeamMembers);
  const publicTeamMembersIsLoading = useSelector(publicTeamMembersLoading);

  useEffect(() => {
    dispatch(getPublicTeamMembers({ teamId, page: 1, pageSize: 10, oldData: [] }));
  }, []);

  const loadNewMembers = () => {
    dispatch(
      getPublicTeamMembers({
        teamId,
        // eslint-disable-next-line no-unsafe-optional-chaining
        page: publicTeamMembersData?.metadata?.current_page + 1,
        pageSize: 10,
        oldData: publicTeamMembersData?.data,
      }),
    );
  };

  const onMessageClick = (userId) => {
    navigate(`/chat`, {
      state: { targetId: userId },
    });
  };

  return (
    <PublicTeamMembersListingModalWrapper>
      <GrayBorderContainer className="d-flex justify-content-between px-2 py-1">
        <h3 className="font-medium-4">
          {isClubView ? 'Club Member' : 'Team Member'}
          <span className="ms-2 font-small-4 members-count-text fw-normal">
            {publicTeamMembersData?.metadata?.total_records} Members
          </span>
        </h3>
      </GrayBorderContainer>
      <Card
        className="px-2 py-50 m-2"
        id="scrollableDivTeamMemberModal"
        style={{ maxHeight: '33rem', overflowY: 'auto' }}
      >
        {publicTeamMembersIsLoading ? (
          <ComponentSpinner />
        ) : (
          <InfiniteScroll
            dataLength={publicTeamMembersData?.data?.length || 0}
            next={loadNewMembers}
            hasMore={publicTeamMembersData?.metadata?.has_next_page}
            endMessage={
              <div className="d-flex justify-content-center ">
                {publicTeamMembersData?.data?.length === 0 ? <span className="mt-2">No data found!</span> : ''}
              </div>
            }
            scrollableTarget="scrollableDivTeamMemberModal"
            loader={<div className="d-flex justify-content-center">Loading...</div>}
          >
            {publicTeamMembersData?.data?.map((item) => (
              <Card key={item?.user_id} className="custom-card mx-1 my-2">
                <CardBody className="py-1">
                  <Row className="d-flex align-items-center">
                    <Col sm="12" md="3" lg="5">
                      <Link
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        to={`/profile/talent/${item?.user_id}`}
                        target="_blank"
                      >
                        <div className="d-flex align-items-center">
                          <Avatar
                            img={item?.image_uri || defaultAvatar}
                            imgHeight="38"
                            imgWidth="38"
                            className="me-1 user-pic"
                          />
                          <div>
                            <p className="fw-bolder m-0">
                              {item?.first_name} {item?.last_name}
                            </p>
                            <p className="font-small-3 m-0">{item?.role}</p>
                          </div>
                        </div>
                      </Link>
                    </Col>
                    <Col sm="12" md="3" lg="3">
                      <div>
                        <Rating
                          readonly
                          initialRating={item?.rating}
                          emptySymbol={
                            <Star size={18} fill={theme.white} stroke={theme.orangeColor} className="me-25" />
                          }
                          fullSymbol={
                            <Star size={18} fill={theme.orangeColor} stroke={theme.orangeColor} className="me-25" />
                          }
                          className="mb-50"
                        />
                        <div className="d-flex align-items-center">
                          <RatingBadge number={item?.rating} />
                          <p className="mb-0 ms-50 font-small-3 reviews-count-text">({item?.reviews_count} Reviews)</p>
                        </div>
                      </div>
                    </Col>
                    <Col sm="12" md="3" lg="3">
                      <p className="m-0 reviews-count-text">Member since</p>
                      <p className="fw-bold font-medium-2 m-0">
                        {DateTime.fromMillis(item?.member_since).toFormat('MMM dd, yy') || '-'}
                      </p>
                    </Col>
                    <Col sm="12" md="1" lg="1">
                      {savedUserData?._id !== item?.user_id && (
                        <div className="d-flex justify-content-end">
                          <div className="message-icon-bg d-flex justify-content-center align-items-center cursor-pointer">
                            <MessageSquare onClick={() => onMessageClick(item?.user_id)} color={theme.primary} />
                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            ))}
          </InfiniteScroll>
        )}
      </Card>
    </PublicTeamMembersListingModalWrapper>
  );
};

TeamMembersComponent.propTypes = {
  teamId: Proptypes.string,
  isClubView: Proptypes.bool,
};

TeamMembersComponent.defaultProps = {
  teamId: '',
  isClubView: false,
};

const PublicTeamMembersListingModal = ({ modal, toggleModal, teamId, isClubView }) => (
  <div>
    <Modal isOpen={modal} contentClassName="listing-team-members-modal-style" className="modal-dialog-centered">
      <div className="gray-modal">
        <ModalHeader className="py-0" toggle={toggleModal} />
        <ModalBody className="p-0">
          <div style={{ maxHeight: '40rem' }}>
            <TeamMembersComponent teamId={teamId} isClubView={isClubView} />
          </div>
        </ModalBody>
      </div>
    </Modal>
  </div>
);

export default PublicTeamMembersListingModal;

PublicTeamMembersListingModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  teamId: Proptypes.string,
  isClubView: Proptypes.bool,
};

PublicTeamMembersListingModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  teamId: '',
  isClubView: false,
};
