import { useEffect } from 'react';

const useAutoResizeIframe = (id?: string): void => {
  useEffect(() => {
    const targets = document.body.querySelectorAll('.blog-card iframe');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listen = (e: MessageEvent<any>) => {
      if (Array.isArray(e.data) && e.data[0] === 'set-window-height') {
        const iframe = Array.prototype.find.call(targets, (target: HTMLIFrameElement) => target.dataset.id === e.data[2]);
        if (iframe) iframe.style.height = `${e.data[1]}px`;
      }
    };

    window.addEventListener('message', listen);
    return () => window.removeEventListener('message', listen);
  }, [id]);
};

export default useAutoResizeIframe;
