import ColoredGridMatrix from '@/flexternships/app/components/core/charts/matrices/ColoredGridMatrix';
import MatrixSkeleton from '@/flexternships/app/components/core/skeletons/MatrixSkeleton';
import { ColoredGridMatrixProps } from '@/flexternships/constraints/types/chart-types';
import { isEmpty } from 'lodash';

export default function CompetencyMatrix({ matrixData, isLoading = false }: CompetencyMatrixProps) {
  // Show Skeleton while loading
  if (isLoading) return <MatrixSkeleton className="self-start" rows={4} cols={5} gridItemClassName="h-7 w-28" />;
  // Show message if no data is found
  if (isEmpty(matrixData)) return <div>No data found</div>;

  return <ColoredGridMatrix {...matrixData} />;
}

type CompetencyMatrixProps = {
  matrixData: ColoredGridMatrixProps | null;
  isLoading?: boolean;
};
