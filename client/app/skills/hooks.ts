import { useQuery } from "@tanstack/react-query";
import { getSkills, getSkillById } from "./api";

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });
};

export const useSkill = (id: string) => {
  return useQuery({
    queryKey: ["skills", id],
    queryFn: () => getSkillById(id),
    enabled: !!id,
  });
};
