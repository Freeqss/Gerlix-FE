import axiosInstance from ".";

export const getUser = async (body: { user_id: string }): Promise<{ email: string }> => {
  const { user_id } = body;
  const response = await axiosInstance.get<{ email: string }>("/user", { params: { user_id } }).then((response) => {
    return response.data;
  });

  return response;
};

export const getUserInfo = async () => {
  const response = await axiosInstance.get("/user/info").then((response) => {
    return response.data;
  });

  return response;
};

export const getAllUsers = async (): Promise<{ id: string; email: string }[]> => {
  const response = await axiosInstance.get<{ id: string; email: string }[]>("/user/all").then((response) => {
    return response.data;
  });

  return response;
};
