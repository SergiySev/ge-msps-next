import { createSearchParamsCache, parseAsBoolean, parseAsInteger } from 'nuqs/server';

export const searchParamsParsers = {
  itemsPerPage: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  sorting: parseAsBoolean.withDefault(false).withOptions({ shallow: false }),
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
