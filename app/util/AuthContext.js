"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
// 리액트 라이브러리 중 createContext   //전역변수 개념
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const route = useRouter();

  // res.data 주기 (userData)
  const login = (userData) => {
    console.log("userData " + JSON.stringify(userData));
    setUser(userData);
    setIsLogin(true);
  };

  const logout = () => {
    setIsLogin(false);
    alert("로그아웃 되었습니다!!");
    route.push("/");
  };

  // console.log("로그인 상태 " + isLogin);
  // console.log("로그인 유저 정보 " + JSON.stringify(user));

  return (
    <AuthContext.Provider value={{ isLogin, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
