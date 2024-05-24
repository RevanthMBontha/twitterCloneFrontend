import axios from "axios";
import {
  API_AUTH_END_POINT,
  API_TWEET_END_POINT,
  API_USER_END_POINT,
} from "./constants";

export const signInMFn = async (userData) => {
  let signInFormData = new FormData();
  signInFormData.append("avatar", userData.profilePicture);

  for (let key in userData) {
    if (key !== "profilePicture") signInFormData.append(key, userData[key]);
  }

  for (let pair of signInFormData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  const response = await axios.post(
    `${API_AUTH_END_POINT}/register`,
    signInFormData,
  );
  return response.data;
};

export const loginMFn = async (userData) => {
  const response = await axios.post(`${API_AUTH_END_POINT}/login`, userData);
  return response.data;
};

export const addNewTweetMFn = async (tweetData) => {
  let tweetFormData = new FormData();

  for (let key in tweetData) {
    tweetFormData.append(key, tweetData[key]);
  }

  for (let pair of tweetFormData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const response = await axiosWithAuth.post(API_TWEET_END_POINT, tweetFormData);
  return response.data;
};

export const likeTweetMFn = async (id) => {
  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const response = await axiosWithAuth.patch(
    `${API_TWEET_END_POINT}/${id}/like`,
    {},
  );
  return response.data;
};

export const dislikeTweetMFn = async (id) => {
  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const response = await axiosWithAuth.patch(
    `${API_TWEET_END_POINT}/${id}/dislike`,
    {},
  );
  return response.data;
};

export const replyToTweetMFn = async (id, tweetData) => {
  let tweetFormData = new FormData();

  for (let key in tweetData) {
    tweetFormData.append(key, tweetData[key]);
  }

  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const response = await axiosWithAuth.post(
    `${API_TWEET_END_POINT}/${id}/reply`,
    tweetFormData,
  );
  return response.data;
};

export const followUserMfn = async (handle) => {
  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const response = await axiosWithAuth.post(
    `${API_USER_END_POINT}/${handle}/follow`,
    {},
  );
  return response.data;
};

export const unFollowUserMfn = async (handle) => {
  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const response = await axiosWithAuth.post(
    `${API_USER_END_POINT}/${handle}/unfollow`,
    {},
  );
  return response.data;
};

export const editUserProfileMFn = async (userData) => {
  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const formData = new FormData();

  for (let key in userData) {
    formData.append(key, userData[key]);
  }

  const response = await axiosWithAuth.patch(
    `${API_USER_END_POINT}/${localStorage.getItem("handle")}`,
    formData,
  );
  return response.data;
};

export const reTweetMfn = async (id, tweetDetails) => {
  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const response = await axiosWithAuth.post(
    `${API_TWEET_END_POINT}/${id}`,
    tweetDetails,
  );
  return response.data;
};

export const deleteTweetMfn = async (id) => {
  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const response = await axiosWithAuth.delete(`${API_TWEET_END_POINT}/${id}`);
  return response.data;
};
