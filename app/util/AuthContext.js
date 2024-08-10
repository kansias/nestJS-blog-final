"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
// 리액트 라이브러리 중 createContext   //전역변수 개념
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const route = useRouter();

  const login = () => {
    setIsLogin(true);
  };

  const logout = () => {
    setIsLogin(false);
    alert("로그아웃 되었습니다!!");
    route.push("/");
  };

  console.log("로그인 상태 " + isLogin);

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
