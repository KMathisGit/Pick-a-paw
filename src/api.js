import axios from "axios";

const options = {
  headers: {
    "x-api-key": process.env.REACT_APP_API_KEY,
  },
};

// Queries thedogapi for a list of available breeds
export const getBreedList = () => {
  return axios.get("https://api.thedogapi.com/v1/breeds");
};

export const getDogImage = (breedId) => {
  return axios.get(
    `https://api.thedogapi.com/v1/images/search?breed_id=${breedId}`
  );
};
