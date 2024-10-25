import { FlexternUserAppRole, FlexternUserCheckpoint } from '@/flexternships/constraints/enums/core-enums';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import AccessDenied from '../../pages/defaults/AccessDenied';
import Spinner from '../Spinner';
import { isEmpty } from 'lodash';

// Checks the user's access to the app based on the allowed roles
// Assumes that the user is authenticated to reach this wrapper
export default function RoleAccessWrapper(props: RoleAccessWrapperProps) {
    const { children, allowedAppRoles, fallbackRoute, noPadding = false } = props;
    const userAppRoles = useFlexternUserStore((state) => state.userDetails?.appRoles);
    const userCheckpoint = useFlexternUserStore((state) => state.userDetails?.checkpoint);
    const isUserDetailsLoading = useFlexternUserStore((state) => state.isUserDetailsLoading);
    const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);

    useEffect(() => {
        populateUserDetails();
    }, [populateUserDetails]);

    // Check if the user details are still loading
    if (isUserDetailsLoading) {
        return (
            <div className='flex justify-center items-center h-screen w-screen absolute'>
                <div className='flex justify-center items-center h-10 w-10'>
                    <Spinner />
                </div>
            </div>
        );
    }

    // Check if the user has any app roles and the allowed roles are not empty
    if (isEmpty(userAppRoles) || allowedAppRoles.length === 0) {
        return fallbackRoute ? <Navigate to={fallbackRoute} /> : <AccessDenied />;
    }

    // Check if the user has any of the allowed roles and meets the checkpoint requirements
    const hasAccess = allowedAppRoles.some(allowedRole => {
        const userHasRole = userAppRoles.includes(allowedRole.appRole);
        const isCheckpointAllowed = allowedRole.allowCheckpoints.includes(userCheckpoint);
        const isCheckpointBlocked = allowedRole.blockCheckpoints.some(bc => bc.checkpoint === userCheckpoint);

        return userHasRole && isCheckpointAllowed && !isCheckpointBlocked;
    });

    if (!hasAccess) {
        // If access is denied, check for a specific redirect route
        const redirectRoute = allowedAppRoles.find(role =>
            userAppRoles.includes(role.appRole) &&
            role.blockCheckpoints.some(bc => bc.checkpoint === userCheckpoint)
        )?.blockCheckpoints.find(bc => bc.checkpoint === userCheckpoint)?.redirectRoute;

        // Redirect to the specific route, fallback route, or show access denied
        return redirectRoute ? <Navigate to={redirectRoute} /> : (fallbackRoute ? <Navigate to={fallbackRoute} /> : <AccessDenied />);
    }

    // If all checks pass, render the children components
    return (
        <div className={`flexternships-page ${noPadding ? 'p-0' : 'px-7 pt-24 '}`}>
            {children}
        </div>
    );
}

type RoleAccessWrapperProps = {
    children: React.ReactNode;
    allowedAppRoles: {
        appRole: FlexternUserAppRole;
        allowCheckpoints: FlexternUserCheckpoint[];
        blockCheckpoints: {
            checkpoint: FlexternUserCheckpoint;
            redirectRoute: string;
        }[];
    }[];
    fallbackRoute?: string;
    noPadding?: boolean;
}
