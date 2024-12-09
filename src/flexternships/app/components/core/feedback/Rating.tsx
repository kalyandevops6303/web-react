import { useEffect, useState } from 'react';

export default function Rating(props: InputProps) {
  const { rating, ratingText, ratingColor, className, showTotalScore } = props;
  const [ratingArr, setRatingArr] = useState<Array<Number>>([]);
  useEffect(() => {
    let arr: Array<Number> = new Array(5).fill(0);
    const fullRating = Math.floor(rating);
    const partialRating = rating - Math.trunc(rating);
    arr.fill(100, 0, fullRating);
    if (partialRating != 0) arr[fullRating] = Math.round(partialRating * 100);
    setRatingArr(arr);
  }, []);

  if (!rating && rating !== 0) return null;

  return (
    <div className={`flex items-center gap-x-4 ${className ?? ''}`}>
      {ratingText && <span className="font-semibold text-sm text-right text-grey-600 ">{ratingText}</span>}
      <span className="text-right text-sm font-semibold leading-5.5 text-grey-600">
        {rating}
        <span className="text-[var(--Grey-300,#9C9FA1)] text-right font-montserrat text-[14px] font-medium leading-[22px]">
          {showTotalScore && '/5'}
        </span>
      </span>
      <div className="flex space-x-2">
        {ratingArr.map((val, index) => (
          <div
            key={index}
            style={{ borderColor: ratingColor, zIndex: '0' }}
            className="relative w-[2rem] h-[0.625rem] rounded-[0.75rem] border-1 border-solid"
          >
            <div
              style={{
                backgroundColor: ratingColor,
                width: `${val}%`,
                borderTopRightRadius: `${val == 100 ? '0.625rem' : 0}`,
                borderBottomRightRadius: `${val == 100 ? '0.625rem' : 0}`,
              }}
              className="absolute rounded-tl-[0.625rem] rounded-bl-[0.625rem] top-0 bottom-0 left-0"
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

type InputProps = {
  rating: number;
  ratingText?: string;
  ratingColor: string;
  className?: string;
  showTotalScore?: boolean;
};
