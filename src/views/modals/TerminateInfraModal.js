import React, { useState } from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, CardSubtitle, Spinner } from 'reactstrap';
import DeleteGif from '../../assets/images/gifs/delete.gif';
import { TerminateModalWrapper } from './style';

const TerminateInfraModal = ({ modal, toggleModal, terminateInfra }) => {
    const [isTerminating, setIsTerminating] = useState(false);

    const onClose = () => {
        setIsTerminating(false);
        toggleModal();
    };

    const onConfirm = () => {
        setIsTerminating(true);
        terminateInfra(onClose, onClose);
    };

    return (
        <Modal
                isOpen={modal}
                contentClassName="custom-modal-style delete-modal"
                className="modal-dialog-centered modal-lg"
            >
                <ModalHeader toggle={isTerminating ? null : onClose} />
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
                                <CardTitle className="modal-heading">
                                    Infrastructure Deletion
                                </CardTitle>

                                <CardSubtitle className="mb-75 fw-bold subtitle">
                                    Are you sure you would want to delete the infrastructure of this project?
                                </CardSubtitle>

                                <CardText className="modal-body-text fw-light w-76">
                                    <span className="fw-bolder mb-50">
                                        1.
                                    </span>
                                    {' '}
                                    This action can not be undone.
                                </CardText>

                                <CardText className="modal-body-text fw-light w-76">
                                    <span className="fw-bolder mb-50">
                                        2.
                                    </span>
                                    {' '}
                                    All the services allotted to this project will be destroyed.
                                </CardText>

                            </div>
                        </div>
                        <div className="d-flex gap-1 mt-3 justify-content-end">
                            <Button
                                disabled={isTerminating}
                                outline
                                color="danger"
                                onClick={onConfirm}
                            >
                                {isTerminating ? <Spinner size="sm" /> : 'Delete'}
                            </Button>
                            {
                                !isTerminating && (
                                    <Button outline color="primary" className="me-2" onClick={toggleModal}>
                                        Cancel
                                    </Button>
                                )
                            }
                        </div>
                    </TerminateModalWrapper>
                </ModalBody>
            </Modal>
    );

};

export default TerminateInfraModal;

TerminateInfraModal.propTypes = {
    modal: Proptypes.bool,
    toggleModal: Proptypes.func,
    terminateInfra: Proptypes.func,
};

TerminateInfraModal.defaultProps = {
    modal: false,
    toggleModal: () => { },
    terminateInfra: () => { },
};
