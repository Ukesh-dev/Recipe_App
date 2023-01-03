import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosPromise,
  AxiosError,
} from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://forkify-api.herokuapp.com/api/v2/recipes/',
});

const api = (axios: AxiosInstance) => ({
  get: <T>(url: string, config: AxiosRequestConfig = {}) =>
    withLogger<T>(axios.get<T>(url, config)),
  post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
    withLogger<T>(axios.post(url, body, config)),
  put: (url: string, body: unknown, config: AxiosRequestConfig = {}) =>
    axios.put(url, body, config),
  delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
    withLogger<T>(axios.delete(url, config)),
});

const withLogger = async <T>(promise: AxiosPromise<T>) =>
  promise.catch((error: AxiosError) => {
    /*
Always log errors in dev environment
if (process.env.NODE_ENV !== 'development') throw error
*/
    // Log error only if REACT_APP_DEBUG_API env is set to true
    // if (!process.env.REACT_APP_DEBUG_API) throw error;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      // console.log(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest
      // in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    // console.log(error.config);
    throw error;
  });

export default api(axiosInstance);
