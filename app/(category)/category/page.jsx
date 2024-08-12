"use client";

import { useEffect, useState } from "react";
// 애한테 로그인 id 받아오기
import { useAuth } from "../../../app/util/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CategoryForm() {
  const [categoryName, setCategoryName] = useState("");
  const { user } = useAuth();
  console.log("user = " + JSON.stringify(user));
  const userId = user && user.body[0].id;
  console.log("userId = " + userId);
  const router = useRouter();

  useEffect(() => {
    // user가 null일 경우 로그인 페이지로 리다이렉트
    if (!user) {
      alert("로그인이 필요합니다.");
      router.push("/uesr/loginForm");
    }
  }, [user, router]); // user가 변경될 때마다 체크

  // 전송할거
  const submitCategory = async (e) => {
    e.preventDefault();

    try {
      // 애가 request에 담겨야하는데
      const res = await axios.post("/api/category", {
        userId,
        categoryName,
      });

      if (res.status === 200) {
        alert("성공!!");
        console.log("sss11 " + JSON.stringify(res.data));
        console.log("sss22 " + JSON.stringify(res.data.body[0].id));
        // login(res.data);
        // router.push("/");
      }
    } catch (error) {
      if (error.response) {
        // console.log("에러에러");
        alert(error.response.data.msg);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          JStory 카테고리 등록
        </h2>

        <form onSubmit={submitCategory}>
          <div className="mb-4">
            <input
              type="text"
              id="category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="카테고리명을 작성해주세요"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-400 text-white p-2 rounded mt-4"
          >
            카테고리 등록
          </button>
        </form>
      </div>
    </div>
  );
}
