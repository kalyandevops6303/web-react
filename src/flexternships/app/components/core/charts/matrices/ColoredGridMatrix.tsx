import { ColoredGridMatrixProps } from '@/flexternships/constraints/types/chart-types';

export default function ColoredGridMatrix({ matrixConfig, matrixData }: ColoredGridMatrixProps) {
  console.log(matrixConfig, matrixData);
  return (
    <div className="flex flex-col gap-y-4">
      {matrixConfig.legend && (
        <div className="flex flex-row gap-x-3">
          <div className="text-xs text-grey-500 font-medium leading-5">Legend:</div>
          {matrixConfig.legend.map((legendItem) => (
            <div className="flex flex-row gap-x-1 items-center">
              <div style={{ backgroundColor: legendItem.color }} className="size-3 rounded-sm" />
              <div className="text-xs text-grey-700 font-normal leading-5">
                {legendItem.rangeMin} - {legendItem.rangeMax}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col items-start">
        <div className="grid grid-flow-row auto-rows-auto gap-3">
          {/* Data rows */}
          {matrixData
            .slice()
            .reverse()
            .map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-flow-col auto-cols-fr gap-3">
                {/* Row label */}
                <div className="text-xs text-grey-700 font-normal max-w-28 truncate mr-2">{row.label}</div>

                {/* Data cells */}
                {Object.entries(row)
                  .filter(([key]) => key !== 'label')
                  .map(([columnName, value]) => {
                    const score = (value as { score: number }).score;
                    const legendItem = matrixConfig.legend?.find(
                      (item) => score >= item.rangeMin && score <= item.rangeMax,
                    );

                    return (
                      <div
                        key={columnName}
                        className="flex items-center justify-center rounded-md max-w-28 min-h-7"
                        style={{
                          backgroundColor: legendItem?.color,
                        }}
                      >
                        <span className="text-sm text-grey-900 font-medium leading-5.5">{score}</span>
                      </div>
                    );
                  })}
              </div>
            ))}

          {/* Header row with column names at bottom */}
          <div className="grid grid-flow-col auto-cols-fr gap-3 mt-2">
            <div className="text-xs text-grey-500 font-medium max-w-28" /> {/* Empty cell for row labels */}
            {Object.keys(matrixData[0])
              .filter((key) => key !== 'label')
              .map((columnName) => (
                <div key={columnName} className="text-xs text-grey-700 font-normal max-w-28 truncate text-center">
                  {columnName}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
