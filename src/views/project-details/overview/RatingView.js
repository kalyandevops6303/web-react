import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { RatingNavsContainer } from '../style';
import { GrayBorderContainer, GrayCardWrapper } from '../../styled';

const RatingView = () => {
  const tabNames = {
    submitRating: '1',
    yourRating: '2',
  };

  const [activeTab, setTabActive] = useState(tabNames.submitRating);

  const toggleTabs = (tab) => {
    if (activeTab !== tab) {
      setTabActive(tab);
    }
  };

  return (
    <div>
      <RatingNavsContainer>
        <Nav tabs className="font-medium border-bottom">
          <NavItem className="me-3">
            <NavLink
              active={activeTab === tabNames.submitRating}
              onClick={() => {
                toggleTabs(tabNames.submitRating);
              }}
            >
              Submit Rating
            </NavLink>
          </NavItem>
          <NavItem className="me-3">
            <NavLink
              active={activeTab === tabNames.yourRating}
              onClick={() => {
                toggleTabs(tabNames.yourRating);
              }}
            >
              Your Ratings
            </NavLink>
          </NavItem>
        </Nav>
      </RatingNavsContainer>

      <TabContent activeTab={activeTab} className="mb-2">
        <TabPane tabId={tabNames.submitRating}>
          {activeTab === tabNames.submitRating && (
            <GrayCardWrapper>
              <Card>
                <CardHeader className="p-0">
                  <GrayBorderContainer className="w-100 px-2 pt-2 pb-1">
                    <h4 className="m-0">Share your thoughts on the Client you worked with</h4>
                  </GrayBorderContainer>
                </CardHeader>
                <CardBody className="pt-2">
                  <div className="d-flex">
                    <div className="d-flex flex-column align-items-center">
                      <Avatar img={defaultAvatar} imgHeight="98" imgWidth="98" />
                      <p className="fw-bolder mt-1 mb-0">Edgar Jones</p>
                      <p className="font-small-3">Red Fort Software</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </GrayCardWrapper>
          )}
        </TabPane>
        <TabPane tabId={tabNames.yourRating}>{activeTab === tabNames.yourRating && <p>your</p>}</TabPane>
      </TabContent>
    </div>
  );
};

export default RatingView;
