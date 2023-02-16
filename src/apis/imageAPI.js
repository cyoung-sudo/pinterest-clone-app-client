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

//----- Delete given image
export const deleteImage = async id => {
  const res = await api.request({
    method: "DELETE",
    url: `/image/${id}`
  });

  return res;
};

//----- Retrieve all images for given user
export const getForUser = async userId => {
  const res = await api.request({
    method: "GET",
    url: `/images/user/${userId}`
  });

  return res;
};

//----- Delete all images for given user
export const deleteForUser = async userId => {
  const res = await api.request({
    method: "DELETE",
    url: `/images/user/${userId}`
  });

  return res;
};