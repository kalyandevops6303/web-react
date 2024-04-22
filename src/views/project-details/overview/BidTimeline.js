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
  selectContractData,
  selectNDAData,
} from '../../../redux/selectors/projectDetailsSelectors';
import ContractTimeline from './ContractTimeline';
import NDATimeline from './NDATimeline';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { clearDocstate } from '../../../redux/reducers/projectDetails';
import { Elevate } from '../../styled';

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
  const contractData = useSelector(selectContractData);
  const ndaData = useSelector(selectNDAData);
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

  const bidStageData = [
    {
      order: 1,
      isVisible: userType === userTypes.client,
      color: theme.timelineSuccessColor,
      isDisabled: false,
      customContent: (
        <Elevate active>
          <UncontrolledAccordion className="accordion-timeline" defaultOpen="0">
            {userType === userTypes.client && <ReceivedBids projectName={projectDetailsData?.details?.name} />}
          </UncontrolledAccordion>
        </Elevate>
      ),
    },
    {
      order: 2,
      isVisible: true,
      isDisabled: false,
      color: theme.timelineSuccessColor,
      customContent: <BidSubmitted />,
    },
    {
      order: 3,
      isVisible: projectDetailsData?.nda?.is_nda,
      isDisabled: ndaData?.show_document === false,
      color: theme.purpleTimelimeColor,
      customContent: (
        <Elevate active>
          {userType === userTypes.client && !ndaData?.is_signed ? (
            <Card>
              <CardBody className="basic-title sign-accordion-header active-accordion-header ">
                <div className="d-flex justify-content-between">
                  <div className="title-head">
                    <span className="step d-block">STEP {userType === userTypes.client ? 3 : 2}</span>
                    <CardText className={`d-flex fw-bold mb-0  ${!ndaData?.show_document ? 'disabled-color' : ''}`}>
                      NDA {ndaData?.show_document && <span className="indicator" />}
                    </CardText>
                  </div>

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
            <NDATimeline />
          ) : (
            <Card>
              <CardBody className="basic-title sign-accordion-header active-accordion-header">
                <div className="d-flex justify-content-between">
                  <div className="title-head">
                    <span className="step d-block">STEP {userType === userTypes.client ? 3 : 2}</span>
                    <CardText className={`d-flex fw-bold mb-0  ${!ndaData?.show_document ? 'disabled-color' : ''}`}>
                      NDA {ndaData?.show_document && <span className="indicator" />}
                    </CardText>
                  </div>
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
        </Elevate>
      ),
    },
    {
      order: 4,
      isVisible: true,
      isDisabled: contractData?.show_document === false,
      color: theme.orangeColor,
      customContent: (
        <Elevate active>
          {userType === userTypes.client && !contractData?.is_signed ? (
            <Card>
              <CardBody className="basic-title sign-accordion-header active-accordion-header">
                <div className="d-flex justify-content-between">
                  <div className="title-head">
                    <span className="step d-block">
                      {/* Steps are can be different for client and talent/team */}
                      STEP{' '}
                      {(() => {
                        switch (userType) {
                          case userTypes.client:
                            return projectDetailsData?.nda?.is_nda ? 4 : 3;
                          default:
                            return projectDetailsData?.nda?.is_nda ? 3 : 2;
                        }
                      })()}
                    </span>
                    <CardText
                      className={`d-flex fw-bold mb-0  ${!contractData?.show_document ? 'disabled-color' : ''}`}
                    >
                      Contract
                      {contractData?.show_document && <span className="indicator" />}
                    </CardText>
                  </div>

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
            <ContractTimeline />
          ) : (
            <Card>
              <CardBody className="basic-title sign-accordion-header active-accordion-header">
                <div className="d-flex justify-content-between">
                  <div className="title-head">
                    <span className="step d-block">
                      {/* Steps are can be different for client and talent/team */}
                      STEP{' '}
                      {(() => {
                        switch (userType) {
                          case userTypes.client:
                            return projectDetailsData?.nda?.is_nda ? 4 : 3;
                          default:
                            return projectDetailsData?.nda?.is_nda ? 3 : 2;
                        }
                      })()}
                    </span>
                    <CardText className={`fw-bold mb-0  ${!contractData?.show_document ? 'disabled-color' : ''}`}>
                      Contract {contractData?.show_document && <span className="indicator" />}
                    </CardText>
                  </div>
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
        </Elevate>
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
    </BidTimelineWrapper>
  );
};

export default BidTimeline;
