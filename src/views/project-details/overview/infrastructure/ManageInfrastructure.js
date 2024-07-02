import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Button, Card, Col, Row, Spinner } from 'reactstrap';

import ShowToastMessage from '../../../../@core/components/toast';
import { ERROR } from '../../../../utility/constants/ToastTypes';
import { createInfraService, terminateInfraService } from '../../../../services/infrastructureServices';
import { ServiceContainer } from './styled';
import { InfraStatus } from './constants';
import TerminateInfraModal from '../../../modals/TerminateInfraModal';

const ManageInfrastructure = ({ data, updateInfraData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isTerminateInfraModal, setIsTerminateInfraModal] = useState(false);

    const params = useParams();

    const terminateInfra = async (onSuccess = () => { }, onError = () => { }) => {
        try {
            setIsLoading(true);

            const { data: responseData } = await terminateInfraService(params?.projectId);

            updateInfraData(responseData.data);
            setIsLoading(false);
            onSuccess();
        } catch (error) {
            const errorMsg = error.response?.data?.errorData?.message || error.message;
            ShowToastMessage(ERROR, errorMsg);
            setIsLoading(false);
            onError(errorMsg);
        }
    };

    const retryInfraCreation = async () => {
        try {
            setIsLoading(true);
            const { data: responseData } = await createInfraService(params?.projectId);
            updateInfraData(responseData.data);
            setIsLoading(false);
        } catch (error) {
            const errorMsg = error.response?.data?.errorData?.message || error.message;
            ShowToastMessage(ERROR, errorMsg);
            setIsLoading(false);
            console.error(errorMsg);
        }
    };

    const getInfraDescriptionByStatus = () => {
        switch (data.status) {
            case InfraStatus.INITIATED:
                return 'Creation of the services that you have opted for this project is in progress. Please check after sometime. It typically takes 3-5 minutes.';
            case InfraStatus.CREATED:
                return 'We created the following services that you have opted for this project. Check your email inbox for invite to view and manage the services.';
            case InfraStatus.CREATION_FAILED:
                return 'We encountered an error while creating the services for this project. You may still have received an invite to join the resource group and access a few services. To access other resources, please retry after sometime or contact support.';
            case InfraStatus.DECOMMISSION_REQUESTED:
                return 'We started terminating the infrastructure of this project. Please check after sometime. It typically takes 3-5 minutes.';
            case InfraStatus.DECOMMISSIONED:
                return 'We successfully terminated the infrastructure of this project, as per your request. Looking forward to serving you again on a different project.';
            case InfraStatus.DECOMMISSION_FAILED:
                return 'We encountered an error while terminating the infrastructure for this project. Please try after sometime or contact support.';
            default:
                return 'There\'s an error loading this page. Please check after sometime.';
        }
    }


    return (
        <div>
            <TerminateInfraModal modal={isTerminateInfraModal} toggleModal={() => (setIsTerminateInfraModal(!isTerminateInfraModal))} terminateInfra={terminateInfra} />
            <Row className="my-1">
                <Col sm="12">
                    <p>
                        {getInfraDescriptionByStatus()}
                    </p>
                </Col>
            </Row>
            <div className="d-flex flex-wrap justify-content-start">
                {
                    data.services_selected.map((item) => (
                        <Card key={item.unique_reference_name} className="mx-1">
                            <ServiceContainer>
                                <div className="m-1">
                                    <h5>
                                        Service Name
                                    </h5>
                                    <p>
                                        {item.display_name}
                                    </p>
                                </div>
                                {
                                    item.model_name && (
                                        <div className="m-1">
                                            <h5>
                                                Model
                                            </h5>
                                            <p>
                                                {item.model_name}
                                            </p>
                                        </div>
                                    )
                                }
                            </ServiceContainer>
                        </Card>
                    ))
                }
            </div>
            <div className="d-flex justify-content-end">
                {
                    (data?.status === InfraStatus.CREATION_FAILED) && (
                        <Button color="primary" type="button" className="me-2 px-3" onClick={retryInfraCreation} disabled={isLoading}>
                            {isLoading ? (<Spinner size="sm" />) : 'Retry'}
                        </Button>
                    )
                }
                {
                    (data?.status === InfraStatus.CREATED) && (
                        <Button color="danger" type="button" outline className="me-2 px-3" onClick={() => (setIsTerminateInfraModal(true))} disabled={isLoading}>
                            Delete
                        </Button>
                    )
                }
                {
                    (data?.status === InfraStatus.DECOMMISSION_FAILED) && (
                        <Button color="danger" type="button" outline className="me-2 px-3" onClick={() => (terminateInfra())} disabled={isLoading}>
                            {isLoading ? (<Spinner size="sm" />) : 'Retry'}
                        </Button>
                    )
                }
            </div>
        </div>
    );
};

export default ManageInfrastructure;
