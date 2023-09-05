import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Accordion, Card, CardBody, CardText } from 'reactstrap';
import { ChevronRight } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../../configs/themeVariables';
import Timeline from '../../../@core/components/timeline';
import { selectUserData, selectUserType } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import ReceivedBids from './ReceivedBids';
import BidSubmitted from './BidSubmitted';
import {
  checkDocumentActivated,
  getBidDetails,
  getDocumentTimeline,
} from '../../../redux/actions/projectDetailsAction';
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
  const userData = useSelector(selectUserData);

  useEffect(() => {
    dispatch(checkDocumentActivated({ project_id: param.projectId, doc_type: 'CONTRACT' }));
    dispatch(checkDocumentActivated({ project_id: param.projectId, doc_type: 'NDA' }));
  }, []);

  useEffect(() => {
    if (userData?.user_type !== userTypes.client) {
      dispatch(getBidDetails({ project_id: param?.projectId }));
    }
  }, []);

  useEffect(() => {
    dispatch(getDocumentTimeline({ project_id: param?.projectId, doc_type: 'CONTRACT' }));
    dispatch(getDocumentTimeline({ project_id: param?.projectId, doc_type: 'NDA' }));
  }, []);

  const [open, setOpen] = useState('1');
  const userType = useSelector(selectUserType);

  const toggle = (id) => (open === id ? setOpen() : setOpen(id));

  const handleContract = () => {
    navigate('contract');
  };

  const bidStageDataForTalentTeam = [
    {
      isVisible: projectDetailsData?.nda?.is_nda,
      isDisabled: !isNDA?.is_document,
      color: theme.orangeColor,
      customContent: (
        <div>
          {isNDA?.is_signed ? (
            <Accordion className="accordion-timeline" open={open} toggle={toggle}>
              <NDATimeline />
            </Accordion>
          ) : (
            <Card>
              <CardBody className="basic-title">
                <div className="d-flex justify-content-between">
                  <CardText className={`fw-bold mb-0  ${!isNDA?.is_document ? 'disabled-color' : ''}`}>NDA</CardText>
                  {isNDA?.is_document && (
                    <div className="d-flex gap-50 align-items-center">
                      <span onClick={handleContract} className="card-cta">
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
      isDisabled: !isContract?.is_document,
      color: theme.purpleTimelimeColor,
      customContent: (
        <div>
          {isContract?.is_signed ? (
            <Accordion className="accordion-timeline" open={open} toggle={toggle}>
              {userType !== userTypes.client && <ContractTimeline />}
            </Accordion>
          ) : (
            <Card>
              <CardBody className="basic-title">
                <div className="d-flex justify-content-between">
                  <CardText className={`fw-bold mb-0  ${!isContract?.is_document ? 'disabled-color' : ''}`}>
                    Contract
                  </CardText>
                  {isContract?.is_document && (
                    <div className="d-flex gap-50 align-items-center">
                      <span onClick={handleContract} className="card-cta">
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
      isVisible: true,
      isDisabled: false,
      color: theme.info,
      customContent: (
        <Accordion className="accordion-timeline" open={open} toggle={toggle}>
          {userType !== userTypes.client && <BidSubmitted />}
        </Accordion>
      ),
    },
  ].filter((item) => item.isVisible);
  const bidStageDataForClient = [
    {
      isVisible: projectDetailsData?.nda?.is_nda,
      isDisabled: !isNDA?.is_document,
      color: theme.orangeColor,
      customContent: (
        <div>
          {isNDA?.is_signed ? (
            <Accordion className="accordion-timeline" open={open} toggle={toggle}>
              <NDATimeline />
            </Accordion>
          ) : (
            <Card>
              <CardBody className="basic-title">
                <div className="d-flex justify-content-between">
                  <CardText className={`fw-bold mb-0  ${!isNDA?.is_document ? 'disabled-color' : ''}`}>NDA</CardText>
                  {isNDA?.is_document && (
                    <div className="d-flex gap-50 align-items-center">
                      <span onClick={handleContract} className="card-cta">
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
      isDisabled: !isContract?.is_document,
      color: theme.orangeColor,
      customContent: (
        <div>
          {isContract?.is_signed ? (
            <Accordion className="accordion-timeline" open={open} toggle={toggle}>
              <ContractTimeline />
            </Accordion>
          ) : (
            <Card>
              <CardBody className="basic-title">
                <div className="d-flex justify-content-between">
                  <CardText className={`fw-bold mb-0  ${!isContract?.is_document ? 'disabled-color' : ''}`}>
                    Contract
                  </CardText>
                  {isContract?.is_document && (
                    <div className="d-flex gap-50 align-items-center">
                      <span className="card-cta">Sign Contract</span>
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
      color: theme.info,
      isDisabled: false,
      customContent: (
        <Accordion className="accordion-timeline" open={open} toggle={toggle}>
          {userType === userTypes.client && <ReceivedBids />}
        </Accordion>
      ),
    },
  ];
  return (
    <>
      <Timeline data={userType === userTypes.client ? bidStageDataForClient : bidStageDataForTalentTeam} />;
    </>
  );
};

export default BidTimeline;
