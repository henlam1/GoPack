import React, { useRef } from 'react';

export const useDynamicRefs = <T,>() => {
  const refs = useRef<{ [key: string]: React.RefObject<T> }>({});

  const getRef = (key: string) => {
    if (!refs.current[key]) {
      refs.current[key] = React.createRef<T>();
    }
    return refs.current[key];
  };

  return getRef;
};
