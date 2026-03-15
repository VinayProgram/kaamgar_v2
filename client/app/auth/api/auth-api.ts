import api from "@/lib/api";
import { RegisterUserDto, LoginDto, AuthResponse } from "./dto";
import { UserType } from "../dto/user";

export const signup = async (data: RegisterUserDto): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
};

export const signin = async (data: LoginDto): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
};

export const authenticate = async (): Promise<UserType> => {
    const response = await api.get<UserType>("/auth/authenticate");
    return response.data;
};

