// 'use client'; // For NextJS App

import { useNavigate, useSearchParams } from 'react-router-dom';
import Spinner from '../components/core/Spinner';

import logo from '@flexternships/assets/images/ic_trumio_logo.png';
import { useEffect } from 'react';
import { validateRequestToken, validateUserRequestByToken } from '@/flexternships/services/user-management';

// Imports from one-off app
// TODO - NextApp: replace the isUserLoggedIn one-off import with that of flexternships
import { isUserLoggedIn as getIsUserLoggedIn } from '@/utility/commonUtils';
// TODO - NextApp: replace the useLogout one-off hook with that of flexternships
import useLogout from '@/utility/hooks/useLogout';

import { UserStatus } from '@/flexternships/constraints/enums/core-enums';

export default function VerifyInvitation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { handleLogout } = useLogout();

  useEffect(() => {
    const moveUserToNextStep = async () => {
      // Get and validate invitation token from URL params
      const invitationToken = searchParams.get('token');
      if (!invitationToken) {
        throw new Error('Invitation token is required to verify user');
      }

      // Validate the invitation token with backend
      const validatedRequestInfo = await validateRequestToken(invitationToken);
      if (!validatedRequestInfo) {
        throw new Error('Invalid invitation token');
      }

      const { userStatus, projectId } = validatedRequestInfo;
      const signUpRoute = `/auth/flextern/register?invitation_token=${invitationToken}`;

      // Define redirect routes based on user status
      const routes = {
        [UserStatus.UNREGISTERED]: signUpRoute,
        [UserStatus.REGISTERED]: `/auth/login?next_path=/project-details/${projectId}/team`,
      };

      const redirectPath = routes[userStatus];
      if (!redirectPath) {
        throw new Error('Invalid user status');
      }

      // Handle navigation based on auth state
      const isUserLoggedIn = getIsUserLoggedIn();
      if (!isUserLoggedIn) {
        return navigate(redirectPath);
      }

      // Validate if logged in user has access to the invitation
      const isLoggedInUserValidated = await validateUserRequestByToken(invitationToken);
      if (!isLoggedInUserValidated) {
        await handleLogout({ preventRedirect: true, suppressToast: true });
        return navigate(redirectPath);
      }

      return navigate(`/project-details/${projectId}`);
    };

    moveUserToNextStep().catch(console.error);
  }, [searchParams]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-y-4">
        <img className="h-10" src={logo} alt="logo" />
        <div className="size-10">
          <Spinner />
        </div>
      </div>
    </div>
  );
}
