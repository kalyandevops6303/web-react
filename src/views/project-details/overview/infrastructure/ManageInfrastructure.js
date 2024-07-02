import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Button, Card, Col, Row, Spinner } from 'reactstrap';

import ShowToastMessage from '../../../../@core/components/toast';
import { ERROR } from '../../../../utility/constants/ToastTypes';
import { createInfraService, terminateInfraService } from '../../../../services/infrastructureServices';
import { ServiceContainer } from './styled';
import { InfraStatus } from '../../../../utility/constants/ProjectInfraConstants';
import TerminateInfraModal from '../../../modals/TerminateInfraModal';
import { getInfraDescriptionByStatus } from '../../../../utility/infrastructureUtils';

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


    return (
        <div>
            <TerminateInfraModal modal={isTerminateInfraModal} toggleModal={() => (setIsTerminateInfraModal(!isTerminateInfraModal))} terminateInfra={terminateInfra} />
            <Row className="my-1">
                <Col sm="12">
                    <p>
                        {getInfraDescriptionByStatus(data?.status)}
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
                    ((data?.status === InfraStatus.CREATION_FAILED) || (data?.status === InfraStatus.DECOMMISSION_FAILED)) && (
                        <Button
                            color={(data?.status === InfraStatus.CREATION_FAILED) ? "primary" : "danger"}
                            type="button"
                            className="me-2 px-3"
                            onClick={(data?.status === InfraStatus.CREATION_FAILED) ? retryInfraCreation : (() => (terminateInfra()))} // calling terminate infra without params
                            disabled={isLoading}>
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
