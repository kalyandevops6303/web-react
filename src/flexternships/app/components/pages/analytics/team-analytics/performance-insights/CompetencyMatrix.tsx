import ColoredGridMatrix from '@/flexternships/app/components/core/charts/matrices/ColoredGridMatrix';
import MatrixSkeleton from '@/flexternships/app/components/core/skeletons/MatrixSkeleton';
import { ColoredGridMatrixProps } from '@/flexternships/constraints/types/chart-types';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

export default function CompetencyMatrix({ competencyId }: CompetencyMatrixProps) {
  const [matrixData, setMatrixData] = useState<ColoredGridMatrixProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    // TODO: Fetch matrix data
    setTimeout(() => {
      setMatrixData({
        matrixConfig: {
          legend: [
            { color: '#FEF2D5', rangeMin: 0, rangeMax: 4 },
            { color: '#FFB977', rangeMin: 4.1, rangeMax: 6 },
            { color: '#B2DAF7', rangeMin: 6.1, rangeMax: 8 },
            { color: '#3DCC7D', rangeMin: 8.1, rangeMax: 10 },
          ],
        },
        matrixData: [
          {
            label: 'Milestone 1',
            Bryant: { score: 8.5 },
            Meghan: { score: 4.2 },
            Alex: { score: 6.7 },
            Venkateshwara: { score: 3.1 },
            Emma: { score: 9.2 },
            Sophia: { score: 5.8 },
          },
          {
            label: 'Milestone 2',
            Bryant: { score: 7.3 },
            Meghan: { score: 5.9 },
            Alex: { score: 4.5 },
            Venkateshwara: { score: 8.4 },
            Emma: { score: 2.8 },
            Sophia: { score: 7.1 },
          },
          {
            label: 'Milestone 3',
            Bryant: { score: 3.7 },
            Meghan: { score: 8.8 },
            Alex: { score: 5.2 },
            Venkateshwara: { score: 6.9 },
            Emma: { score: 4.6 },
            Sophia: { score: 9.3 },
          },
          {
            label: 'Milestone 4',
            Bryant: { score: 6.4 },
            Meghan: { score: 9.5 },
            Alex: { score: 3.4 },
            Venkateshwara: { score: 7.8 },
            Emma: { score: 5.7 },
            Sophia: { score: 4.9 },
          },
        ],
      });
      setIsLoading(false);
    }, 1000);
  }, [competencyId]);

  // Show Skeleton while loading
  if (isLoading) return <MatrixSkeleton className="self-start" rows={4} cols={5} gridItemClassName="h-7 w-28" />;
  // Show message if no data is found
  if (isEmpty(matrixData)) return <div>No data found</div>;

  return <ColoredGridMatrix {...matrixData} />;
}

type CompetencyMatrixProps = {
  competencyId: string;
};
