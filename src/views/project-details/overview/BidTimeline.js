import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Accordion, Card, CardBody, CardText } from 'reactstrap';
import { ChevronRight } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../../configs/themeVariables';
import Timeline from '../../../@core/components/timeline';
import NameInfo from '../../../@core/components/name-info';
import { selectUserType } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import ReceivedBids from './ReceivedBids';
import BidSubmitted from './BidSubmitted';
import { checkDocumentActivated } from '../../../redux/actions/projectDetailsAction';
import { projectDetails, selectIsContract, selectIsNDA } from '../../../redux/selectors/projectDetailsSelectors';

const BidTimeline = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isContract = useSelector(selectIsContract);
  const isNDA = useSelector(selectIsNDA);
  const projectDetailsData = useSelector(projectDetails);

  useEffect(() => {
    dispatch(checkDocumentActivated({ project_id: param.projectId, doc_type: 'CONTRACT' }));
    dispatch(checkDocumentActivated({ project_id: param.projectId, doc_type: 'NDA' }));
  }, []);

  const [open, setOpen] = useState('1');
  const userType = useSelector(selectUserType);

  const toggle = (id) => (open === id ? setOpen() : setOpen(id));

  const contractUpdates = [
    {
      status: 'Project started',
      color: theme.info,
    },
    {
      status: 'Signed - Contract Document',
      color: theme.orangeColor,
      user_details: {
        name: 'Tim Waker (Team Member)',
        org_name: 'R&D',
      },
    },
    {
      status: 'Signed - Contract Document)',
      color: theme.orangeColor,
      user_details: {
        name: 'Leona Watkins (Client)',
        org_name: 'CEO of pixinvent',
      },
    },
    {
      status: 'Signed - Contract Document',
      color: theme.orangeColor,
      user_details: {
        name: 'Rose (Team Member)',
        org_name: 'R&D',
      },
    },
    {
      status: 'Signed - Contract Document',
      color: theme.orangeColor,
      user_details: {
        name: 'Rose (Team Member)',
        org_name: 'R&D',
      },
    },
  ];

  const contractDataSet = [];
  contractUpdates.map((item) =>
    contractDataSet.push({
      meta: item?.time,
      color: item.color,
      customContent: (
        <div className="d-flex justify-content-between mb-1">
          <div>
            <h6 className="mb-25">{item.status}</h6>
            <span className="d-block mb-1">Feb 1, 23</span>
            {item.user_details && <NameInfo name={item.user_details.name} info={item.user_details.org_name} />}
          </div>
          <div className="meta-data">
            <span className="time">45min ago</span>
            <span className="card-cta">View</span>
          </div>
        </div>
      ),
    }),
  );

  const handleContract = () => {
    navigate('contract');
  };

  const bidStageDataForTalentTeam = [
    {
      isVisible: projectDetailsData?.nda?.is_nda,
      isDisabled: !isNDA,
      color: theme.orangeColor,
      customContent: (
        <Card>
          <CardBody className="basic-title">
            <div className="d-flex justify-content-between">
              <CardText className={`fw-bold mb-0  ${!isNDA ? 'disabled-color' : ''}`}>NDA</CardText>
              {isNDA && (
                <div className="d-flex gap-50 align-items-center">
                  <span className="card-cta">Sign NDA</span>
                  <ChevronRight size={16} />
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      ),
    },
    {
      isVisible: true,
      isDisabled: !isContract,
      color: theme.purpleTimelimeColor,
      customContent: (
        <Card>
          <CardBody className="basic-title">
            <div className="d-flex justify-content-between">
              <CardText className={`fw-bold mb-0  ${!isContract ? 'disabled-color' : ''}`}>Contract</CardText>
              {isContract && (
                <div className="d-flex gap-50 align-items-center">
                  <span className="card-cta">Sign contract</span>
                  <ChevronRight size={16} />
                </div>
              )}
            </div>
          </CardBody>
        </Card>
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
      isDisabled: !isNDA,
      color: theme.orangeColor,
      customContent: (
        <Card>
          <CardBody className="basic-title">
            <div className="d-flex justify-content-between">
              <CardText className={`fw-bold mb-0  ${!isNDA ? 'disabled-color' : ''}`}>NDA</CardText>
              {isNDA && (
                <div className="d-flex gap-50 align-items-center">
                  <span className="card-cta">Send NDA</span>
                  <ChevronRight size={16} />
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      ),
    },
    {
      isVisible: true,
      isDisabled: !isContract,
      color: theme.purpleColor,
      customContent: (
        <Card>
          <CardBody className="basic-title">
            <div className="d-flex justify-content-between">
              <CardText className={`fw-bold mb-0  ${!isContract ? 'disabled-color' : ''}`}>Contract</CardText>
              {isContract && (
                <div className="d-flex gap-50 align-items-center">
                  <span onClick={handleContract} className="card-cta">
                    Send contract
                  </span>
                  <ChevronRight size={16} />
                </div>
              )}
            </div>
          </CardBody>
        </Card>
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
