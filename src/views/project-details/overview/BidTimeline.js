/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Accordion, Card, CardBody, CardText } from 'reactstrap';
import { ChevronRight } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../../configs/themeVariables';
import Timeline from '../../../@core/components/timeline';
import { selectUserType } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import ReceivedBids from './ReceivedBids';
import BidSubmitted from './BidSubmitted';
import { checkDocumentActivated, getBidDetails } from '../../../redux/actions/projectDetailsAction';
import { projectDetails, selectIsContract, selectIsNDA } from '../../../redux/selectors/projectDetailsSelectors';
import ContractTimeline from './ContractTimeline';
import NDATimeline from './NDATimeline';

const BidTimeline = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isContract = useSelector(selectIsContract);
  const isNDA = useSelector(selectIsNDA);
  const projectDetailsData = useSelector(projectDetails);
  const bidInfo = useSelector((state) => state.projectDetails.bidInfo);

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

  const [open, setOpen] = useState('1');

  const toggle = (id) => (open === id ? setOpen() : setOpen(id));
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
                  <CardText className={`fw-bold mb-0  ${!isNDA?.show_document ? 'disabled-color' : ''}`}>NDA</CardText>
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
            <Accordion className="accordion-timeline" open={open} toggle={toggle}>
              <NDATimeline />
            </Accordion>
          ) : (
            <Card>
              <CardBody className="basic-title">
                <div className="d-flex justify-content-between">
                  <CardText className={`fw-bold mb-0  ${!isNDA?.show_document ? 'disabled-color' : ''}`}>NDA</CardText>
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
                  <CardText className={`fw-bold mb-0  ${!isContract?.show_document ? 'disabled-color' : ''}`}>
                    Contract
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
            <Accordion className="accordion-timeline" open={open} toggle={toggle}>
              <ContractTimeline />
            </Accordion>
          ) : (
            <Card>
              <CardBody className="basic-title">
                <div className="d-flex justify-content-between">
                  <CardText className={`fw-bold mb-0  ${!isContract?.show_document ? 'disabled-color' : ''}`}>
                    Contract
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
        <Accordion className="accordion-timeline" open={open} toggle={toggle}>
          {userType !== userTypes.client && <BidSubmitted />}
        </Accordion>
      ),
    },
    {
      isVisible: userType === userTypes.client,
      color: theme.timelineSuccessColor,
      isDisabled: false,
      customContent: (
        <Accordion className="accordion-timeline" open={open} toggle={toggle}>
          {userType === userTypes.client && <ReceivedBids />}
        </Accordion>
      ),
    },
  ].filter((item) => item.isVisible);

  return (
    <div>
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
    </div>
  );
};

export default BidTimeline;
