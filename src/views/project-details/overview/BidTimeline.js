/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Card, CardBody, CardText, UncontrolledAccordion } from 'reactstrap';
import { ChevronRight } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../../configs/themeVariables';
import Timeline from '../../../@core/components/timeline';
import { selectUserType } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import ReceivedBids from './ReceivedBids';
import BidSubmitted from './BidSubmitted';
import { getBidDetails } from '../../../redux/actions/projectDetailsAction';
import {
  projectDetails,
  projectDetailsLoading,
  selectIsContract,
  selectIsNDA,
} from '../../../redux/selectors/projectDetailsSelectors';
import ContractTimeline from './ContractTimeline';
import NDATimeline from './NDATimeline';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { clearDocstate } from '../../../redux/reducers/projectDetails';

const BidTimelineWrapper = styled.div`
  .indicator {
    display: block;
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 50%;
    background: ${theme.red};
    align-self: flex-start;
  }
  .word-wrap {
    word-break: break-word;
  }
`;

const BidTimeline = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contractData = useSelector(selectIsContract);
  const ndaData = useSelector(selectIsNDA);
  const projectDetailsData = useSelector(projectDetails);
  const isDocLoading = useSelector((state) => state.projectDetails.checkDocumentActivatedLoading);
  const isLoading = useSelector(projectDetailsLoading);

  const userType = useSelector(selectUserType);

  useEffect(() => {
    dispatch(getBidDetails({ project_id: param?.projectId }));
    return () => {
      dispatch(clearDocstate());
    };
  }, []);

  const handleDoc = ({ type }) => {
    navigate(`doc/${type}`);
  };

  let isNoWorkerAssigned = true;
  if (projectDetailsData?.worker_details) {
    if (Array.isArray(projectDetailsData.worker_details)) {
      isNoWorkerAssigned = projectDetailsData.worker_details.length === 0;
    } else {
      isNoWorkerAssigned = Object.keys(projectDetailsData.worker_details).length === 0;
    }
  }

  const bidStageData = [
    {
      order: 1,
      isVisible: projectDetailsData?.nda?.is_nda,
      isDisabled: ndaData?.show_document === false,
      color: theme.purpleTimelimeColor,
      customContent: (
        <div>
          {userType === userTypes.client && !ndaData?.is_signed ? (
            <Card>
              <CardBody className="basic-title">
                <div className="d-flex justify-content-between">
                  <CardText className={`d-flex fw-bold mb-0  ${!ndaData?.show_document ? 'disabled-color' : ''}`}>
                    NDA {ndaData?.show_document && <span className="indicator" />}
                  </CardText>
                  {ndaData?.show_document && (
                    <div className="d-flex gap-50 align-items-center">
                      <span onClick={() => handleDoc({ type: 'nda' })} className="card-cta">
                        Sign NDA
                      </span>
                      <ChevronRight size={16} />
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          ) : ndaData?.show_document ? (
            // <UncontrolledAccordion className="accordion-timeline" defaultOpen="0">
            <NDATimeline />
          ) : (
            // </UncontrolledAccordion>
            <Card>
              <CardBody className="basic-title">
                <div className="d-flex justify-content-between">
                  <CardText className={`d-flex fw-bold mb-0  ${!ndaData?.show_document ? 'disabled-color' : ''}`}>
                    NDA {ndaData?.show_document && <span className="indicator" />}
                  </CardText>
                  {ndaData?.show_document && (
                    <div className="d-flex gap-50 align-items-center">
                      <span onClick={() => handleDoc({ type: 'nda' })} className="card-cta">
                        Sign NDA
                      </span>
                      <ChevronRight size={16} />
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      ),
    },
    {
      order: 2,
      isVisible: true,
      isDisabled: contractData?.show_document === false,
      color: theme.orangeColor,
      customContent: (
        <div>
          {userType === userTypes.client && !contractData?.is_signed ? (
            <Card>
              <CardBody className="basic-title">
                <div className="d-flex justify-content-between">
                  <CardText className={`d-flex fw-bold mb-0  ${!contractData?.show_document ? 'disabled-color' : ''}`}>
                    Contract
                    {contractData?.show_document && <span className="indicator" />}
                  </CardText>
                  {contractData?.show_document && (
                    <div className="d-flex gap-50 align-items-center">
                      <span onClick={() => handleDoc({ type: 'contract' })} className="card-cta">
                        Sign contract
                      </span>
                      <ChevronRight size={16} />
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          ) : contractData?.show_document ? (
            // <UncontrolledAccordion className="accordion-timeline" defaultOpen="0">
            <ContractTimeline />
          ) : (
            // </UncontrolledAccordion>
            <Card>
              <CardBody className="basic-title">
                <div className="d-flex justify-content-between">
                  <CardText className={`fw-bold mb-0  ${!contractData?.show_document ? 'disabled-color' : ''}`}>
                    Contract {contractData?.show_document && <span className="indicator" />}
                  </CardText>
                  {contractData?.show_document && (
                    <div className="d-flex gap-50 align-items-center">
                      <span onClick={() => handleDoc({ type: 'contract' })} className="card-cta">
                        Sign contract
                      </span>
                      <ChevronRight size={16} />
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      ),
    },

    {
      order: 3,
      isVisible: true,
      isDisabled: false,
      color: theme.timelineSuccessColor,
      customContent: (
        // <UncontrolledAccordion className="accordion-timeline" defaultOpen="1">
        <BidSubmitted />
        // </UncontrolledAccordion>
      ),
    },
    {
      order: isNoWorkerAssigned ? 0 : 4,
      isVisible: userType === userTypes.client,
      color: theme.timelineSuccessColor,
      isDisabled: false,
      customContent: (
        <UncontrolledAccordion className="accordion-timeline" defaultOpen="1">
          {userType === userTypes.client && <ReceivedBids projectName={projectDetailsData?.details?.name} />}
        </UncontrolledAccordion>
      ),
    },
  ].filter((item) => item.isVisible);

  const bidStageWithOrder = bidStageData.slice().sort((a, b) => a.order - b.order);

  if (isDocLoading || isLoading) {
    return <ComponentSpinner />;
  }
  return (
    <BidTimelineWrapper>
      <div>
        {contractData &&
          // If contractData is true...
          (!projectDetailsData?.nda?.is_nda || (projectDetailsData?.nda?.is_nda && ndaData)) && (
            // If projectDetailsData?.nda?.is_nda is true, check ndaData before rendering Timeline.
            // {console.log(contractData)}
            <Timeline data={bidStageWithOrder} />
          )}
      </div>

      {/* {bidInfoError && <Timeline data={bidStageWithOrder} />} */}

      {/* {userType !== userTypes.client && bidInfo && (
        // If the user type is talent, check if bidInfo is available before proceeding.
        <div>
          {contractData &&
            // If contractData is true...
            (!projectDetailsData?.nda?.is_nda || (projectDetailsData?.nda?.is_nda && ndaData)) && (
              // If projectDetailsData?.nda?.is_nda is true, check ndaData before rendering Timeline.
              <Timeline data={bidStageWithOrder} />
            )}
        </div>
      )}
      {userType === userTypes.client && bidInfo && (
        // If the user type is client, no need to check bidInfo.
        <div>
          {contractData &&
            // If contractData is true...
            (!projectDetailsData?.nda?.is_nda || (projectDetailsData?.nda?.is_nda && ndaData)) && (
              // If projectDetailsData?.nda?.is_nda is true, check ndaData before rendering Timeline.
              <Timeline data={bidStageWithOrder} />
            )}
        </div>
      )}
      {bidInfoError && <Timeline data={bidStageWithOrder} />} */}
    </BidTimelineWrapper>
  );
};

export default BidTimeline;
