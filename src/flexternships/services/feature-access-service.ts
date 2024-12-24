import axios from 'axios';
import { getCookiesItem } from '@/utility/cookiesControl';
import { handleError } from '@flexternships/utils/error-utils';
import { Feature } from '../constraints/types/core-types';

export const featureAccessService = {
  async getPermittedFeatures(): Promise<Feature[]> {
    const accessToken = getCookiesItem('access_token');
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const config = { headers };

    try {
      const response = await axios.get('https://tru-dev-api.trumio.ai/user/api/v1/features/permitted-features', config);
      return (
        response.data?.data.map((feature: { feature_id: string; feature_name: string }) => ({
          featureId: feature.feature_id,
          featureName: feature.feature_name,
        })) || []
      );
    } catch (error) {
      handleError(error as Error, 'An unexpected error occurred while fetching permitted features');
      return [];
    }
  },

  async hasFeatureAccess(featureName: string): Promise<boolean> {
    try {
      const features = await this.getPermittedFeatures();
      return features.some((feature) => feature.featureName === featureName);
    } catch (error) {
      handleError(error as Error, 'An unexpected error occurred while checking feature access');
      return false;
    }
  },
};
