import { useQuery } from "@tanstack/react-query";
import { getCategories, getMainCategories, getCategoryById, getSubcategories } from "./api";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export const useMainCategories = () => {
  return useQuery({
    queryKey: ["categories", "main"],
    queryFn: getMainCategories,
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
};

export const useSubcategories = (parentId: string) => {
  return useQuery({
    queryKey: ["categories", parentId, "sub"],
    queryFn: () => getSubcategories(parentId),
    enabled: !!parentId,
  });
};
