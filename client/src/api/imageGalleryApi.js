import axios from "axios";

const imageGalleryApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// axios.defaults.headers.common["Content-Type"] = "application/json";

export const getImages = async () => {
  const response = await imageGalleryApi.get("/photos");
  return response.data;
};

export const addImages = async (images) => {
  return await imageGalleryApi.post("/photos", images);
};
export const updateImages = async (images) => {
  return await imageGalleryApi.patch("/photos", images);
};
export const deleteImages = async (images) => {
  const data = { resources: images };
  return await imageGalleryApi.delete(`/photos/delete`, {
    data,
  });
};
export const deleteSingleImage = async (image) => {
  const id = image.public_id.split("/");
  // ${id[1]}
  return await imageGalleryApi.delete(`/photos/delete/${id[id.length - 1]}`);
};
export default imageGalleryApi;
