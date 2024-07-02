import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Badge } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

import ShowToastMessage from '../../../../@core/components/toast';
import { ERROR } from '../../../../utility/constants/ToastTypes';
import { selectUserData } from '../../../../redux/selectors/authSelectors';
import { userTypes } from '../../../../utility/constants/Constant';
import { GrayBorderContainer, GrayCardWrapper } from '../../../styled';
import ComponentSpinner from '../../../../@core/components/spinner/Loading-spinner';
import { getInfraService } from '../../../../services/infrastructureServices';
import ManageInfrastructure from './ManageInfrastructure';
import CreateInfrastructure from './CreateInfrastructure';
import { TagContainer } from './styled';
import { InfraStatus } from '../../../../utility/constants/ProjectInfraConstants';
import { getInfraStatusText } from '../../../../utility/infrastructureUtils';

const InfrastructureView = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [infraData, setInfraData] = useState(null);

    const userData = useSelector(selectUserData);
    const params = useParams();
    const navigate = useNavigate();

    const validateUserType = () => {
        if (userData?.user_type !== userTypes.client) {
            navigate(`/project-details/${params?.projectId}/`);
        }
    }

    const fetchInfra = () => {
        setIsLoading(true);
        setInfraData(null);
        getInfraService(params?.projectId)
            .then(({ data }) => {
                setInfraData(data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                const errorResponse = err?.response;
                const status = errorResponse?.data?.errorData?.errorCode;
                if (errorResponse && status === 404) {
                    setIsLoading(false);
                } else {
                    ShowToastMessage(ERROR, errorResponse?.data?.errorData?.message || "Something went wrong!");
                    navigate(`/project-details/${params?.projectId}/`);
                }
            });
    }

    const updateInfraData = (data) => {
        setInfraData(data);
    }

    const getStatusBadgeColor = () => {
        if ((infraData?.status === InfraStatus.CREATION_FAILED) || (infraData?.status === InfraStatus.DECOMMISSION_FAILED))
            return 'light-danger';
        if ((infraData?.status === InfraStatus.INITIATED) || (infraData?.status === InfraStatus.DECOMMISSION_REQUESTED))
            return 'light-warning';
    }

    useEffect(() => {
        validateUserType();
    }, [userData, navigate]);

    useEffect(() => {
        fetchInfra();
    }, []);

    if (isLoading) {
        return <ComponentSpinner />;
    }

    return (
        <div>
            <GrayCardWrapper>
                <Card>
                    <CardHeader className="p-0">
                        <GrayBorderContainer className="d-flex align-items-center w-100 px-2 pt-2 pb-1">
                            <h4 className="m-0">
                                Project Infrastructure
                            </h4>
                            <TagContainer>
                                <Badge color={getStatusBadgeColor()} className={`ms-1 ${getStatusBadgeColor()}`}>
                                    {
                                        infraData ? getInfraStatusText(infraData.status) : 'Free'
                                    }
                                </Badge>
                            </TagContainer>
                        </GrayBorderContainer>
                    </CardHeader>
                    <CardBody className="pt-2">
                        {
                            infraData ? (
                                <ManageInfrastructure data={infraData} updateInfraData={updateInfraData} />
                            ) : (
                                <CreateInfrastructure updateInfraData={updateInfraData} />
                            )
                        }
                    </CardBody>
                </Card>
            </GrayCardWrapper>
        </div>
    );
};

export default InfrastructureView;
