import api from "./configs/axiosConfig";

//----- Create image
export const create = async (ownerId, url) => {
  const res = await api.request({
    method: "POST",
    data: {
      ownerId,
      url
    },
    url: "/images"
  });

  return res;
};