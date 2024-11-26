import { useEffect, useState } from 'react';

export default function Rating(props: InputProps) {
  const { rating, ratingText, ratingColor, className } = props;
  const [ratingArr, setRatingArr] = useState<Array<Number>>([]);
  useEffect(() => {
    let arr: Array<Number> = new Array(5).fill(0);
    const fullRating = Math.floor(rating);
    const partialRating = rating - Math.trunc(rating);
    arr.fill(100, 0, fullRating);
    if (partialRating != 0) arr[fullRating] = Math.round(partialRating * 100);
    setRatingArr(arr);
  }, []);

  if (!rating) return null;

  return (
    <div className={`flex items-center gap-x-4 ${className ?? ''}`}>
      {ratingText && <span className="font-semibold text-sm text-right text-grey-600 ">{ratingText}</span>}
      <span className="text-right text-grey-600">{rating}</span>
      <div className="flex space-x-2">
        {ratingArr.map((val, index) => (
          <div
            key={index}
            style={{ borderColor: ratingColor }}
            className="relative w-[2rem] h-[0.625rem] rounded-[0.75rem] border border-solid"
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
};
