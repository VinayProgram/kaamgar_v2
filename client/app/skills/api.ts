import api from "@/lib/api";
import { Skill } from "./dto";

export const getSkills = async (): Promise<Skill[]> => {
  const response = await api.get<Skill[]>("/skills");
  return response.data;
};

export const getSkillById = async (id: string): Promise<Skill> => {
  const response = await api.get<Skill>(`/skills/${id}`);
  return response.data;
};


