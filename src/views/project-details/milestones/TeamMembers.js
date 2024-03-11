import React, { useState } from 'react';
import Proptypes from 'prop-types';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  CardBody,
  CardText,
  Col,
  Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import Avatar from '@components/avatar';
import { MilestoneAccordionWrap } from './style';

const TeamMembers = ({ selectedMilestone }) => {
  const [open, setOpen] = useState(0);

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <MilestoneAccordionWrap className="mt-2">
      <Accordion className="accordion-margin" open={open} toggle={toggle}>
        <AccordionItem className="">
          <AccordionHeader targetId="1">
            <span className="accordion-title">Team Members</span>
          </AccordionHeader>
          <AccordionBody accordionId="1">
            <div className="scroll-wrap">
              {selectedMilestone?.workers?.map((item) => (
                <Card key={item?.user_id} className="custom-card mx-1 my-2">
                  <CardBody className="py-1">
                    <Row className="d-flex align-items-center">
                      <Col sm="12" md="3" lg="4">
                        <Link
                          style={{ textDecoration: 'none', color: 'inherit' }}
                          to={`/profile/talent/${item?.user_id}`}
                          target="_blank"
                        >
                          <div className="d-flex align-items-center">
                            <Avatar
                              img={item?.image_uri || defaultAvatar}
                              imgHeight="38"
                              imgWidth="38"
                              className="me-1 user-pic"
                            />
                            <div>
                              <p className="fw-bolder m-0">
                                {item?.first_name} {item?.last_name}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </Col>
                      <Col Col sm="12" md="3" lg="4">
                        <CardText className="font-small-3 m-0">{item?.role}</CardText>
                      </Col>
                      <Col Col sm="12" md="3" lg="2">
                        <CardText className="font-small-3 m-0 fw-bold">{item?.number_of_weeks} weeks</CardText>
                      </Col>
                      <Col Col sm="12" md="3" lg="2">
                        <CardText className="font-small-3 m-0 fw-bold">
                          {item?.amount ? `$${item?.amount}` : 'Not available'}
                        </CardText>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              ))}
            </div>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </MilestoneAccordionWrap>
  );
};

TeamMembers.propTypes = {
  selectedMilestone: Proptypes.object,
};
TeamMembers.defaultProps = {
  selectedMilestone: {},
};
export default TeamMembers;
