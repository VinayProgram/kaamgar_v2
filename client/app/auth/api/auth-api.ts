import api from "@/lib/api";
import { RegisterUserDto, LoginDto, AuthResponse } from "./dto";
import { UserType } from "../dto/user";

export const signup = async (data: RegisterUserDto): Promise<any> => {
    const response = await api.post<any>("/auth/register", data);
    return response.data;
};

export const signin = async (data: LoginDto): Promise<any> => {
    const response = await api.post<any>("/auth/login", data);
    return response.data;
};

export const authenticate = async (): Promise<UserType> => {
    const response = await api.get<UserType>("/auth/authenticate");
    return response.data;
};

