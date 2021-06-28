import { useEffect, useRef } from "react";

const useUpdate = (dep: boolean, fn: () => void) => {
  const isFirst = useRef(true);

  useEffect(() => {
    if(isFirst) {
      isFirst.current = false;
      return;
    }
    fn();
  }, [ dep ]);
}

export default useUpdate;