export default function Spinner () {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-full h-full max-w-[150px] max-h-[150px] border-4 border-blue-500 border-t-transparent rounded-full animate-spin aspect-square"></div>
    </div>
  );
};

