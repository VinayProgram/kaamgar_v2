import api from "@/lib/api";
import { LoginValues, SignUpValues } from "@/lib/validations/auth";

export const signup = async (data: SignUpValues, userType: "consumer" | "kaamgar") => {
    // API endpoint based on userType (kaamgar is service-provider in backend)
    const endpoint = userType === "consumer" ? "/consumer/users/register" : "/service-provider/users/register";
    const response = await api.post(endpoint, data);
    return response.data;
};



export const signin = async (data: LoginValues, userType: "consumer" | "kaamgar") => {
    // API endpoint based on userType (kaamgar is service-provider in backend)
    const endpoint = userType === "consumer" ? "/consumer/users/login" : "/service-provider/users/login";
    const response = await api.post(endpoint, data);
    return response.data;
};
