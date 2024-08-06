import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

type TUseInfinityScroll<T> = {
  handleRefetch: () => Promise<void>;
  loading: boolean;
  refetching: boolean;
  data: T[];
};

export const useInfinityScroll = <T>(
  fn: (pageNew?: number) => Promise<T[]>,
  triggers: unknown[] = []
): TUseInfinityScroll<T> => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refetching, setRefetching] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [end, setEnd] = useState(false);

  const handleRefetch = async (): Promise<void> => {
    if (loading || end) {
      return;
    }

    setRefetching(true);

    const pageNew = page + 1;

    setPage(pageNew);

    const fnResult = await fn(pageNew);

    if (!fnResult.length) {
      setEnd(true);

      return;
    }

    setData([...data, ...fnResult]);
    setRefetching(false);
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setEnd(false);
        setLoading(true);
        setPage(0);
        const fnFetResultado = await fn();

        setData(fnFetResultado);
        setLoading(false);
      })();
    }, [...triggers])
  );

  return {
    handleRefetch,
    loading,
    data,
    refetching,
  };
};
