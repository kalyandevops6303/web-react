import { ProjectTabType } from '@/flexternships/constraints/types/project-details-types';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { userTypes } from '@/utility/constants/Constant';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

const NavigationTab = ({ tab, index, isActive }: { tab: ProjectTabType; index: number; isActive: boolean }) => {
  const userDetails = useFlexternUserStore((state) => state.userDetails);
  const param = useParams();
  const activeTabClass = 'bg-[#0185E41F] text-trublue-secondary-500 border-b-2 border-b-trublue-secondary-500';
  const inactiveTabClass = '';
  const activeIconClass = 'bg-white text-trublue-secondary-500';
  const inactiveIconClass = 'bg-[#9E9E9E1F] text-grey-loadingText';

  return (
    <Link
      to={`/project-details/${param?.projectId}/${tab.id}`}
      key={index}
      className={classNames(
        isActive ? activeTabClass : inactiveTabClass,
        'group duration-200 ease-in-out hover:cursor-pointer hover:text-trublue-secondary-500 first:rounded-tl last:rounded-tr flex flex-row w-fit p-3 items-start justify-start gap-2',
        !(userDetails?.userType === userTypes?.client ? tab.clientVisible : tab.talentVisible) && 'hidden',
      )}
    >
      <div
        className={classNames(
          isActive ? activeIconClass : inactiveIconClass,
          'h-[38px] w-[38px] flex flex-col justify-center items-center border rounded-[5px] group-hover:bg-white group-hover:text-trublue-secondary-500 transition-all ease-in-out',
        )}
      >
        {tab.icon}
      </div>
      <div className="flex flex-col items-start justify-center">
        <h1
          className={classNames(
            isActive ? 'text-trublue-secondary-500' : 'text-grey-800',
            'text-sm group-hover:text-trublue-secondary-500 font-semibold',
          )}
        >
          {tab.title}
        </h1>
        <h1
          className={classNames(
            isActive ? 'text-trublue-secondary-500' : 'text-grey-loadingText',
            'font-light group-hover:text-trublue-secondary-500 text-xs',
          )}
        >
          {tab.description}
        </h1>
      </div>
    </Link>
  );
};

export default NavigationTab;
