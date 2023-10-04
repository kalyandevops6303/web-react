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
import { checkDocumentActivated, getBidDetails } from '../../../redux/actions/projectDetailsAction';
import {
  projectDetails,
  projectDetailsLoading,
  selectIsContract,
  selectIsNDA,
} from '../../../redux/selectors/projectDetailsSelectors';
import ContractTimeline from './ContractTimeline';
import NDATimeline from './NDATimeline';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';

const BidTimelineWrapper = styled.div`
  .indicator {
    display: block;
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 50%;
    background: ${theme.red};
    align-self: flex-start;
  }
`;

const BidTimeline = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isContract = useSelector(selectIsContract);
  const isNDA = useSelector(selectIsNDA);
  const projectDetailsData = useSelector(projectDetails);
  const bidInfo = useSelector((state) => state.projectDetails.bidInfo);
  const bidInfoError = useSelector((state) => state.projectDetails.errorBidInfo);
  const isDocLoading = useSelector((state) => state.projectDetails.checkDocumentActivatedLoading);
  const isLoading = useSelector(projectDetailsLoading);

  const userType = useSelector(selectUserType);

  useEffect(() => {
    dispatch(checkDocumentActivated({ project_id: param.projectId, doc_type: 'CONTRACT' }));
  }, []);
  useEffect(() => {
    if (projectDetailsData?.nda?.is_nda) {
      dispatch(checkDocumentActivated({ project_id: param.projectId, doc_type: 'NDA' }));
    }
  }, [projectDetailsData]);

  useEffect(() => {
    if (userType !== userTypes.client) {
      dispatch(getBidDetails({ project_id: param?.projectId }));
    }
  }, []);
  const handleDoc = ({ type }) => {
    navigate(`doc/${type}`);
  };

  const bidStageData = [
    {
      isVisible: projectDetailsData?.nda?.is_nda,
      isDisabled: isNDA?.show_document === false,
      color: theme.purpleTimelimeColor,
      customContent: (
        <div>
          {userType === userTypes.client && !isNDA?.is_signed ? (
            <Card>
              <CardBody className="basic-title">
                <div className="d-flex justify-content-between">
                  <CardText className={`d-flex fw-bold mb-0  ${!isNDA?.show_document ? 'disabled-color' : ''}`}>
                    NDA {isNDA?.show_document && <span className="indicator" />}
                  </CardText>
                  {isNDA?.show_document && (
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
          ) : isNDA?.show_document ? (
            <UncontrolledAccordion className="accordion-timeline" defaultOpen="1">
              <NDATimeline />
            </UncontrolledAccordion>
          ) : (
            <Card>
              <CardBody className="basic-title">
                <div className="d-flex justify-content-between">
                  <CardText className={`d-flex fw-bold mb-0  ${!isNDA?.show_document ? 'disabled-color' : ''}`}>
                    NDA {isNDA?.show_document && <span className="indicator" />}
                  </CardText>
                  {isNDA?.show_document && (
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
      isVisible: true,
      isDisabled: isContract?.show_document === false,
      color: theme.orangeColor,
      customContent: (
        <div>
          {userType === userTypes.client && !isContract?.is_signed ? (
            <Card>
              <CardBody className="basic-title">
                <div className="d-flex justify-content-between">
                  <CardText className={`d-flex fw-bold mb-0  ${!isContract?.show_document ? 'disabled-color' : ''}`}>
                    Contract
                    {isContract?.show_document && <span className="indicator" />}
                  </CardText>
                  {isContract?.show_document && (
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
          ) : isContract?.show_document ? (
            <UncontrolledAccordion className="accordion-timeline" defaultOpen="1">
              <ContractTimeline />
            </UncontrolledAccordion>
          ) : (
            <Card>
              <CardBody className="basic-title">
                <div className="d-flex justify-content-between">
                  <CardText className={`fw-bold mb-0  ${!isContract?.show_document ? 'disabled-color' : ''}`}>
                    Contract {isContract?.show_document && <span className="indicator" />}
                  </CardText>
                  {isContract?.show_document && (
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
      isVisible: userType !== userTypes.client,
      isDisabled: false,
      color: theme.timelineSuccessColor,
      customContent: (
        <UncontrolledAccordion className="accordion-timeline" defaultOpen="1">
          {userType !== userTypes.client && <BidSubmitted />}
        </UncontrolledAccordion>
      ),
    },
    {
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

  if (isDocLoading || isLoading) {
    return <ComponentSpinner />;
  }

  return (
    <BidTimelineWrapper>
      {userType !== userTypes.client && bidInfo && (
        // If the user type is talent, check if bidInfo is available before proceeding.
        <div>
          {isContract &&
            // If isContract is true...
            (!projectDetailsData?.nda?.is_nda || (projectDetailsData?.nda?.is_nda && isNDA)) && (
              // If projectDetailsData?.nda?.is_nda is true, check isNDA before rendering Timeline.
              <Timeline data={bidStageData} />
            )}
        </div>
      )}
      {userType === userTypes.client && (
        // If the user type is client, no need to check bidInfo.
        <div>
          {isContract &&
            // If isContract is true...
            (!projectDetailsData?.nda?.is_nda || (projectDetailsData?.nda?.is_nda && isNDA)) && (
              // If projectDetailsData?.nda?.is_nda is true, check isNDA before rendering Timeline.
              <Timeline data={bidStageData} />
            )}
        </div>
      )}
      {bidInfoError && <Timeline data={bidStageData} />}
    </BidTimelineWrapper>
  );
};

export default BidTimeline;
