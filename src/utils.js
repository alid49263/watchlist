export const debounce = (fn, delay) => {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

 export const toastConfig={
    duration: 4000,
    position: 'top-right'
}