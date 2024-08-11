"use client";

import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";

export default function JoinForm() {
  const [username, setUsername] = useState("");
  const [checkUsername, setCheckUsername] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState(true);

  // 유저네임 실시간 체크 시작 (db랑)
  const usernameCheck = useCallback(
    // db에 한번 더 들어가지 말고, null 값이면 바로 return
    // value = 유저네임에 입력되는 값!
    debounce(async (value) => {
      // console.log("111111111" + value);
      if (value === "") {
        setCheckUsername(null);
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

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setUsername(value); // username 상태 업데이트
    usernameCheck(value);
  };
  // 유저네임 실시간 체크 끝

  // 비밀번호 / 비밀번호 일치 여부 확인 로직 시작
  const handleChange = (e) => {
    e.preventDefault();

    const { id, value } = e.target;

    // password랑 confirmPassword 에게 value 값 할당
    if (id === "password") {
      console.log("password " + value);
      setPassword(value);
    } else if (id === "confirmPassword") {
      console.log("confirmPassword " + value);
      setConfirmPassword(value);
    }
  };

  const checkPasswords = useCallback(
    debounce((password) => {
      if (password !== confirmPassword) {
        setCheckPassword(false);
      } else {
        setCheckPassword(true);
      }
    }, 1000),
    // 의존성 내부에 있는 값이 변경되지 않는 이상 값이 초기화 되지 않는다
    [password, confirmPassword]
  );

  useEffect(() => {
    checkPasswords(password);
  }, [password, confirmPassword]);

  // 비밀번호 / 비밀번호 일치 여부 확인 로직 끝!!

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">JSTORY</h2>
        <p className="text-center text-gray-500 mb-8">
          마음을 담아 만드는 JStory
        </p>

        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              유저네임
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {checkUsername === true && (
              <span className="text-green-500 mb-2">
                사용가능한 아이디입니다
              </span>
            )}
            {checkUsername === false && (
              <span className="text-red-500 mb-2">중복된 아이디입니다</span>
            )}
            {checkUsername === null && <span></span>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {!checkPassword && (
              <span className="text-red-500 mb-2">
                비밀번호가 일치하지 않습니다
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              이메일
            </label>
            <div className="flex">
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-l mt-1"
              />
              <button className="bg-green-500 text-white px-4 rounded-r mt-1">
                인증하기
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-400 text-white p-2 rounded mt-4"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
