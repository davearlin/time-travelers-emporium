import { toast } from 'react-hot-toast';
import { useToastHistory } from '../contexts/ToastHistoryContext';

export const useTrackedToast = () => {
  const { addNotification } = useToastHistory();

  const trackedToast = {
    success: (message: string) => {
      addNotification(message, 'success');
      return toast.success(message);
    },
    error: (message: string) => {
      addNotification(message, 'error');
      return toast.error(message);
    },
    loading: (message: string) => {
      addNotification(message, 'loading');
      return toast.loading(message);
    },
    custom: (message: string) => {
      addNotification(message, 'custom');
      return toast(message);
    },
    // For cases where we want to dismiss loading toasts
    dismiss: toast.dismiss,
  };

  return trackedToast;
};
