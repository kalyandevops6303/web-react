import FilledStar from '@src/assets/images/filler_star.png';

const RatingInfo = ({rating}:{
  rating: number;
}) => {
  return (
    <div className="flex flex-row items-center gap-2 text-xs">
      <div className="bg-orange-100 px-1 gap-1 py-1 flex flex-row items-center">
        <img height={12} width={12} src={FilledStar} alt="Filled star" />
        <h1 className="font-semibold ">{parseFloat(rating.toFixed(1))}</h1>
      </div>
    </div>
  );
};

export default RatingInfo;
