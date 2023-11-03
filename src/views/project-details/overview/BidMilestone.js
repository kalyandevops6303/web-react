import React, { useEffect, useState } from 'react';
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  CardBody,
  CardText,
  CardTitle,
  UncontrolledAccordion,
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BidDetailsWrap } from '../style';
import theme from '../../../configs/themeVariables';
import { getBidMilestone } from '../../../redux/actions/projectDetailsAction';
import DateTime from '../../../lib/date-time';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { getWhoInvited } from '../../../redux/actions/teamsActions';

const BidMilestoneWrap = styled.div`
  .value {
    font-size: 1.125rem !important;
    font-style: normal !important;
    font-weight: 500 !important;
    margin-bottom: 0.2rem;
  }
  .key {
    font-size: 0.875rem !important;
    font-style: normal !important;
    font-weight: 400 !important;
  }
  .details {
    display: flex;
    gap: 8rem;
    padding-left: 1.5rem;
  }
  .milestone-content {
    .card-title {
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 500;
      color: ${theme.bodyColor};
      margin-bottom: 0.5rem;
    }
    .card-text {
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      color: ${theme.bodyColor};
    }
  }
`;

const AccordionHeadStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  .title-head {
    margin: auto 0;
  }
  .view-all-cta {
    font-size: 0.875rem;
    color: ${theme.activeColor};
    text-decoration: underline;
    margin: auto 1rem auto auto;
    font-weight: 400;
  }
  .key {
    color: ${theme.bodyColor};
    font-size: 0.75rem;
    font-weight: 400;
  }
`;

const BidMilestone = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const bidData = useSelector((state) => state.projectDetails.bidMilestone);
  const [isLoading, setLoading] = useState(false);
  const onSuccess = (res) => {
    dispatch(
      getBidMilestone({
        project_id: param?.projectId,
        entity_id: res?.request_from?.team_id,
        onSuccess: () => setLoading(false),
        onError: () => setLoading(false),
      }),
    );
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    dispatch(getWhoInvited({ id: param.inviteId, onSuccess, onError: () => setLoading(false) }));
  }, []);

  if (isLoading) {
    return <ComponentSpinner />;
  }

  return (
    <BidDetailsWrap>
      <BidMilestoneWrap>
        <Card>
          <CardTitle className="main-card-title">Project Bid Estimation</CardTitle>
          <CardBody className="main-card-body details">
            <div>
              <CardText className="value">
                {bidData?.project_start_date
                  ? DateTime.fromMillis(bidData?.project_start_date).toFormat('MMM dd, yy')
                  : '-'}
              </CardText>
              <div className="d-flex align-items-center m-0">
                <CardText className="key mb-0">Start Date</CardText>
              </div>
            </div>
            <div>
              <CardText className="value"> ${bidData?.total_estimated_cost} </CardText>
              <div className="d-flex align-items-center m-0">
                <CardText className="key mb-0">Project Earnings</CardText>
              </div>
            </div>
            <div>
              <CardText className="value">
                {bidData?.total_estimated_duration?.duration}
                {bidData?.total_estimated_duration?.duration_type &&
                  bidData?.total_estimated_duration?.duration_type.charAt(0).toLowerCase()}
              </CardText>
              <div className="d-flex align-items-center m-0">
                <CardText className="key mb-0">Estimated Duration</CardText>
              </div>
            </div>
          </CardBody>
        </Card>
        {bidData?.milestones?.map((milestone, index) => (
          <UncontrolledAccordion key={milestone?._id} className="accordion-timeline mb-2" defaultOpen="1">
            <AccordionItem style={{ paddingLeft: '0.5rem' }}>
              <AccordionHeader targetId="1">
                <AccordionHeadStyle>
                  <span className="title-head">Milestone #{index + 1}</span>

                  <div className="d-flex gap-1 aling-items-center">
                    <div className="d-flex gap-1 aling-items-center">
                      <div>
                        <span className="key">Duration</span>
                        <CardText className="value text-end">
                          {milestone?.estimated_duration?.duration}
                          {milestone?.estimated_duration?.duration_type &&
                            milestone?.estimated_duration?.duration_type.charAt(0).toLowerCase()}
                        </CardText>
                      </div>
                      <div className="me-1">
                        <span className="key">Total Hours</span>
                        <CardText className="value text-end">{milestone?.numbers_of_hours}</CardText>
                      </div>
                      <div className="me-1">
                        <span className="key">Cost</span>
                        <CardText className="value text-end">${milestone?.estimated_cost}</CardText>
                      </div>
                    </div>
                  </div>
                </AccordionHeadStyle>
              </AccordionHeader>
              <AccordionBody accordionId="1" className="accordion-status-body milestone-content">
                <CardTitle>{milestone?.name}</CardTitle>
                <CardText>{milestone?.description}</CardText>
              </AccordionBody>
            </AccordionItem>
          </UncontrolledAccordion>
        ))}
      </BidMilestoneWrap>
    </BidDetailsWrap>
  );
};

export default BidMilestone;
