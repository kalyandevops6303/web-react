import React, { useEffect, useState } from 'react';
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
import { getTeamMembers } from '../../redux/actions/dashboardActions';
import { selectGetTeamMember } from '../../redux/selectors/dashboardSelectors';
import { PublicTeamMembersListingModalWrapper } from './style';
import { userTypes } from '../../utility/constants/Constant';
import { selectAuthUserData, selectSavedUserData } from '../../redux/selectors/authSelectors';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';

const TeamMembersComponent = () => {
  const navigate = useNavigate();

  const teamMembers = useSelector(selectGetTeamMember);
  const userDetailsData = useSelector(selectAuthUserData);
  const savedUserData = useSelector(selectSavedUserData);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const selectTeamMembersMetadata = useSelector((state) => state.dashboard.getMemberMetaData);
  const selectTeamMembercurrentPreview = useSelector((state) => state.dashboard.memberCurrentPreview);
  const metadata = { page: 1, page_size: 10 };

  const isClubView = userDetailsData?.team_type === userTypes.club;

  useEffect(() => {
    setHasMore(true);
    if (
      selectTeamMembercurrentPreview?.length === 0 ||
      teamMembers?.length === selectTeamMembersMetadata?.total_records
    ) {
      setHasMore(false);
    }
  }, [selectTeamMembercurrentPreview]);

  useEffect(() => {
    dispatch(getTeamMembers({ metadata }));
  }, []);

  const fetchMore = () => {
    const newMeteData = {
      ...metadata,
      // eslint-disable-next-line no-unsafe-optional-chaining
      page: selectTeamMembersMetadata?.current_page + 1 || 1,
    };
    dispatch(getTeamMembers({ metadata: newMeteData }));
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
            {selectTeamMembersMetadata?.total_records} Members
          </span>
        </h3>
      </GrayBorderContainer>
      <Card
        className="px-2 py-50 m-2"
        id="scrollableDivTeamMemberModal"
        style={{ maxHeight: '33rem', overflowY: 'auto' }}
      >
        <InfiniteScroll
          dataLength={teamMembers?.length}
          next={fetchMore}
          hasMore={hasMore}
          endMessage={
            <div className="d-flex justify-content-center ">
              {teamMembers?.length === 0 ? <span className="mt-2">No data found!</span> : ''}
            </div>
          }
          scrollableTarget="scrollableDivTeamMemberModal"
          loader={<div className="d-flex justify-content-center">Loading...</div>}
        >
          {teamMembers?.map((item) => (
            <Card key={item?._id} className="custom-card mx-1 my-2">
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
                          <p className="font-small-3 m-0">{item?.role?.name}</p>
                        </div>
                      </div>
                    </Link>
                  </Col>
                  <Col sm="12" md="3" lg="3">
                    <div>
                      <Rating
                        readonly
                        initialRating={3.5}
                        emptySymbol={<Star size={18} fill={theme.white} stroke={theme.orangeColor} className="me-25" />}
                        fullSymbol={
                          <Star size={18} fill={theme.orangeColor} stroke={theme.orangeColor} className="me-25" />
                        }
                        className="mb-50"
                      />
                      <div className="d-flex align-items-center">
                        <RatingBadge number={3.8} />
                        <p className="mb-0 ms-50 font-small-3 reviews-count-text">(7 Reviews)</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12" md="3" lg="3">
                    <p className="m-0 reviews-count-text">Member since</p>
                    <p className="fw-bold font-medium-2 m-0">
                      {DateTime.fromMillis(item?.created_at).toFormat('MMM dd, yy') || '-'}
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
      </Card>
    </PublicTeamMembersListingModalWrapper>
  );
};

const PublicTeamMembersListingModal = ({ modal, toggleModal }) => (
  <div>
    <Modal isOpen={modal} contentClassName="listing-team-members-modal-style" className="modal-dialog-centered">
      <div className="gray-modal">
        <ModalHeader className="py-0" toggle={toggleModal} />
        <ModalBody className="p-0">
          <div style={{ maxHeight: '40rem' }}>
            <TeamMembersComponent />
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
};

PublicTeamMembersListingModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
