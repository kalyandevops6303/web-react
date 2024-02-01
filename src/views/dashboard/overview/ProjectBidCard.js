import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { ProjectWrapper } from './style';
import DateTime from '../../../lib/date-time';
import RelistConfirmationModal from '../../modals/RelistConfirmationModal';

const ProjectBidCard = ({ data, className }) => {
  const navigate = useNavigate();

  const [relistConfirmationModal, setRelistConfirmationModal] = useState(null);

  const toggleRelistConfirmationModal = () => setRelistConfirmationModal(!relistConfirmationModal);

  // eslint-disable-next-line no-unused-vars
  const viewDetails = () => {
    navigate(`/project-details/${data._id}/bid`);
  };

  return (
    <ProjectWrapper className={className}>
      {relistConfirmationModal && (
        <RelistConfirmationModal modal={relistConfirmationModal} toggleModal={toggleRelistConfirmationModal} />
      )}
      <Card className="card-app-design">
        <CardBody>
          <CardTitle className="active-project-title truncate-2 mb-1.5">{data?.name}</CardTitle>
          <div className="bottom-detail d-flex mt-1 align-items-center">
            {/* <div className="design-planning-wrapper mb-0 w-50">
              <div className="design-planning mb-0">
                <CardText className="mb-25">Posted Date</CardText>
                <h6 className="mb-0">{`${DateTime.fromMillis(data?.created_at).toFormat('MMM dd, yy') || '-'}`}</h6>
              </div>
            </div> */}
            <div className="design-planning-wrapper mb-0 w-50">
              <div className="design-planning mb-0">
                <CardText className="mb-25 expired-listing-text">Expired Date</CardText>
                <h6 className="mb-0 expired-listing-text">{`${
                  DateTime.fromMillis(data?.created_at).toFormat('MMM dd, yy') || '-'
                }`}</h6>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center bids-count-wrapper w-50">
              <p className="mb-0 text-center bid-label">Bids</p>
              <p className="mb-0 text-center bid-count">{data?.total_bids}</p>
            </div>
          </div>
          {/* <div
            onClick={viewDetails}
            className="cursor-pointer font-weight-normal text-center text-primary project-cta mt-1"
          >
            View Details
          </div> */}
          <div
            onClick={() => setRelistConfirmationModal(true)}
            className="cursor-pointer font-weight-normal text-center text-primary project-cta mt-1"
          >
            Re-list
          </div>
        </CardBody>
      </Card>
    </ProjectWrapper>
  );
};

export default ProjectBidCard;

ProjectBidCard.propTypes = {
  data: Proptypes.object,
  className: Proptypes.string,
};

ProjectBidCard.defaultProps = {
  data: {},
  className: '',
};
