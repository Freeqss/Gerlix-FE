import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCookie } from "typescript-cookie";
import { login, signUp } from "../api/auth";
import { getAllUsers, getUser } from "../api/user";

const MainPage = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [email, setEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [password, setPassword] = useState("");
  const isUserLoggedIn = !!getCookie("access_token");

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess(res) {
      console.log(res);
    },
    onError() {},
  });

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getAllUsers,
    enabled: isUserLoggedIn,
  });

  const handleLogin = () => {
    mutate({ email: loginEmail, password: loginPassword });
  };

  const handleSignUp = () => {
    signUp({ email: email, password: password }).then((res) => {
      console.log(res);
    });
  };

  const handleGetUserInfoById = (id: string) => {
    getUser({
      user_id: id,
    });
  };

  const handleInputChange = (id: string, value: string) => {
    switch (id) {
      case "loginEmail": {
        setLoginEmail(value);
        break;
      }
      case "loginPassword": {
        setLoginPassword(value);
        break;
      }
      case "email": {
        setEmail(value);
        break;
      }
      case "password": {
        setPassword(value);
        break;
      }
      default: {
        setEmail("");
        setPassword("");
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 items-center">
      <div className="flex gap-4">
        <div className="flex flex-col">
          <input
            id="loginEmail"
            value={loginEmail}
            onChange={(e) => handleInputChange("loginEmail", e.target.value)}
            className="max-w-52 border border-gray-300 rounded-sm"
          />
          <input
            id="loginPassword"
            value={loginPassword}
            onChange={(e) => handleInputChange("loginPassword", e.target.value)}
            className="max-w-52 border border-gray-300 rounded-sm"
          />
          <button onClick={handleLogin} className="w-full max-w-52">
            Login
          </button>
        </div>
        <div className="flex flex-col">
          <input
            id="email"
            value={email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="max-w-52 border border-gray-300 rounded-sm"
          />
          <input
            id="password"
            value={password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="max-w-52 border border-gray-300 rounded-sm"
          />
          <button onClick={handleSignUp} className="w-full max-w-52">
            Sign Up
          </button>
        </div>
      </div>
      <div>{data?.map((user) => <button onClick={() => handleGetUserInfoById(user?.id)}>{user?.email}</button>)}</div>
    </div>
  );
};

export default MainPage;
