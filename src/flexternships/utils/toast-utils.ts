import { toast, ToastOptions } from 'react-hot-toast';
import { ToastType } from '../constraints/enums/core-enums';

/**
 * Displays a toast message with appropriate styling based on the message type.
 * @param type - The type of toast message (ERROR, SUCCESS, or default).
 * @param message - The content of the toast message.
 */
const ShowToastMessage = (type: ToastType, message: string) => {
  const options = {
    position: 'top-center',
    duration: 6000,
    className: 'flex gap-x-2 p-2 text-xs',
    icon: '👍',
  } as ToastOptions;
  switch (type) {
    case ToastType.ERROR:
      toast.error(message, { ...options, icon: '❌' });
      break;
    case ToastType.SUCCESS:
      toast.success(message, { ...options, icon: '✅' });
      break;
    default:
      toast(message, { ...options, icon: 'ℹ️' });
      break;
  }
};
export default ShowToastMessage;
