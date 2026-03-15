import api from "@/lib/api";

export const getSkills = async () => {
  const response = await api.get("/skills");
  return response.data;
};

export const getSkillById = async (id: string) => {
  const response = await api.get(`/skills/${id}`);
  return response.data;
};
