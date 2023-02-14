import api from "./configs/axiosConfig";

//----- Create user
export const create = async (username, password) => {
  const res = await api.request({
    method: "POST",
    data: {
      username,
      password
    },
    url: "/users"
  });

  return res;
};

//----- Retrieve given user
export const getUser = async userId => {
  const res = await api.request({
    method: "GET",
    url: `/user/${userId}`
  });

  return res;
};