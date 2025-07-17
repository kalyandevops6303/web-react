import { FeatureName } from '@/flexternships/constraints/enums/core-enums';
import { useAppStore } from '@/flexternships/stores/core-stores';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

interface FeatureFlagProps {
  featureName: FeatureName;
  children: React.ReactNode;
}

export default function FeatureFlag(props: FeatureFlagProps) {
  const { featureName, children } = props;

  const accessibleFeatures = useAppStore((state) => state.accessibleFeatures);
  const populateAccessibleFeatures = useAppStore((state) => state.populateAccessibleFeatures);

  useEffect(() => {
    populateAccessibleFeatures();
  }, [populateAccessibleFeatures]);

  if (isEmpty(accessibleFeatures) || !accessibleFeatures?.includes(featureName)) {
    return null;
  }

  return children;
}
