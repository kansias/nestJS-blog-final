"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../util/AuthContext";
import axios from "axios";

// SSR 시 react-quill을 제외하기 위해 동적 import
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// 퀼 에디터
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
// 퀼 에디터 끝

export default function MyEditor() {
  const [value, setValue] = useState(""); // 에디터 내용 상태
  const [categories, setCategories] = useState([]); // 카테고리 리스트 상태
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택한 카테고리 상태
  const router = useRouter(); //라우터
  const { user } = useAuth();
  const userId = user && user.body[0].id;

  // 화면에 첫 랜더링 될 때 실행
  useEffect(() => {
    const categoryList = async () => {
      // e.preventDefault();

      try {
        // 애가 request에 담겨야하는데
        const res = await axios.get("/api/category/list", {
          params: { userId }, // 쿼리 파라미터로 userId 전달
        });

        // console.log("res111111 = " + JSON.stringify(res));
        if (res.status === 200) {
          setCategories(res.data.body); // API 응답의 데이터를 상태로 저장 (배열 다 저장)
          console.log("res222222 = " + JSON.stringify(res.data.body));
          // alert("성공!!");
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.msg);
        }
      }
    };

    if (userId) {
      categoryList();
    }
  }, [userId]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // 사용자가 선택한 카테고리 저장
  };

  return (
    <form>
      <select
        className="w-full p-2 mt-3 border rounded-md"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">카테고리를 선택하세요</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.category_name}
          </option>
        ))}
      </select>

      <input
        id="title"
        type="text"
        placeholder="제목을 입력하세요"
        className="w-full p-2 mt-3 border rounded-md"
      ></input>

      <div className="mb-10 mt-3" id="content">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          style={{ height: "500px" }}
        />
        {/* <p>Editor Content: {value}</p> */}
      </div>
      <button
        type="submit"
        className="w-1/12 bg-gray-400 hover:bg-teal-600 text-white p-2 rounded mt-4 mb-10"
      >
        등록
      </button>
    </form>
  );
}
