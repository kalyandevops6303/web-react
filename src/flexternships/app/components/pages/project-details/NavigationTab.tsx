import { ProjectTabType } from '@/flexternships/constraints/types/project-details-types';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { userTypes } from '@/utility/constants/Constant';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';

const NavigationTab = ({
  tab,
  index,
  isActive,
  isDisabled,
}: {
  tab: ProjectTabType;
  index: number;
  isActive: boolean;
  isDisabled: boolean;
}) => {
  const userDetails = useFlexternUserStore((state) => state.userDetails);
  const param = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isDisabled) {
      navigate(`/project-details/${param?.projectId}/${tab.id}`);
    }
  };

  return (
    <div
      key={index}
      onClick={handleClick}
      className={classNames(
        {
          'bg-[#0185E41F] text-trublue-secondary-500 border-b-2 border-b-trublue-secondary-500': isActive,
          hidden: !(userDetails?.userType === userTypes?.client ? tab.clientVisible : tab.talentVisible),
          'pointer-events-none opacity-50': isDisabled,
        },
        'group duration-200 ease-in-out first:rounded-tl last:rounded-tr flex flex-row w-fit p-3 items-start justify-start gap-2 cursor-pointer',
      )}
    >
      <div
        className={classNames(
          { 'bg-white text-trublue-secondary-500': isActive, 'bg-[#9E9E9E1F] text-grey-loadingText': !isActive },
          { 'bg-[#9e9e9e1f] ': isDisabled },
          'h-[38px] w-[38px] flex flex-col justify-center items-center border rounded-[5px] group-hover:bg-white group-hover:text-trublue-secondary-500 transition-all ease-in-out',
        )}
      >
        {tab.icon}
      </div>
      <div className="flex flex-col items-start justify-center">
        <h1
          className={classNames(
            { 'text-trublue-secondary-500': isActive, 'bg-muted-800': !isActive },
            'text-sm group-hover:text-trublue-secondary-500 font-semibold',
            { 'text-grey-800': isDisabled },
          )}
        >
          {tab.title}
        </h1>
        <h1
          className={classNames(
            { 'text-trublue-secondary-500': isActive, 'bg-muted-800': !isActive },
            'font-light group-hover:text-trublue-secondary-500 text-xs',
            { 'text-grey-loadingText': isDisabled },
          )}
        >
          {tab.description}
        </h1>
      </div>
    </div>
  );
};

export default NavigationTab;
