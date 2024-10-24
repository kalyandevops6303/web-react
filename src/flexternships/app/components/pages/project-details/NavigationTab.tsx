import { ProjectTabType } from '@/flexternships/constraints/types/project-details-types';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { userTypes } from '@/utility/constants/Constant';
import { Link, useLocation } from 'react-router-dom';

const NavigationTab = ({ tab, index }: { tab: ProjectTabType; index: number }) => {
  const userDetails = useFlexternUserStore((state) => state.userDetails);
  console.log(userDetails)
  const location = useLocation();
  const isActive = location.pathname.split('/')[3] === tab.id;

  const activeTabClass = 'bg-[#0185E41F] text-[#0185E4] border-b-2 border-b-[#0185E4]';
  const inactiveTabClass = '';
  const activeIconClass = 'bg-white text-[#0185E4]';
  const inactiveIconClass = 'bg-[#9E9E9E1F] text-[#9E9E9E]';

  return (
    <Link
      to={`/project-details/${location.pathname.split('/')[2]}/${tab.id}`}
      key={index}
      className={`${
        isActive ? activeTabClass : inactiveTabClass
      } group ${!(userDetails?.userType === userTypes?.client ? tab.clientVisible : tab.talentVisible) && 'hidden'} duration-200 hover:cursor-pointer hover:text-[#0185E4]   first:rounded-tl last:rounded-tr flex flex-row w-fit px-5 py-3 items-center justify-center gap-2`}
    >
      <div
        className={`px-2 py-2 rounded-sm ${
          isActive ? activeIconClass : inactiveIconClass
        } group-hover:bg-white group-hover:text-[#0185E4]`}
      >
        {tab.icon}
      </div>
      <div className="flex flex-col items-start justify-center">
        <h1 className={`font-semibold ${isActive ? 'text-[#0185E4]' : 'text-[#9E9E9E]'} group-hover:text-[#0185E4]`}>
          {tab.title}
        </h1>
        <h1 className={`${isActive ? 'text-[#0185E4]' : 'text-[#9E9E9E]'} group-hover:text-[#0185E4] text-xs md:text-sm`}>
          {tab.description}
        </h1>
      </div>
    </Link>
  );
};

export default NavigationTab;
