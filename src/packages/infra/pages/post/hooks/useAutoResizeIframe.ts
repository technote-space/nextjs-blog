import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <T extends (...args: any[]) => unknown>(
  callback: T,
  delay = 250,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};

const useAutoResizeIframe = (): void => {
  useEffect(() => {
    const targets = document.body.querySelectorAll('.blog-card iframe');
    targets.forEach(target => {
      const iframe = target as HTMLIFrameElement;
      const contentWindow = iframe.contentWindow;
      if (contentWindow) {
        const setHeight = () => {
          iframe.style.height = contentWindow.document.body.scrollHeight + 'px';
          console.log(iframe.style.height);
        };
        contentWindow.onload = () => {
          iframe.style.width = '100%';
          setHeight();
        };
        contentWindow.onresize = debounce(setHeight);
      }
    });
  }, []);
};

export default useAutoResizeIframe;
