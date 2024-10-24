import FilledStar from '@src/assets/images/filler_star.png';

const RatingInfo = () => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="bg-orange-100 px-1 gap-2 py-1 flex flex-row items-center">
        <img height={14} src={FilledStar} alt="Filled star" />
        <h1 className="font-semibold">4.8</h1>
      </div>
      <h1>56 Projects</h1>
    </div>
  );
};

export default RatingInfo;
