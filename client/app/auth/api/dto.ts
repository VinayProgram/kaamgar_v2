export type RegistrationType = "user" | "service_provider";

export interface RegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  registrationType?: RegistrationType;
}

export interface LoginDto {
  email: string;
  password?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    registrationType: RegistrationType;
  };
  accessToken: string;
}
