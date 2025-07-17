import axios from 'axios';
import { handleError } from '@flexternships/utils/error-utils';
import { routes } from '@flexternships/utils/api';
import { FeatureName } from '../constraints/enums/core-enums';

interface FeatureResponse {
  feature_id: string;
  feature_name: FeatureName;
}

export async function getPermittedFeatures(): Promise<FeatureName[]> {
  const config = { withCredentials: true };
  try {
    const response = await axios.get(routes.userManagement.features.getPermittedFeatures, config);

    return response.data?.data.map((feature: FeatureResponse) => feature.feature_name) || [];
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching permitted features');
    return [];
  }
}
