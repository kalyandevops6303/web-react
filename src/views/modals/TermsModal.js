import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Button, CardText, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { PrivacyPolicyModalWrapper } from './style';
import theme from '../../configs/themeVariables';
import { userTypes } from '../../utility/constants/Constant';
import { selectUserType } from '../../redux/selectors/authSelectors';

const TermsModal = ({ modal, toggleModal }) => {
  const userType = useSelector(selectUserType);
  const [activeTab, setActiveTab] = useState('');

  const NavigationBar = styled.ul`
    list-style-type: none;
    padding: 0 !important;
    margin: 0 !important;
    display: flex;
    border-bottom: 1px solid ${theme.cardHeaderBorderColor};

    li {
      padding: 1.5rem 0 1rem 0;
      margin: 0 3rem 0 0;
      font-size: 1rem;
      color: ${theme.navPillText};
      cursor: pointer;
    }
    .active {
      border-bottom: 2.5px solid ${theme.activeNavPillText};
      color: ${theme.activeNavPillText};
      font-weight: 600;
      cursor: auto;
    }
  `;

  useEffect(() => {
    setActiveTab(userType);
  }, []);

  return (
    <Modal
      contentClassName="custom-modal-project-details"
      isOpen={modal}
      toggle={toggleModal}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="px-3">
        <PrivacyPolicyModalWrapper>
          <CardText className="font-large-1 fw-bold text-center">Terms</CardText>
          <CardText className="text-center mt-2 mb-4">Last revised: July 18, 2023</CardText>
          <NavigationBar className=" ms-50 mb-50">
            <li className={activeTab === userTypes.talent && 'active'} onClick={() => setActiveTab(userTypes.talent)}>
              <CardText>Talent</CardText>
            </li>
            <li className={activeTab === userTypes.client && 'active'} onClick={() => setActiveTab(userTypes.client)}>
              <CardText>Client</CardText>
            </li>
          </NavigationBar>
          <section className="d-flex justify-content-center mt-5">
            {activeTab === userTypes.talent && (
              <CardText className="font-large-1 fw-bold text-center">Coming Soon</CardText>
            )}
            {activeTab === userTypes.client && (
              <CardText className="font-large-1 fw-bold text-center">Coming Soon</CardText>
            )}
          </section>
          <div className="d-flex gap-1 justify-content-end px-1 py-2">
            <Button outline color="primary" onClick={toggleModal}>
              Close
            </Button>
          </div>
        </PrivacyPolicyModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default TermsModal;

TermsModal.propTypes = {
  modal: PropTypes.bool,
  toggleModal: PropTypes.func,
};

TermsModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
