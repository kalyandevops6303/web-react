import { toast } from 'react-hot-toast';

const ShowToastMessage = (type, message) => {
  const options = {
    position: 'top-center',
  };

  switch (type) {
    case 'error':
      toast.error(message, options);
      break;
    case 'success':
      toast.success(message, options);
      break;
    default:
      toast(message, options);
      break;
  }
};
export default ShowToastMessage;
