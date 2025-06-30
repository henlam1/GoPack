export function isNetworkError(error: unknown) {
  return error instanceof TypeError ? true : false;
}
