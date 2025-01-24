import { useEffect, useState } from 'react';

export default function CustomPieChartTooltip({ payload, totalCount }: { payload: any; totalCount: number }) {
  const [label, setLabel] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    setLabel(payload[0]?.payload?.label);
    setValue(payload[0]?.payload?.count);
    setPercentage(parseFloat(((payload[0]?.payload?.count / totalCount) * 100).toFixed(2)));
    setColor(payload[0]?.payload?.fill);
  }, [payload]);

  return (
    <div className="bg-white flex flex-col items-start gap-1 py-2 px-3 rounded-md shadow-custom-pieChart-shadow">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }}></div>
        <p className="text-grey-700 font-montserrat text-xs font-normal leading-5">{label}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-center text-dark leading-5.5">{value}</span>
        <div className="w-[1px] h-5 rounded-10 bg-grey-50"></div>
        <p className="text-sm font-semibold text-center text-dark">{percentage}%</p>
      </div>
    </div>
  );
}
