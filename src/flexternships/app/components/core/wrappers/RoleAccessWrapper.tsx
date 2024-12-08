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
import { GlobalModalActions } from '@/flexternships/constraints/types/core-types';
import { projectsBlockedModalContent } from '@/flexternships/static/core-content';
import { featureAccessService } from '@/flexternships/services/feature-access-service';

// Checks the user's access to the app based on the allowed roles
// Assumes that the user is authenticated to reach this wrapper
export default function RoleAccessWrapper(props: RoleAccessWrapperProps) {
  const { children, allowedAppRoles, fallbackRoute, noPadding = false, allowBlockedUsers = false, featureName } = props;

  const [hasFeatureAccess, setHasFeatureAccess] = useState<boolean>(true);
  const [isFeatureLoading, setIsFeatureLoading] = useState<boolean>(false);

  const userAppRoles = useFlexternUserStore((state) => state.userDetails?.appRoles);
  const userCheckpoint = useFlexternUserStore((state) => state.userDetails?.checkpoint);
  const isUserBlocked = useFlexternUserStore((state) => state.userDetails?.isBlocked);
  const isUserDetailsLoading = useFlexternUserStore((state) => state.isUserDetailsLoading);
  const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);

  const openGlobalModal = useAppStore((state) => state.openModal);
  const closeGlobalModal = useAppStore((state) => state.closeModal);

  const navigate = useNavigate();

  useEffect(() => {
    populateUserDetails();
  }, [populateUserDetails]);

  useEffect(() => {
    const checkFeatureAccess = async () => {
      if (featureName) {
        setIsFeatureLoading(true);
        try {
          const hasAccess = await featureAccessService.hasFeatureAccess(featureName);
          setHasFeatureAccess(hasAccess);
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
  if (featureName && !hasFeatureAccess) {
    return fallbackRoute ? <Navigate to={fallbackRoute} /> : <AccessDenied />;
  }

  // Rest of the existing role access checks
  if (isEmpty(userAppRoles) || allowedAppRoles.length === 0) {
    return fallbackRoute ? <Navigate to={fallbackRoute} /> : <AccessDenied />;
  }

  const hasAccess = allowedAppRoles.some((allowedRole) => {
    const userHasRole = userAppRoles.includes(allowedRole.appRole);
    const isCheckpointAllowed = allowedRole.allowCheckpoints.includes(userCheckpoint);
    const isCheckpointBlocked = allowedRole.blockCheckpoints.some((bc) => bc.checkpoint === userCheckpoint);

    return userHasRole && isCheckpointAllowed && !isCheckpointBlocked;
  });

  if (!hasAccess) {
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

  if (!allowBlockedUsers && isUserBlocked) {
    const allowedAction = async () => {
      closeGlobalModal();
      navigate('/projects/blocked');
    };
    const modalActions: GlobalModalActions = {
      onClose: allowedAction,
      onConfirm: allowedAction,
      onCancel: allowedAction,
    };

    openGlobalModal(GlobalModalType.PROJECTS_BLOCKED, modalActions, projectsBlockedModalContent);
  }

  return <div className={`flexternships-page ${noPadding ? 'p-0' : 'px-7 pt-20 '}`}>{children}</div>;
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
