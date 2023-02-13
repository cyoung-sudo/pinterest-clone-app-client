import api from "./configs/axiosConfig";

//----- Retrieve given user
export const getUser = async userId => {
  const res = await api.request({
    method: "GET",
    url: `/user/${userId}`
  });

  return res;
};