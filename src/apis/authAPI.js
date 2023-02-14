import api from "./configs/axiosConfig";

//----- Login user
export const login = async (username, password) => {
  const res = await api.request({
    method: "POST",
    data: {
      username,
      password
    },
    url: "/auth/login"
  });

  return res;
};

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