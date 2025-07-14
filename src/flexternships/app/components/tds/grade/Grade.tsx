import { GradeProps } from './types';

export const Grade: React.FC<GradeProps> = ({ value, onClick, size = 28, textSize = 18 }) => {
  const getGradeStyles = (value: string) => {
    switch (value) {
      case 'A':
        return 'border-[#00BCD4] text-[#00BCD4]';
      case 'B':
        return 'border-[#28C76F] text-[#28C76F]';
      case 'C':
        return 'border-[#FBC02D] text-[#FBC02D]';
      case 'D':
        return 'border-[#FF9F43] text-[#FF9F43]';
      case 'E':
        return 'border-[#EA5455] text-[#EA5455]';
      default:
        return 'border-red-500 text-red-500';
    }
  };

  const gradeElement = (
    <div
      className={`
                flex items-center justify-center
                border rounded-full
                font-montserrat font-semibold
                ${getGradeStyles(value)}
                ${onClick ? 'cursor-pointer' : ''}
            `}
      style={{
        width: size,
        height: size,
        fontSize: textSize,
      }}
      onClick={onClick}
    >
      {value}
    </div>
  );

  // Only wrap in a container if onClick is provided
  return onClick ? <div className="flex items-center gap-2">{gradeElement}</div> : gradeElement;
};
