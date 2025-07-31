import apiService from './api/AppServices.ts';
import {EndPoints} from './api/EndPoints';

export const findLocation = async (lat: string, long: string, orderId: string) => {
    console.log({lat, long, orderId})
  try {
    const response = await apiService.post(
      EndPoints.location,
      {lat, long, orderId},
      false,
    );

    return response.data; // Adjust the return based on your API response structure
  } catch (error: any) {
    const errorDetails = error.response?.data?.message;
    const errorMessage = errorDetails?.message || 'An unknown error occurred';
    const errorCode = error.response?.status || 500; // Default to 500 if no status

    // Throw a structured error
    throw {message: errorMessage, code: errorCode};
  }
};
