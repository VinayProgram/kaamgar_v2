import api from "@/lib/api";
import { Category } from "./dto";

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/categories");
  return response.data;
};

export const getMainCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/categories/main");
  return response.data;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await api.get<Category>(`/categories/${id}`);
  return response.data;
};

export const getSubcategories = async (parentId: string): Promise<Category[]> => {
  const response = await api.get<Category[]>(`/categories/${parentId}/sub`);
  return response.data;
};


