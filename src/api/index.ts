import axios from "axios";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";

export const axiosAuthInstance = axios.create({
  baseURL: "http://127.0.0.1:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Интерсептор для добавления токена
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Интерсептор для обработки ошибки и обновления токена
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Если ошибка 401 и мы еще не пробовали обновить токен
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getCookie("refresh_token"); // Получаем refresh токен из cookie
        const response = await axios.post(
          "http://127.0.0.1:3000/refresh", // Путь на сервере для обновления токенов
          {},
          {
            headers: { Authorization: `Bearer ${refreshToken}` }, // Отправляем refresh токен в заголовке
            withCredentials: true, // Для отправки cookies
          },
        );
        // Сохраняем новый access_token
        setCookie("access_token", response.data.access_token);
        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
        return axiosInstance(originalRequest); // Повторяем запрос с новым токеном
      } catch (refreshError) {
        removeCookie("access_token");
        removeCookie("refresh_token");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
