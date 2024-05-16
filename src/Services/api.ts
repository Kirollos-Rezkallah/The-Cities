// Importing necessary modules and dependencies.
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { processErrorHandle } from './errorHandleProcess';

// Defining a type for detailed error messages.
type DetailMessageType = {
  type: string;
  message: string;
};

// Mapping HTTP status codes to boolean values indicating whether to display errors for them.
const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

// Function to determine if an error should be displayed based on the response status.
const shouldDisplayError = (response: AxiosResponse) =>
  !!StatusCodeMapping[response.status];

// Backend URL and request timeout constant definitions.
const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

// Function to create an instance of Axios for API requests.
export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL, // Setting the base URL for API requests.
    timeout: REQUEST_TIMEOUT, // Setting the request timeout.
  });

  // Interceptor to handle responses and errors.
  api.interceptors.response.use(
    // Handling successful responses.
    (response) => response,
    // Handling errors.
    (error: AxiosError<DetailMessageType>) => {
      // Checking if the error has a response and if it should display an error message.
      if (error.response && shouldDisplayError(error.response)) {
        // Extracting the detailed error message from the response data.
        const detailMessage = error.response.data;

        // Handling the error message.
        processErrorHandle(detailMessage.message);
      }

      // Throwing the error for further handling.
      throw error;
    }
  );

  // Returning the configured Axios instance.
  return api;
};
