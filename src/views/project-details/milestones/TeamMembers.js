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
import { useSelector } from 'react-redux';
import { Info } from 'react-feather';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import Avatar from '@components/avatar';
import { MilestoneAccordionWrap } from './style';
import theme from '../../../configs/themeVariables';
import { selectAuthUserData } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';

const TeamMembers = ({ selectedMilestone }) => {
  const [open, setOpen] = useState(0);
  const userData = useSelector(selectAuthUserData);

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
            <div className="scroll-wrap px-75">
              {userData?.user_type === userTypes.client && (
                <div className="team-member-info mb-2 d-flex px-1 py-2">
                  <Info size={18} color={theme.activeColor} className="me-50" />
                  <p className="font-medium-1 m-0 error d-flex justify-content-between w-100">
                    <span>
                      <span className="fw-normal font-medium-1">
                        Note: The amounts mentioned do not include platform fee.{' '}
                      </span>
                    </span>
                  </p>
                </div>
              )}
              {selectedMilestone?.workers?.map((item) => (
                <Card key={item?.user_id} className="team-member-card">
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
                      {userData?.user_type === userTypes.client && (
                        <Col Col sm="12" md="3" lg="2">
                          <CardText className="font-small-3 m-0 fw-bold">
                            {item?.amount ? `$${item?.amount}` : 'Not available'}
                          </CardText>
                        </Col>
                      )}
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
