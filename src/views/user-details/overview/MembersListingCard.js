import React from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import UserNameRoleCompanyComp from '../../../@core/components/username-role-company';
import { TeamSectionWrapper } from '../../dashboard/overview/style';
import { getPublicTeamMembers } from '../../../redux/actions/profileActions';
import { publicTeamMembers, publicTeamMembersLoading } from '../../../redux/selectors/profileSelectors';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';

const MembersListingCard = ({ toggleModal, teamId, publicTeamMembersListingModal, isClubView }) => {
  const dispatch = useDispatch();

  const publicTeamMembersData = useSelector(publicTeamMembers);
  const publicTeamMembersIsLoading = useSelector(publicTeamMembersLoading);

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

  return (
    <TeamSectionWrapper>
      <Card>
        <CardHeader className="earning-head">
          <CardTitle tag="h6">
            {isClubView ? 'Club' : 'Team'}
            <span className="members-count">{publicTeamMembersData?.metadata?.total_records} Members</span>
          </CardTitle>
          <CardText onClick={toggleModal} className="cursor-pointer card-text font-small-3 me-25 mb-0 text-primary">
            View All
          </CardText>
        </CardHeader>
        <CardBody>
          <div id="scrollableDivTeamMember" style={{ maxHeight: '21.5rem', overflowY: 'auto' }}>
            {!publicTeamMembersListingModal && publicTeamMembersIsLoading ? (
              <ComponentSpinner className="mb-3" />
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
                scrollableTarget="scrollableDivTeamMember"
                loader={<div className="d-flex justify-content-center">Loading...</div>}
              >
                {publicTeamMembersData?.data?.map((user) => (
                  <UserNameRoleCompanyComp key={user?._id} data={user} />
                ))}
              </InfiniteScroll>
            )}
          </div>
        </CardBody>
      </Card>
    </TeamSectionWrapper>
  );
};

MembersListingCard.propTypes = {
  toggleModal: Proptypes.func,
  teamId: Proptypes.string,
  publicTeamMembersListingModal: Proptypes.bool,
  isClubView: Proptypes.bool,
};
MembersListingCard.defaultProps = {
  toggleModal: () => {},
  teamId: '',
  publicTeamMembersListingModal: false,
  isClubView: false,
};

export default MembersListingCard;
