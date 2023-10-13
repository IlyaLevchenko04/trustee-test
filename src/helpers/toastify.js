import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const sendToast = text =>
  Toastify({
    text,
    duration: 3000,
    destination: 'https://github.com/apvarun/toastify-js',
    newWindow: true,
    close: true,
    gravity: 'top',
    position: 'left',
    stopOnFocus: true,
    style: {
      background: 'linear-gradient(to right, #DC143C, #FF6347)',
    },
    onClick: function () {},
  }).showToast();
