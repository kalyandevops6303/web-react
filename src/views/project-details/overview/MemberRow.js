import { useState } from 'react';
import Rating from 'react-rating';
import Proptypes from 'prop-types';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import Avatar from '@components/avatar';
import FilledStar from '@src/assets/images/filler_star.png';
import EmptyStar from '@src/assets/images/empty_star.png';
import { Card, CardBody, CardText } from 'reactstrap';
import { Mail, Trash2 } from 'react-feather';
import { useSelector } from 'react-redux';
import { MemberRowWrapper } from '../style';
import theme from '../../../configs/themeVariables';
import RemoveProjectTeamMemberModal from '../../modals/RemoveProjectTeamMemberModal';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';
import getTeamId from '../../../utility/commonUtils';
import { userTypes } from '../../../utility/constants/Constant';
import { selectSavedUserData, selectUserData } from '../../../redux/selectors/authSelectors';
import { convertUnixTimestampToDate } from '../../../utility/Utils';

const MemberRow = ({ hasDeleleteAccess, data, withReview, teamMembersCount }) => {
  const [removeProjectTeamMemberModal, setRemoveProjectTeamMemberModal] = useState(null);
  const projectDetailsData = useSelector(projectDetails);
  const isClubAdmin = useSelector((state) => state.inviteTalent.isClubAdmin);
  const userDetailsData = useSelector(selectUserData);
  const savedUserData = useSelector(selectSavedUserData);
  const isClubView = userDetailsData?.team_type === userTypes.club;

  const teamId = getTeamId('team_id');
  const toggleRemoveProjectTeamMemberModal = () => {
    setRemoveProjectTeamMemberModal(!removeProjectTeamMemberModal);
  };

  return (
    <MemberRowWrapper withReview={withReview}>
      {removeProjectTeamMemberModal && (
        <RemoveProjectTeamMemberModal
          modal={removeProjectTeamMemberModal}
          toggleModal={toggleRemoveProjectTeamMemberModal}
          data={data}
        />
      )}
      <Card>
        <CardBody>
          <section className="d-flex justify-content-between">
            <div className="d-flex align-items-center gap-1">
              <div className="name-info d-flex gap-50 align-items-center">
                <Avatar img={data?.image_uri || defaultAvatar} imgHeight="38" imgWidth="38" />
                <div className="ms-50">
                  <h6 className="mb-0 fw-bolder">
                    {data?.first_name} {data?.last_name}
                  </h6>
                  {!withReview && <span className="mb-50 font-small-2 role">{data.role}</span>}
                </div>
              </div>
              <CardText className="d-none fw-bold m-auto me-4">
                {withReview ? data?.role?.name : 'Team Member'}
              </CardText>

              <div className="me-4">
                <Rating
                  initialRating={data?.rating || 0}
                  emptySymbol={<img height={20} src={EmptyStar} alt="Empty star" />}
                  fullSymbol={<img height={20} src={FilledStar} alt="Filled star" />}
                  readonly
                />
                <CardText className="mt-25 font-small-3 project-count">
                  {data?.projects_worked_on_count || 0} Projects
                </CardText>
              </div>

              <div className="me-2">
                <span className="key">Accepted on</span>
                <CardText className="value">
                  {data?.accepted_date ? convertUnixTimestampToDate(data?.accepted_date, savedUserData?.availability?.timezone?.name ) : '-'}
                </CardText>
              </div>
              <div className="me-1 d-none">
                <span className="key">Status</span>
                <CardText className="value">-</CardText>
              </div>
            </div>
            {withReview && (
              <span className="mail-bg">
                <Mail size={20} className="mail-icon" color={theme.activeColor} />
              </span>
            )}
            {(projectDetailsData?.status === 'OPEN' || projectDetailsData?.status === 'IN_REVIEW') &&
              teamMembersCount > 1 &&
              hasDeleleteAccess &&
              teamId &&
              (!isClubView || (isClubView && isClubAdmin)) && (
                <Trash2
                  className="delete-icon cursor-pointer"
                  color={theme.red}
                  onClick={() => setRemoveProjectTeamMemberModal(true)}
                />
              )}
          </section>
        </CardBody>
      </Card>
    </MemberRowWrapper>
  );
};
MemberRow.propTypes = {
  data: Proptypes.object,
  withReview: Proptypes.bool,
  hasDeleleteAccess: Proptypes.bool,
  teamMembersCount: Proptypes.number,
};
MemberRow.defaultProps = {
  data: {},
  withReview: false,
  hasDeleleteAccess: false,
  teamMembersCount: 0,
};
export default MemberRow;