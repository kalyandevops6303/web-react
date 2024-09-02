import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { ProjectWrapper } from './style';
import NewTag from '../../../@core/components/new-tag';
import { updateCardStatus } from '../../../redux/actions/dashboardActions';
import RelistConfirmationModal from '../../modals/RelistConfirmationModal';
import RelistListingDetailsModal from '../../modals/RelistListingDetailsModal';
import RelistSuccessModal from '../../modals/RelistSuccessModal';
import { convertUnixTimestampToDate } from '../../../utility/Utils';
import { selectSavedUserData } from '../../../redux/selectors/authSelectors';

const ProjectBidCard = ({ accordionName, data, className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateCard = () => {
    const postData = {
      metadata: {
        project_id: data._id,
      },
      type: accordionName,
    };
    dispatch(updateCardStatus({ data: postData }));
  };

  const [relistConfirmationModal, setRelistConfirmationModal] = useState(null);
  const [relistListingDetailsModal, setRelistListingDetailsModal] = useState(null);
  const [relistSuccessModal, setRelistSuccessModal] = useState(null);
  const [projectRelistData, setProjectRelistData] = useState(null);
  const savedUserData = useSelector(selectSavedUserData);

  const toggleRelistConfirmationModal = () => setRelistConfirmationModal(!relistConfirmationModal);

  const toggleRelistListingDetailsModal = () => setRelistListingDetailsModal(!relistListingDetailsModal);

  const toggleRelistSuccessModal = () => setRelistSuccessModal(!relistSuccessModal);

  // eslint-disable-next-line no-unused-vars
  const viewDetails = () => {
    if (data?.is_read === false) {
      updateCard();
    }
    navigate(`/project-details/${data._id}/bid`);
  };

  useEffect(() => {
    setProjectRelistData({
      id: data?._id,
      name: data?.name,
    });
  }, []);

  return (
    <ProjectWrapper className={className}>
      {relistConfirmationModal && (
        <RelistConfirmationModal
          modal={relistConfirmationModal}
          toggleModal={toggleRelistConfirmationModal}
          setRelistListingDetailsModal={setRelistListingDetailsModal}
        />
      )}
      {relistListingDetailsModal && (
        <RelistListingDetailsModal
          modal={relistListingDetailsModal}
          toggleModal={toggleRelistListingDetailsModal}
          setRelistConfirmationModal={setRelistConfirmationModal}
          setRelistSuccessModal={setRelistSuccessModal}
          projectRelistData={projectRelistData}
          setProjectRelistData={setProjectRelistData}
        />
      )}
      {relistSuccessModal && (
        <RelistSuccessModal
          modal={relistSuccessModal}
          toggleModal={toggleRelistSuccessModal}
          projectRelistData={projectRelistData}
        />
      )}
      <Card className="card-app-design new-tag-relative-card">
        {data?.is_read === false && <NewTag />}
        <CardBody>
          <CardTitle className="active-project-title truncate-2 mb-1.5">{data?.name}</CardTitle>
          {data?.is_expired ? (
            <>
              <div className="bottom-detail d-flex mt-1 align-items-center">
                <div className="design-planning-wrapper mb-0 w-50">
                  <div className="design-planning mb-0">
                    <CardText className="mb-25">Expired Date</CardText>
                    <h6 className="mb-0 expired-listing-text">
                     {`${
                      convertUnixTimestampToDate(data?.exipiry_date, savedUserData?.availability?.timezone?.name ) || '-'
                    }`}
                    </h6>
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center bids-count-wrapper w-50">
                  <p className="mb-0 text-center bid-label">Bids</p>
                  <p className="mb-0 text-center bid-count">{data?.total_bids}</p>
                </div>
              </div>
              <div
                onClick={() => setRelistConfirmationModal(true)}
                className="cursor-pointer font-weight-normal text-center text-primary project-cta mt-1"
              >
                Relist
              </div>
            </>
          ) : (
            <>
              <div className="bottom-detail d-flex mt-1 align-items-center">
                <div className="design-planning-wrapper mb-0 w-50">
                  <div className="design-planning mb-0">
                    <CardText className="mb-25">Posted Date</CardText>
                    <h6 className="mb-0">
                      {/* {`${DateTime.fromMillis(data?.created_at).toFormat('MMM dd, yy') || '-'}`} */}
                      {`${convertUnixTimestampToDate(data?.created_at, savedUserData?.availability?.timezone?.name ) || '-'}`}
                    </h6>
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center bids-count-wrapper w-50">
                  <p className="mb-0 text-center bid-label">Bids</p>
                  <p className="mb-0 text-center bid-count">{data?.total_bids}</p>
                </div>
              </div>
              <div
                onClick={viewDetails}
                className="cursor-pointer font-weight-normal text-center text-primary project-cta mt-1"
              >
                View Details
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </ProjectWrapper>
  );
};

export default ProjectBidCard;

ProjectBidCard.propTypes = {
  data: Proptypes.object,
  className: Proptypes.string,
  accordionName: Proptypes.string,
};

ProjectBidCard.defaultProps = {
  data: {},
  className: '',
  accordionName: '',
};