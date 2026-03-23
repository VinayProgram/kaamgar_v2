import { useQuery } from "@tanstack/react-query";
import { searchServiceProviders } from "./api";

export const useSearchServiceProviders = (params: {
  categoryId?: string;
  skillIds?: string[];
  lat?: number;
  lng?: number;
  query?: string;
}) => {
  return useQuery({
    queryKey: ["service-providers", "search", params],
    queryFn: () => searchServiceProviders(params),
    enabled: !!(params.categoryId || params.skillIds?.length || params.query),
  });
};
