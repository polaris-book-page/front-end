
import { ToastContainer, toast } from 'react-toastify';
import styled from "styled-components";

export const StyledToastConatiner = styled(ToastContainer)`
  margin-top: 100px;
  font-family: 'KOTRA_GOTHIC';
  
  .Toastify__toast {
    background-color: white;
    color: #4659A9;
  }
  .Toastify__toast--info {
    border: 1px solid transparent;
  }
  .Toastify__toast--success {
    border: 1px solid green;
    color: green;
  }
  .Toastify__toast--error {
    border: 1px solid red;
    color: red;
  }
`;

const defaultToastOption = {
  position: 'top-center',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  pauseOnHover: false,
  closeButton: false,
  draggable: true,
  pauseOnHover: true,
  theme: 'light'
};

export const Toast = {
  info: (message, options = {}) => {
    toast.info(message, { ...defaultToastOption, ...options });
  },
  success: (message, options = {}) => {
    toast.success(message, { ...defaultToastOption, ...options });
  },
  error: (message, options = {}) => {
    toast.error(message, { ...defaultToastOption, ...options });
  },
};