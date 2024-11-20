import { Check } from 'react-feather';

const Sidebar = ({ data }: { data: any }) => {
  return (
    <div className="flex flex-col items-center gap-4 justify-center">
      {data.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className={`${
              item?.isActive ? 'bg-sky-100 border border-sky-400' : ''
            } flex flex-row cursor-pointer items-center w-[400px] hover:bg-sky-100 hover:border hover:border-sky-400 bg-white border rounded-lg justify-between gap-20 px-4 py-5`}
          >
            <div className="flex flex-row items-center gap-2">
              <img src={item.image} alt="avatar" className="w-8 h-8 rounded-full" />
              <div className="flex flex-col items-start justify-start">
                <h1 className="font-semibold text-sm">{item?.name}</h1>
                <h2 className="font-normal text-sm text-grey">{item?.role}</h2>
              </div>
            </div>

            {item?.completed ? (
              <div className="bg-green-500 rounded-full text-white p-1 font-semibold">
                <Check size={15} />
              </div>
            ) : (
              <h1 className="font-semibold">{item?.lastMessageTime}</h1>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
