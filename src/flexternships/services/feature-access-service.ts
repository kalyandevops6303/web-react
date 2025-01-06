import axios from 'axios';
import { handleError } from '@flexternships/utils/error-utils';
import { Feature } from '../constraints/types/core-types';
import { routes } from '@flexternships/utils/api';

export const featureAccessService = {
  async getPermittedFeatures(): Promise<Feature[]> {
    const config = { withCredentials: true };
    try {
      const response = await axios.get(routes.userManagement.features.getPermittedFeatures, config);

      return (
        response.data?.data.map((feature: Feature) => ({
          feature_id: feature.feature_id,
          feature_name: feature.feature_name,
        })) || []
      );
    } catch (error) {
      handleError(error as Error, 'An unexpected error occurred while fetching permitted features');
      return [];
    }
  },

  async hasFeatureAccess(feature_name: string): Promise<boolean> {
    try {
      const features = await this.getPermittedFeatures();

      const hasAccess = features.some((feature) => {
        const matches = feature.feature_name === feature_name;
        return matches;
      });

      return hasAccess;
    } catch (error) {
      handleError(error as Error, 'An unexpected error occurred while checking feature access');
      return false;
    }
  },
};
