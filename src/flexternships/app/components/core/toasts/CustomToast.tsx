import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { Info, X } from 'react-feather';
import toast from 'react-hot-toast';

export default function CustomToast(props: ToastProps) {
  const { type, title, description, toastId } = props;

  const styles = {
    [ToastType.SUCCESS]: 'border-l-[#004280] bg-[#e3f3ff] text-[#004280]',
    [ToastType.ERROR]: 'border-l-[#FF0000] bg-[#FFE3E3] text-[#FF0000]',
  };

  return (
    <div
      className={`rounded-md border-l-4 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] w-[97vw] flex p-4 items-center justify-between gap-6 text-xs ${styles[type]}`}
    >
      <div className="flex items-center gap-2">
        <Info size={16} color={type === ToastType.SUCCESS ? '#004280' : '#FF0000'} />
        <div>
          <span className={`font-montserrat text-[14px] font-semibold leading-normal ${styles[type]}`}>{title}</span>
          <span className={`font-montserrat text-[14px] font-medium leading-normal ${styles[type]}`}>
            {title && ' - '}
            {description}
          </span>
        </div>
      </div>
      <div
        className="cursor-pointer"
        onClick={() => {
          toast.dismiss(toastId);
        }}
      >
        <X className="opacity-50" size={15} />
      </div>
    </div>
  );
}

type ToastProps = {
  title?: string;
  description: string;
  type: ToastType;
  toastId?: string;
};
