import axios from "axios";
import {
  API_AUTH_END_POINT,
  API_TWEET_END_POINT,
  API_USER_END_POINT,
} from "./constants";

export const checkHandleAvailabilityFn = async (username) => {
  const response = await axios.get(
    `${API_AUTH_END_POINT}/checkHandleAvailability/${username}`,
  );
  return response.data.isAvailable;
};

export const checkExistingEmailFn = async (email) => {
  const response = await axios.get(
    `${API_AUTH_END_POINT}/checkExistingEmail/${email}`,
  );
  return response.data.alreadyExists;
};

export const getUserFn = async (id) => {
  const axiosWithAuth = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const response = await axiosWithAuth.get(`${API_USER_END_POINT}/${id}`);
  return response.data;
};

export const getUserWithIDFn = async (id) => {
  const axiosWithAuth = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const response = await axiosWithAuth.get(`${API_USER_END_POINT}/user/${id}`);
  return response.data;
};

export const getTweetsByUserFn = async (id) => {
  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const response = await axiosWithAuth.get(
    `${API_USER_END_POINT}/${id}/tweets`,
  );
  return response.data;
};

export const getRepliesByUserFn = async (id) => {
  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const response = await axiosWithAuth.get(
    `${API_USER_END_POINT}/${id}/replies`,
  );
  return response.data;
};

export const getPostsLikedByUserFn = async (id) => {
  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const response = await axiosWithAuth.get(`${API_USER_END_POINT}/${id}/likes`);
  return response.data;
};

export const getTweetsFn = async () => {
  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const response = await axiosWithAuth.get(API_TWEET_END_POINT);
  return response.data;
};

export const getTweetFn = async (id) => {
  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const response = await axiosWithAuth.get(`${API_TWEET_END_POINT}/${id}`);
  return response.data;
};

export const getPopularUsersFn = async () => {
  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const response = await axiosWithAuth.get(`${API_USER_END_POINT}/popular`);
  return response.data;
};
