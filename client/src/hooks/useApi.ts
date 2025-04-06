import { useEffect, useState } from "react";

export default function useApi<T, U>(
  apiFetchFn: (...params: T[]) => Promise<U>,
  ...params: T[]
) {
  const [data, setData] = useState<U | "LOADING" | "LOADING_ERROR">("LOADING");

  useEffect(() => {
    apiFetchFn(...params)
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) => {
        console.error(error);
        setData("LOADING_ERROR");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFetchFn, ...params]);

  return data;
}
