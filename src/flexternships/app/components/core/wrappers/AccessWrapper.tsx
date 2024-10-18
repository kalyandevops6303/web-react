import { FlexternUserAppRole, FlexternUserCheckpoint } from '@/flexternships/constraints/enums/core-enums';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import AccessDenied from '../../pages/defaults/AccessDenied';
import Spinner from '../Spinner';
import { isEmpty } from 'lodash';

// checks the user's access to the app based on the allowed roles
// assumes that the user is authenticated to reach this wrapper
export default function AccessWrapper(props: AccessWrapperProps) {
    const { children, allowAppRoles, allowCheckpoints, blockCheckpoints, fallbackRoute } = props;
    const currentUserAppRoles = useFlexternUserStore((state) => state.userDetails?.appRoles);
    const currentUserCheckpoint = useFlexternUserStore((state) => state.userDetails?.checkpoint);
    const isUserDetailsLoading = useFlexternUserStore((state) => state.isUserDetailsLoading);
    const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);

    useEffect(() => {
        populateUserDetails();
    }, [populateUserDetails]);

    console.log(currentUserCheckpoint);
    console.log(currentUserAppRoles);

    // check if the user details are still loading
    if (isUserDetailsLoading) {
        return (
            <div className='flex justify-center items-center h-screen w-screen absolute'>
                <div className='flex justify-center items-center h-10 w-10'>
                    <Spinner />
                </div>
            </div>
        );
    }

    //  check if the user has any app roles and the allowed roles are not empty
    if (isEmpty(currentUserAppRoles) || allowAppRoles.length === 0) {
        return fallbackRoute ? <Navigate to={fallbackRoute} /> : <AccessDenied />;
    }
    //  check if the user has any of the allowed roles
    const hasAllowedRole = currentUserAppRoles.some(role => allowAppRoles.includes(role));
    if (!hasAllowedRole) {
        return fallbackRoute ? <Navigate to={fallbackRoute} /> : <AccessDenied />;
    }

    // Verify user's checkpoints
    if (blockCheckpoints) {
        // Check if the user's current checkpoint is in the list of blocked checkpoints
        const blockedCheckpoint = blockCheckpoints.find(bc => bc.checkpoint === currentUserCheckpoint);
        if (blockedCheckpoint) {
            // If the user's checkpoint is blocked, redirect to the specified route
            return <Navigate to={blockedCheckpoint.redirectRoute} />;
        }
    }

    // Check if the user's checkpoint is allowed
    if (allowCheckpoints && !allowCheckpoints.includes(currentUserCheckpoint)) {
        // If the user's checkpoint is not in the list of allowed checkpoints,
        // either redirect to the fallback route or show an access denied page
        return fallbackRoute ? <Navigate to={fallbackRoute} /> : <AccessDenied />;
    }
    
    return children;
}

type AccessWrapperProps = {
    children: React.ReactNode;
    allowAppRoles: FlexternUserAppRole[];
    allowCheckpoints?: FlexternUserCheckpoint[];
    blockCheckpoints?: BlockedCheckpoint[];
    fallbackRoute?: string;
}

type BlockedCheckpoint = {
    checkpoint: FlexternUserCheckpoint;
    redirectRoute: string;
}
