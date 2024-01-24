import React, { useState } from 'react';
import Proptypes from 'prop-types';
import Select from 'react-select';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, Spinner, Label } from 'reactstrap';
import GreatJobTick from '../../assets/images/greatJobGif.gif';

import { AcceptModalWrapper } from './style';
import { TeamCreatedModalImageWrapper, TeamCreatedModalLogoImg } from '../styled';
import { selectThemeColors } from '../../utility/Utils';
import { roleTypeOptions } from '../../utility/constants/Constant';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';

const AcceptMemberModal = ({ title, isLoading, data, onAccept, modal, toggleModal }) => {
  const [selectedRoleType, setSelectedRoleType] = useState(null);

  const onClose = () => {
    toggleModal();
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={isLoading ? null : onClose} />
      <ModalBody>
        <AcceptModalWrapper>
          <div className="d-flex justify-content-between pr-25">
            <img className="gif" style={{ margin: 'auto' }} src={GreatJobTick} width={120} height={120} alt="gif" />
            <div className="content-side">
              <CardTitle className="modal-title-custom mb-2">{title}</CardTitle>

              <CardText className="desc fw-light mb-3">Your accepting the below membership request </CardText>
              <section className="d-flex gap-4">
                <div className="d-flex flex-column">
                  <div className="my-1 d-flex">
                    <TeamCreatedModalImageWrapper width height>
                      {/* {previewImage  ? <TeamCreatedModalLogoImg src={"https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64d60539e127974f873d31d8/75c13a47-0613-4a7a-9650-42247393aa37.png"} alt="team-logo" /> : <UserPlus size={30} />} */}
                      <TeamCreatedModalLogoImg
                        src="https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64d60539e127974f873d31d8/75c13a47-0613-4a7a-9650-42247393aa37.png"
                        alt="team-logo"
                      />
                    </TeamCreatedModalImageWrapper>
                    <div className="d-flex flex-column ">
                      <h4 className="fw-bold m-0 ms-1">name</h4>
                      <h5 className=" m-0 ms-1">sub info</h5>
                    </div>
                  </div>

                  <div className="d-flex mr-2">
                    <RatingBadge number={Math.round(data?.rating ?? 0)} />
                    <CardText className="ps-1 font-small-3 fw-300 rating-label">0 Projects</CardText>
                  </div>
                </div>

                <div>
                  <Label className="form-label">Role Type</Label>
                  <Select
                    isClearable
                    options={roleTypeOptions}
                    classNamePrefix="select"
                    placeholder="Select role type"
                    value={selectedRoleType}
                    onChange={(option) => setSelectedRoleType(option)}
                    theme={selectThemeColors}
                  />
                </div>
              </section>
            </div>
          </div>
          <div className="d-flex gap-1 mt-2 justify-content-end">
            <Button disabled={isLoading} onClick={onClose} outline color="primary">
              Cancel
            </Button>
            <Button disabled={isLoading} color="primary" onClick={onAccept}>
              {isLoading ? <Spinner size="sm" /> : 'Confirm'}
            </Button>
          </div>
        </AcceptModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default AcceptMemberModal;

AcceptMemberModal.propTypes = {
  title: Proptypes.string,
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  data: Proptypes.object,
  onAccept: Proptypes.func,
  isLoading: Proptypes.bool,
};

AcceptMemberModal.defaultProps = {
  title: 'Request',
  modal: false,
  toggleModal: () => {},
  data: {},
  onAccept: () => {},
  isLoading: false,
};
