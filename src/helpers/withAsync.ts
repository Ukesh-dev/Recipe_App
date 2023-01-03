import axios, { AxiosError } from 'axios';
import { TIMEOUT_SEC } from '../config/config';
import { timeout as timeoutFn } from '../js/helpers';

type WithAsyncFn<T = unknown> = () => T | Promise<T>;
type WithAsyncReturn<TData, TError> = {
  response: TData | null;
  error: TError | unknown | AxiosError;
};
export async function withAsync<TData = unknown, TError = AxiosError>(
  fn: WithAsyncFn<TData>,
  timeout: number = TIMEOUT_SEC
): Promise<WithAsyncReturn<TData, TError>> {
  try {
    if (typeof fn !== 'function')
      throw new Error('The first argument must be a function');
    const response = await Promise.race([timeoutFn<TData>(timeout), fn()]);
    // const response = await fn();

    // return response;
    return {
      response,
      error: null,
    };
  } catch (err) {
    let error: unknown;
    if (axios.isAxiosError(err)) {
      error = err.response?.data.message ?? err.message;
    } else {
      error = err;
    }
    throw error;
    // return {
    //   error,
    //   response: null,
    // };
  }
}
