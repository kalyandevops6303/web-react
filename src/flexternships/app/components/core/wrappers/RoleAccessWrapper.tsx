import {
  FlexternUserAppRole,
  FlexternUserCheckpoint,
  GlobalModalType,
} from '@/flexternships/constraints/enums/core-enums';
import { useAppStore, useFlexternUserStore } from '@/flexternships/stores/core-stores';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AccessDenied from '../../pages/defaults/AccessDenied';
import Spinner from '../Spinner';
import { isEmpty } from 'lodash';
import { hasFeatureAccess } from '@/flexternships/services/feature-access-service';
import { isUserLoggedIn } from '@/utility/commonUtils';
import routes from '@/flexternships/routes';
import { triggerBeforeExpiry } from '@/flexternships/utils/core-utils';
import { BLOB_SAS_TOKEN_EXPIRY_DELTA } from '@/flexternships/static/constants/core-constants';

// Checks the user's access to the app based on the allowed roles
// Assumes that the user is authenticated to reach this wrapper
export default function RoleAccessWrapper(props: RoleAccessWrapperProps) {
  const { children, allowedAppRoles, fallbackRoute, noPadding = false, featureName } = props;

  const [hasAccess, setHasAccess] = useState<boolean>(true);
  const [isFeatureLoading, setIsFeatureLoading] = useState<boolean>(false);

  const userAppRoles = useFlexternUserStore((state) => state.userDetails?.appRoles);
  const userCheckpoint = useFlexternUserStore((state) => state.userDetails?.checkpoint);
  const isTncAccepted = useFlexternUserStore((state) => state.userDetails.isTncAccepted);
  const isUserDetailsLoading = useFlexternUserStore((state) => state.isUserDetailsLoading);
  const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);
  const blobSasTokenParams = useAppStore((state) => state.blobSasTokenParams);
  const populateBlobSasTokenParams = useAppStore((state) => state.populateBlobSasTokenParams);
  const populateAccessibleFeatures = useAppStore((state) => state.populateAccessibleFeatures);
  const openGlobalModal = useAppStore((state) => state.openModal);

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn()) {
      populateUserDetails();
      populateBlobSasTokenParams();
      populateAccessibleFeatures();
    } else {
      navigate(`${routes.auth.path}/login`);
    }
  }, [populateUserDetails, populateBlobSasTokenParams, populateAccessibleFeatures]);

  useEffect(() => {
    if (!blobSasTokenParams?.se) return;

    const timeoutId = triggerBeforeExpiry(
      new Date(blobSasTokenParams.se).getTime(),
      () => populateBlobSasTokenParams(true),
      { deltaBeforeExpiry: BLOB_SAS_TOKEN_EXPIRY_DELTA },
    );
    if (timeoutId) return () => clearTimeout(timeoutId);
  }, [blobSasTokenParams, populateBlobSasTokenParams]);

  useEffect(() => {
    const checkFeatureAccess = async () => {
      if (featureName) {
        setIsFeatureLoading(true);
        try {
          const hasAccess = await hasFeatureAccess(featureName);
          setHasAccess(hasAccess);
        } finally {
          setIsFeatureLoading(false);
        }
      }
    };

    checkFeatureAccess();
  }, [featureName]);

  // Check if either user details or feature access is still loading
  if (isUserDetailsLoading || isFeatureLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen absolute">
        <div className="flex justify-center items-center h-10 w-10">
          <Spinner />
        </div>
      </div>
    );
  }

  // Check if feature access is denied
  if (featureName && !hasAccess) {
    return fallbackRoute ? <Navigate to={fallbackRoute} /> : <AccessDenied />;
  }

  // Rest of the existing role access checks
  if (isEmpty(userAppRoles) || allowedAppRoles.length === 0) {
    return fallbackRoute ? <Navigate to={fallbackRoute} /> : <AccessDenied />;
  }

  const hasRoleAccess = allowedAppRoles.some((allowedRole) => {
    const userHasRole = userAppRoles.includes(allowedRole.appRole);
    const isCheckpointAllowed = allowedRole.allowCheckpoints.includes(userCheckpoint);
    const isCheckpointBlocked = allowedRole.blockCheckpoints.some((bc) => bc.checkpoint === userCheckpoint);

    return userHasRole && isCheckpointAllowed && !isCheckpointBlocked;
  });

  if (!hasRoleAccess) {
    const redirectRoute = allowedAppRoles
      .find(
        (role) =>
          userAppRoles.includes(role.appRole) && role.blockCheckpoints.some((bc) => bc.checkpoint === userCheckpoint),
      )
      ?.blockCheckpoints.find((bc) => bc.checkpoint === userCheckpoint)?.redirectRoute;

    return redirectRoute ? (
      <Navigate to={redirectRoute} />
    ) : fallbackRoute ? (
      <Navigate to={fallbackRoute} />
    ) : (
      <AccessDenied />
    );
  }

  if (!isTncAccepted) {
    openGlobalModal(GlobalModalType.TERMS_AND_CONDITIONS);
  }

  return <div className={`flexternships-page ${noPadding ? 'p-0' : 'px-7 pt-5 '}`}>{children}</div>;
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
  allowBlockedUsers?: boolean;
  noPadding?: boolean;
  featureName?: string;
};
