"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

// 리액트 라이브러리 중 createContext   //전역변수 개념
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const route = useRouter();

  // 쿠키에서 로그인 정보 복원
  // useEffect(() => {
  //   const user = Cookies.get("user");
  //   if (user) {
  //     setUser(JSON.parse(user));
  //     setIsLogin(true);
  //   }
  // }, []);

  // res.data 주기 (userData)
  // 사용자가 로그인할 때 전달되는 데이터. 사용자의 정보(예: 사용자 ID, 이름, 이메일 등)를 포함
  const login = (userData) => {
    // console.log("userData " + JSON.stringify(userData));
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
