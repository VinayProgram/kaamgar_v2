import api from "@/lib/api";

export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

export const getMainCategories = async () => {
  const response = await api.get("/categories/main");
  return response.data;
};

export const getCategoryById = async (id: string) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};

export const getSubcategories = async (parentId: string) => {
  const response = await api.get(`/categories/${parentId}/sub`);
  return response.data;
};
