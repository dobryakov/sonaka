import { useEffect } from 'react';

export function useInfiniteScroll(onReachEnd: () => void) {
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        onReachEnd();
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onReachEnd]);
}


