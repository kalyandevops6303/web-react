import React from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import DeleteGif from '../../assets/images/gifs/delete.gif';
import { TerminateModalWrapper } from './style';
import { relistProject, terminateProject } from '../../redux/actions/projectDetailsAction';
import { userTypes } from '../../utility/constants/Constant';

const DeleteProjectModal = ({ modal, toggleModal, data, workers }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTerminating = useSelector((state) => state.projectDetails.terminateProjectLoading);
  const isRelisting = useSelector((state) => state.projectDetails.relistProjectLoading);

  const onClose = () => {
    toggleModal();
  };
  const handleDeleteProject = () => {
    dispatch(
      terminateProject({
        project_id: data?._id,
        onSuccess: () => {
          onClose();
          navigate('/marketplace/my_listings');
        },
      }),
    );
  };

  const handleRelistProject = () => {
    dispatch(
      relistProject({
        project_id: data?._id,
        onSuccess: () => {
          onClose();
          navigate('/marketplace/my_listings');
        },
      }),
    );
  };
  return (
    data?.status === "ON_GOING" ? (
      <Modal
        isOpen={modal}
        contentClassName="custom-modal-style delete-modal"
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader toggle={isTerminating || isRelisting ? null : onClose} />
        <ModalBody>
          <TerminateModalWrapper>
            <div className="d-flex justify-content-between pr-1">
              <img
                className="gif"
                src={DeleteGif}
                width={150}
                height={150}
                alt="gif"
              />
              <div>
                <CardTitle className="modal-heading">Project Termination</CardTitle>

                <CardSubtitle className="mb-75 fw-bold subtitle">
                  Are you sure you would want to terminate the project?
                </CardSubtitle>

                <CardText className="modal-body-text fw-light w-76">
                  <div> <span className="fw-bolder mb-50">1. </span> This action can not be undone</div>
                </CardText>

                <CardText className="modal-body-text fw-light w-76">
                  <div> <span className="fw-bolder mb-50">2. </span> You’ll get refund for future milestones only.</div>
                </CardText>

                <CardText className="modal-body-text fw-light w-76">
                  <div> <span className="fw-bolder mb-1">3. </span>The talent/team will be paid for completed and ongoing milestones.</div>
                </CardText>

                <CardText className="modal-body-text fw-light w-76">
                  <div> <span className="fw-bolder">4. </span>  Amount against dispute, will be kept on hold until resolved.</div>
                </CardText>
                {workers?.entity_type && (
                  <CardText className="modal-body-text fw-light w-76">
                    <span className="fw-bolder">Relist Project:</span> Usage Data Collection and Payment
                  </CardText>
                )}
                <section className="grid stats">
                  <div style={{ width: '13rem' }}>
                    <CardText className="text-truncate value mb-25">
                      {data?.details?.name}
                    </CardText>
                    <small className="key">Project Name</small>
                  </div>

                </section>
                <section className="grid stats">
                  <div style={{ width: '13rem' }}>
                    <CardText className="text-truncate value mb-25">
                      {data?.pay_type
                        ?.fixed_cost
                      }
                    </CardText>
                    <small className="key">Project Cost</small>
                  </div>

                  <div style={{ width: '13rem' }}>
                    <CardText className="text-truncate value mb-25">
                      {data?.pay_type
                        ?.fixed_cost
                      }
                    </CardText>
                    <small className="key">Project Amount</small>
                  </div>

                </section>

              </div>
            </div>
            <div className="d-flex gap-1 mt-3 justify-content-end">
              <Button
                disabled={isTerminating || isRelisting}
                outline
                color="danger"
                onClick={handleDeleteProject}
              >
                {isTerminating ? 'Terminating...' : 'Terminate Project'}
              </Button>
              <Button outline color="primary" className="me-2" onClick={toggleModal}>
                Cancel
              </Button>
              {workers?.entity_type && (
                <Button
                  disabled={isTerminating || isRelisting}
                  color="danger"
                  onClick={handleRelistProject}
                >
                  {isRelisting ? 'Relisting...' : 'Relist Project'}
                </Button>
              )}
            </div>
          </TerminateModalWrapper>
        </ModalBody>
      </Modal>
    ) : (
      <Modal
        isOpen={modal}
        contentClassName="custom-modal-style delete-modal"
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader toggle={isTerminating || isRelisting ? null : onClose} />
        <ModalBody>
          <TerminateModalWrapper>
            <div className="d-flex justify-content-between pr-1">
              <img
                className="gif"
                src={DeleteGif}
                width={150}
                height={150}
                alt="gif"
              />
              <div>
                <CardTitle className="modal-heading">Project Termination</CardTitle>
                <CardSubtitle className="mb-75 fw-bold subtitle">
                  Don’t want to continue with the project?
                </CardSubtitle>
                <CardText className="modal-body-text fw-light w-76">
                  <span className="fw-bolder">Delete: </span> Deleting the project
                  will remove this project from the platform.
                </CardText>
                {workers?.entity_type && (
                  <CardText className="modal-body-text fw-light w-76">
                    <span className="fw-bolder">Relist Project:</span> Relisting the
                    project will terminate the contract with the existing team/talent
                    & list this project back in marketplace.
                  </CardText>
                )}
                <section className="grid stats">
                  <div style={{ width: '13rem' }}>
                    <CardText className="text-truncate value mb-25">
                      {data?.details?.name}
                    </CardText>
                    <small className="key">Project Name</small>
                  </div>
                  {workers?.entity_type && (
                    <div>
                      <CardText className="value mb-25">
                        {workers?.entity_type === userTypes.talent
                          ? `${workers?.first_name} ${workers?.last_name}`
                          : workers?.name}
                      </CardText>
                      <small className="key">Talent/Team name</small>
                    </div>
                  )}
                </section>
              </div>
            </div>
            <div className="d-flex gap-1 mt-3 justify-content-end">
              <Button
                disabled={isTerminating || isRelisting}
                outline
                color="danger"
                onClick={handleDeleteProject}
              >
                {isTerminating ? 'Terminating...' : 'Terminate Project'}
              </Button>
              {workers?.entity_type && (
                <Button
                  disabled={isTerminating || isRelisting}
                  color="danger"
                  onClick={handleRelistProject}
                >
                  {isRelisting ? 'Relisting...' : 'Relist Project'}
                </Button>
              )}
            </div>
          </TerminateModalWrapper>
        </ModalBody>
      </Modal>
    )
  );

};

export default DeleteProjectModal;

DeleteProjectModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  data: Proptypes.object,
  workers: Proptypes.object,
};

DeleteProjectModal.defaultProps = {
  modal: false,
  toggleModal: () => { },
  data: {},
  workers: {},
};
