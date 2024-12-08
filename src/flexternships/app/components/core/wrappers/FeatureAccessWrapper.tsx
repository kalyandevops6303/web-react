import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import AccessDenied from '../../pages/defaults/AccessDenied';
import Spinner from '../Spinner';

type Feature = {
  feature_id: string;
  feature_name: string;
};

type FeatureAccessWrapperProps = {
  children: React.ReactNode;
  featureName: string;
  fallbackRoute?: string;
};

export default function FeatureAccessWrapper(props: FeatureAccessWrapperProps) {
  const { children, featureName, fallbackRoute } = props;
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkFeatureAccess = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get('https://tru-dev-api.trumio.ai/user/api/v1/features/permitted-features', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const features = response.data?.data || [];
        setHasAccess(features.some((feature: Feature) => feature.feature_name === featureName));
      } catch (error) {
        console.error('Error checking feature access:', error);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkFeatureAccess();
  }, [featureName]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen absolute">
        <div className="flex justify-center items-center h-10 w-10">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return fallbackRoute ? <Navigate to={fallbackRoute} /> : <AccessDenied />;
  }

  return <>{children}</>;
}
