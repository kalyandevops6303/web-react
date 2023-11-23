import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { TeamSectionWrapper } from './style';
import UserNameRoleCompanyComp from '../../../@core/components/username-role-company';
import { getTeamMembers } from '../../../redux/actions/dashboardActions';
import { selectGetTeamMember } from '../../../redux/selectors/dashboardSelectors';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import { clubStatus } from '../../../utility/constants/Constant';

const ClubSection = ({ toggleModal }) => {
  const teamMembers = useSelector(selectGetTeamMember);
  const userDetailsData = useSelector(selectUserData);

  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();
  const selectTeamMembersMetadata = useSelector((state) => state.dashboard.getMemberMetaData);
  const selectTeamMembercurrentPreview = useSelector((state) => state.dashboard.memberCurrentPreview);
  const metadata = { page: 1, page_size: 10 };

  const isDisabled = userDetailsData?.club_status === clubStatus.IN_REVIEW;

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
  return (
    <TeamSectionWrapper>
      <Card>
        <CardHeader className="earning-head">
          <CardTitle tag="h6">
            Club <span className="members-count">{selectTeamMembersMetadata?.total_records} Members</span>
          </CardTitle>
          <CardText
            onClick={toggleModal}
            className={` text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary ${
              isDisabled ? 'text-muted cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            View All
          </CardText>
        </CardHeader>
        <CardBody>
          <div id="scrollableDivTeamMember" style={{ maxHeight: '18rem', overflowY: 'auto' }}>
            <InfiniteScroll
              dataLength={teamMembers?.length}
              next={fetchMore}
              hasMore={hasMore}
              endMessage={
                <div className="d-flex justify-content-center ">
                  {teamMembers?.length === 0 ? <span className="mt-2">No data found!</span> : ''}
                </div>
              }
              scrollableTarget="scrollableDivTeamMember"
              loader={<div className="d-flex justify-content-center">Loading...</div>}
            >
              {teamMembers?.map((user) => (
                <UserNameRoleCompanyComp key={user?._id} data={user} />
              ))}
            </InfiniteScroll>
          </div>
        </CardBody>
      </Card>
    </TeamSectionWrapper>
  );
};

ClubSection.propTypes = {
  toggleModal: Proptypes.func,
};
ClubSection.defaultProps = {
  toggleModal: () => {},
};

export default ClubSection;
