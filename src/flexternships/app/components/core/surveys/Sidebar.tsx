import { Check, User } from 'react-feather';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const Sidebar = ({ data, onChange }: { data: any; onChange: (userId: any) => void }) => {
  return (
    <div className="flex flex-col items-center gap-4 justify-center">
      {data.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className={`${item?.isActive ? 'bg-sky-100 border border-sky-300' : 'border border-white'} 
            ${!item?.completed ? 'cursor-pointer' : ''}
            flex flex-row w-[400px] justify-between rounded-[6px] bg-white shadow-[0px_8px_12px_0px_rgba(0,0,0,0.04)] p-4 items-center gap-6 self-stretch`}
          
            onClick={() => {
              !item?.completed && onChange(item?.userId);
            }}
          >
            <div className="flex flex-row items-center gap-2">
              <Avatar>
                <AvatarImage src={item.image} />
                <AvatarFallback>
                  <User color="#6E6B7B" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start justify-start">
                <h1 className="text-[14px] font-montserrat font-semibold leading-[22px] text-[#6E6B7B]">
                  {item?.name}
                </h1>
                <h2 className="text-[14px] font-montserrat font-normal leading-[22px] text-[#6E6B7B]">{item?.role}</h2>
              </div>
            </div>

            {item?.completed ? (
              <div className="bg-green-500 rounded-full text-white p-1 font-semibold">
                <Check size={15} />
              </div>
            ) : (
              <h1 className="text-[14px] font-montserrat font-semibold leading-[22px] text-[#6E6B7B]">
                {item?.lastMessageTime}
              </h1>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
