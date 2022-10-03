import { useEffect } from "react";

export const useEvent = (event: any, handler: any, passive = false) => {
  useEffect(() => {
    window.addEventListener(event, handler, passive);

    return function cleanup() {
      window.removeEventListener(event, handler);
    };
  });
};
