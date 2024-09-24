"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";

import axios from "axios";
// import { useAuth } from "../../../util/AuthContext";
import { signIn, useSession } from "next-auth/react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter(); //라우터
  //   const { login } = useAuth();

  if (status === "authenticated") {
    //로그인이 되어있으면 홈으로 이동.  next-auth 기본 status : authenticated, unauthenticated, loading
    redirect("/");
  }

  const loginForm = async (e) => {
    e.preventDefault();

    try {
      // 애가 request에 담겨야하는데
      //   const res = await axios.post("/api/login", {
      //     username,
      //     password,
      //   });

      //   if (res.status === 200) {
      //     alert("로그인 성공!!");
      //     // 애를 호출해야지 true 가 되지!!
      //     console.log("sss11 " + JSON.stringify(res.data));
      //     console.log("sss22 " + JSON.stringify(res.data.body[0].id));
      //     login(res.data);
      //     router.push("/");
      //   }
      const result = await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
      });

      if (result.error) {
        console.log("로그인 실패", result.error);
        alert("로그인 실패");
      } else {
        alert("로그인 성공");
      }
    } catch (error) {
      // console.log("1111 " + error);
      // console.log("1111 " + JSON.stringify(error.response));
      if (error.response) {
        // console.log("에러에러");
        alert(error.response.data.msg);
      }
    }
  };

  return (
    // <h1>ddd</h1>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">JSTORY</h2>
        <p className="text-center text-gray-500 mb-8">
          마음을 담아 만드는 JStory
        </p>

        <form onSubmit={loginForm}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              유저네임
            </label>
            <input
              type="text"
              id="username"
              value={username} // 현재 username 상태를 입력 필드에 표시
              onChange={(e) => setUsername(e.target.value)} // 입력 필드의 값이 변경될 때 상태 업데이트
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password} // 현재 username 상태를 입력 필드에 표시
              onChange={(e) => setPassword(e.target.value)} // 입력 필드의 값이 변경될 때 상태 업데이트
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-400 text-white p-2 rounded mt-4"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
