import axios from 'axios';
import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';
import { handleError } from '@flexternships/utils/error-utils';
import { Feature } from '../constraints/types/core-types';

export const featureAccessService = {
  async getPermittedFeatures(): Promise<Feature[]> {
    const headers = appendAuthToken({});
    const config = { headers };

    try {
      const response = await axios.get(routes.userManagement.features.permittedFeatures, config);
      return response.data?.data || [];
    } catch (error) {
      handleError(error as Error, 'An unexpected error occurred while fetching permitted features');
      return [];
    }
  },

  async hasFeatureAccess(featureName: string): Promise<boolean> {
    try {
      const features = await this.getPermittedFeatures();
      return features.some((feature) => feature.feature_name === featureName);
    } catch (error) {
      handleError(error as Error, 'An unexpected error occurred while checking feature access');
      return false;
    }
  },
};
