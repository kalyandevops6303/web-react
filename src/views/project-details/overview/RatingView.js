import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { RatingNavsContainer } from '../style';
import RatingSubmitSuccessModal from '../../modals/RatingSubmitSuccessModal';
import SubmitRating from './SubmitRating';
import YourRatings from './YourRatings';

const RatingView = () => {
  const tabNames = {
    submitRating: '1',
    yourRating: '2',
  };

  const [activeTab, setTabActive] = useState(tabNames.submitRating);
  const [thankYouModal, setThankYouModal] = useState(null);

  const toggleTabs = (tab) => {
    if (activeTab !== tab) {
      setTabActive(tab);
    }
  };

  const toggleThankYouModal = () => {
    setThankYouModal(!thankYouModal);
  };

  return (
    <div>
      {thankYouModal && <RatingSubmitSuccessModal modal={thankYouModal} toggleModal={toggleThankYouModal} />}
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
        <TabPane tabId={tabNames.submitRating}>{activeTab === tabNames.submitRating && <SubmitRating />}</TabPane>
        <TabPane tabId={tabNames.yourRating}>{activeTab === tabNames.yourRating && <YourRatings />}</TabPane>
      </TabContent>
    </div>
  );
};

export default RatingView;
