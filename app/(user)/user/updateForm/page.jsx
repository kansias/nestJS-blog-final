"use client";

import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../util/AuthContext";

export default function UpdateForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkPassowrd, setCheckPassowrd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(null); // true, false 값

  const { user } = useAuth();
  const userId = user && user.body[0].id;
  console.log("userId = " + userId);

  const oldPasswordCheck = useCallback(
    // db에 한번 더 들어가지 말고, null 값이면 바로 return
    // value = 유저네임에 입력되는 값!
    debounce(async (value) => {
      // console.log("111111111" + value);
      if (value === "") {
        setOldPassword(null);
        return;
      }

      // console.log("왜안타");
      try {
        const res = await axios.post("/api/usernameCheck", {
          username: value,
        });

        if (res.status === 200) {
          console.log("성공");
          setCheckUsername(true);
        }
      } catch (error) {
        if (error.response) {
          // console.log("에러에러");
          setCheckUsername(false);
          // alert(error.response.data.msg);
        }
      }
    }, 500),
    [username]
  );

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://via.placeholder.com/80"
            alt="profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <p className="mt-4 text-lg font-semibold">ssar</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm">기존 비밀번호</label>
            <div className="relative">
              <input
                type="password"
                id="oldPassword"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
                ★
              </span>
            </div>
          </div>
          <div>
            <label className="block text-gray-600 text-sm">수정 비밀번호</label>
            <input
              type="password"
              id="newPassword"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm">비밀번호 확인</label>
            <input
              type="password"
              id="checkPassowrd"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={checkPassowrd}
              onChange={(e) => setCheckPassowrd(e.target.value)}
            />
          </div>
          <div>
            {/* TODO : 개발자 모드에서 이메일 value값 변경 되니까 서버에서 막아야함  */}
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value="ssar@nate.com"
              readOnly
            />
          </div>
        </div>
        <button
          className="w-full mt-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          disabled
        >
          회원정보수정
        </button>
      </div>
    </div>
  );
}
