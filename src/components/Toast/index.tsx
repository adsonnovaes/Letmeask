import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.scss';

type ToastProps = {
  type: string;
  message: string;
}

export function showToast({ type, message }: ToastProps) {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'warn':
      toast.warn(message);
      break;
    case 'error':
      toast.error(message);
      break;
    default:
      toast.info(message);
  }
};

export function Toast() {
  return (
    <ToastContainer
      autoClose = {6000}
      position = 'bottom-right'
    />
  );
}