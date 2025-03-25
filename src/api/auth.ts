import { setCookie } from "typescript-cookie";
import { axiosAuthInstance } from ".";
import { LoginBody, LoginResponse, SignUpBody } from "../types/auth";

export const login = async (body: LoginBody): Promise<LoginResponse> => {
  const { email, password } = body;

  const response = await axiosAuthInstance.post<LoginResponse>("/login", { email, password }).then((response) => {
    setCookie("access_token", response.data.access_token);
    setCookie("refresh_token", response.data.refresh_token);
    return response.data;
  });

  return response;
};

export const signUp = async (body: SignUpBody) => {
  const { email, password } = body;

  const response = await axiosAuthInstance.post("/register", { email, password }).then((response) => {
    return response.data;
  });

  return response;
};
