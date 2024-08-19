"use client";

import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../util/AuthContext";

export default function UpdateForm() {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordConfirm, setOldPasswordConfirm] = useState(null);

  const [newPassword, setNewPassword] = useState("");
  const [checkNewPassowrd, setNewCheckPassowrd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(null); // true, false 값

  const [showPassword, setShowPassword] = useState(false); // 비밀번호 눈

  // 기존 비밀번호랑 수정 비밀번호가 같으면 안되게 할 것임
  const [oldPassAndNewPass, setOldPassAndNewPass] = useState(null);

  // 별 클릭시 동작하는 이벤트 핸들러 생성
  const togglePasswordVisible = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (oldPassword === "" && newPassword === "") {
      setOldPassAndNewPass(null); // 둘 다 비어있으면 null
    } else if (oldPassword === newPassword) {
      setOldPassAndNewPass(false); // 비밀번호가 같으면 false
    } else {
      setOldPassAndNewPass(true); // 비밀번호가 다르면 true
    }
  }, [newPassword, oldPassword]);

  // 기존 비밀번호랑 수정 비밀번호가 같으면 안되게 할 것임

  const { user } = useAuth();
  const userId = user && user.body[0].id;
  const username = user && user.body[0].username;
  // console.log("userId = " + userId);

  // 기존 비밀번호 실시간 체크
  const oldPasswordCheck = useCallback(
    debounce(async (value) => {
      // console.log("value 확인 " + value);
      if (value === "") {
        setOldPasswordConfirm(null);
        return;
      }

      // console.log("왜안타");
      try {
        const res = await axios.get("/api/userUpdateForm/oldPassCheck", {
          params: { oldPassword: value, userId },
        });

        if (res.status === 200) {
          console.log("성공");
          setOldPasswordConfirm(true);
        }
      } catch (error) {
        if (error.response) {
          setOldPasswordConfirm(false);
        }
      }
    }, 800),
    [oldPassword]
  );

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    console.log("value 확인 " + value);
    setOldPassword(value);
    oldPasswordCheck(value);
  };

  // 기존 비밀번호 실시간 체크 끝

  // 수정 비밀번호와 비밀번호 확인 비교 로직

  const newPasswordAndPasswordCheck = (e) => {
    e.preventDefault();

    const { id, value } = e.target;
    // console.log("front id " + id);
    // console.log("front value " + value);

    if (id === "newPassword") {
      setNewPassword(value);
    } else if (id === "checkNewPassowrd") {
      setNewCheckPassowrd(value);
    }
  };

  const handelConfirmPassword = useCallback(
    debounce((newPassword) => {
      if (newPassword === "" && checkNewPassowrd === "") {
        setConfirmPassword(null); // 둘 다 비어있으면 null
        return;
      }

      if (newPassword !== checkNewPassowrd) {
        setConfirmPassword(false);
      } else {
        setConfirmPassword(true);
      }
    }, 1000),
    // 의존성 내부에 있는 값이 변경되지 않는 이상 값이 초기화 되지 않는다
    [newPassword, checkNewPassowrd]
  );

  useEffect(() => {
    handelConfirmPassword(newPassword);
  }, [newPassword, checkNewPassowrd]);

  // 수정 비밀번호와 비밀번호 확인 비교 로직 끝

  // userUpdate 폼 제출
  const userUpdate = async (e) => {
    e.preventDefault();

    console.log("front 11111");

    try {
      const res = await axios.put("/api/userUpdateForm/update", {
        userId,
        newPassword,
      });

      console.log("front 22222");

      if (res.status === 200) {
        alert("회원정보 수정 완료!!");
        router.push("/");
      }
    } catch (error) {
      console.log("error = " + error);
      if (error.response) {
        alert(error.response.data.msg);
      }
    }
  };
  // userUpdate 폼 제출 끝

  return (
    <form onSubmit={userUpdate}>
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <div className="flex flex-col items-center mb-6">
            <img
              src="https://via.placeholder.com/80"
              alt="profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <p className="mt-4 text-lg font-semibold">{username}</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm">
                기존 비밀번호
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="oldPassword"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={oldPassword}
                  onChange={handlePasswordChange}
                  // onChange={(e) => setOldPassword(e.target.value)}
                />
                {oldPasswordConfirm === true && (
                  <span className="text-green-500 mb-2">
                    기존 비밀번호가 일치합니다
                  </span>
                )}
                {oldPasswordConfirm === false && (
                  <span className="text-red-500 mb-2">
                    기존 비밀번호가 일치하지 않습니다
                  </span>
                )}
                {oldPasswordConfirm === null && <span></span>}
                {/* 눈 감기기 */}
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisible}
                >
                  {showPassword ? "☆" : "★"}
                </span>
                {/* 눈 감기기~~ */}
              </div>
            </div>
            <div>
              <label className="block text-gray-600 text-sm">
                수정 비밀번호
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPassword}
                onChange={newPasswordAndPasswordCheck}
              />
              {oldPassAndNewPass === false && (
                <span className="text-red-500 mb-2">
                  기존 비밀번호와 동일한 번호는 사용할 수 없습니다
                </span>
              )}
              {oldPassAndNewPass === null && <span></span>}
            </div>
            <div>
              <label className="block text-gray-600 text-sm">
                비밀번호 확인
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="checkNewPassowrd"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={checkNewPassowrd}
                onChange={newPasswordAndPasswordCheck}
              />
              {/* 일치 여부 글자 띄우기 */}
              {confirmPassword === true && (
                <span className="text-green-500 mb-2">
                  비밀번호가 일치합니다
                </span>
              )}
              {confirmPassword === false && (
                <span className="text-red-500 mb-2">
                  비밀번호가 일치하지 않습니다
                </span>
              )}
              {confirmPassword === null && <span></span>}
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
            className={`w-full mt-6 py-2 ${
              oldPasswordConfirm && confirmPassword && oldPassAndNewPass
                ? "bg-teal-500 text-white hover:bg-teal-800 cursor-pointer"
                : "bg-gray-300 text-gray-700 cursor-not-allowed"
            }`}
            disabled={
              !(oldPasswordConfirm && confirmPassword && oldPassAndNewPass)
            }
            // onClick={userUpdate}
          >
            회원정보수정
          </button>
        </div>
      </div>
    </form>
  );
}
