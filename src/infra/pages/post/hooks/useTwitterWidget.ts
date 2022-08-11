import { useEffect } from 'react';

const useTwitterWidget = (id?: string) => {
  useEffect(() => {
    const widgets = (window as { twttr?: { widgets: { load: () => void } } })?.twttr?.widgets;
    if (widgets) {
      widgets.load();
    }
  }, [id]);
};

export default useTwitterWidget;
