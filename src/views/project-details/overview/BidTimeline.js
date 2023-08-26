import React, { useState } from 'react';
import { Accordion, Card, CardBody, CardText } from 'reactstrap';
import { ChevronRight } from 'react-feather';
import { useSelector } from 'react-redux';
import theme from '../../../configs/themeVariables';
import Timeline from '../../../@core/components/timeline';
import NameInfo from '../../../@core/components/name-info';
import { selectUserType } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import ReceivedBids from './ReceivedBids';
import BidPreviewModal from '../../modals/BidPreviewModal';
import BidSubmitted from './BidSubmitted';

const BidTimeline = () => {
  const [open, setOpen] = useState('1');
  const userType = useSelector(selectUserType);
  const [bidModal, setBidModal] = useState(false);
  const toggleBidModal = () => setBidModal(!bidModal);

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

  const isDisabled = true;

  const bidStageDataForTalentTeam = [
    {
      isDisabled: true,
      color: theme.purpleTimelimeColor,
      customContent: (
        <Card>
          <CardBody className="basic-title">
            <div className="d-flex justify-content-between">
              <CardText className={`fw-bold mb-0  ${isDisabled ? 'disabled-color' : ''}`}>Contract</CardText>
              {!isDisabled && (
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
      isDisabled: false,
      color: theme.orangeColor,
      customContent: (
        <Accordion className="accordion-timeline" open={open} toggle={toggle}>
          {userType !== userTypes.client && <BidSubmitted />}
        </Accordion>
      ),
    },
  ];

  const bidStageDataForClient = [
    {
      isDisabled: false,
      color: theme.orangeColor,
      customContent: (
        <Card>
          <CardBody className="basic-title">
            <div className="d-flex justify-content-between">
              <CardText className={`fw-bold mb-0  ${isDisabled ? 'disabled-color' : ''}`}>Contract</CardText>
              {!isDisabled && (
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
      color: theme.purpleTimelimeColor,
      isDisabled: true,
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
      {bidModal && <BidPreviewModal modal={bidModal} toggleModal={toggleBidModal} />}
    </>
  );
};

export default BidTimeline;
