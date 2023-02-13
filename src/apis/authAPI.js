import api from "./configs/axiosConfig";

//----- Logout user
export const logout = async () => {
  const res = await api.request({
    method: "POST",
    url: "/auth/logout"
  });

  return res;
};

//----- Retrieve authenticated user
export const getUser = async () => {
  const res = await api.request({
    method: "GET",
    url: "/auth/user"
  });

  return res;
};