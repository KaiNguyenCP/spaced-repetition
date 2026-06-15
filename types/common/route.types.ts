/**
 * [id] → string
 * [...slug] → string[]
 */
export type RouteContext<
  TParams extends Record<string, string | string[]> = Record<string, string>,
> = {
  params: Promise<TParams>;
};
