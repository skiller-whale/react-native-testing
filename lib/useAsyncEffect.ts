import { useEffect } from "react";

export default function useAsyncEffect<Type>(
  effect: (isMounted: () => boolean) => Promise<Type>,
  dependencies?: any[],
) {
  useEffect(
    function () {
      let result: Type;
      let mounted = true;

      const maybePromise = effect(function () {
        return mounted;
      });

      Promise.resolve(maybePromise).then(function (value) {
        result = value;
      });

      return function () {
        mounted = false;
      };
    },
    dependencies,
  );
}
