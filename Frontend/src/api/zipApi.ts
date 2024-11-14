import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const getLocation = async (zip: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/get-city`, {
      zipcode: zip,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
