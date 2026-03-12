import api from "@/lib/api";
import { LoginValues, SignUpValues } from "@/app/auth/schema/auth";
import { UserType } from "../dto/user";

export const signup = async (data: SignUpValues) => {
    console.log(data)
    // API endpoint based on userType (kaamgar is service-provider in backend)
    const endpoint = "/auth/register";
    const response = await api.post(endpoint, data);
    return response.data;
};



export const signin = async (data: LoginValues) => {
    // API endpoint based on userType (kaamgar is service-provider in backend)
    const endpoint = "/auth/login";
    const response = await api.post(endpoint, data);
    return response.data;
};

export const authenticate = async () => {
    const response = await api.get<UserType>("/auth/authenticate");
    return response.data;
};
