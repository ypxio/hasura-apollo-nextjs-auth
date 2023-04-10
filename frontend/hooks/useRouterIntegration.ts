import React from "react";
import { useRouter } from "next/router";
import { stringify, parseUrl, ParsedQuery } from "query-string";

export default function useRouterIntegration<T>(options: {
  key: string;
  defaultData: T;
}) {
  const router = useRouter();
  const queryWithData = React.useMemo(() => {
    const { query } = parseUrl(router.asPath);
    const parsedQuery = query as ParsedQuery<string | T>;
    try {
      parsedQuery[options.key] = JSON.parse(query[options.key] as string);
    } catch (error) {
      parsedQuery[options.key] = options.defaultData;
    }
    return parsedQuery;
  }, [router, options]);
  const data = queryWithData[options.key] as T;
  const reset = React.useCallback(() => {
    router.replace(
      router.pathname,
      `${parseUrl(router.asPath).url}?${stringify({
        ...queryWithData,
        [options.key]: JSON.stringify(options.defaultData)
      })}`,
      { shallow: true }
    );
  }, [options, queryWithData, router]);
  const handleNextData = React.useCallback(
    (next: T) => {
      router.replace(
        router.pathname,
        `${parseUrl(router.asPath).url}?${stringify({
          ...queryWithData,
          [options.key]: JSON.stringify(next)
        })}`,
        { shallow: true }
      );
    },
    [router, queryWithData, options.key]
  );
  return { data, handleNextData, reset };
}
