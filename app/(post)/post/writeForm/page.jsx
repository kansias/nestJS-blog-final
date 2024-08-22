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
  // const [value, setValue] = useState(""); // 에디터 내용 상태
  const [categories, setCategories] = useState([]); // 카테고리 리스트 상태
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택한 카테고리 상태
  const [title, setTitle] = useState(""); // 제목 상태
  const [file, setFile] = useState(null); // 파일 상태
  const [content, setContent] = useState(""); // 내용 상태
  const router = useRouter(); //라우터
  const { user } = useAuth();
  const userId = user && user.body[0].id;
  // formData 객체 생성 (객체!!)
  const [formData, setFormData] = useState({
    selectedCategory: "",
    title: "",
    content: "",
    userId: userId,
    file: null,
  });

  // 화면에 첫 랜더링 될 때 실행
  // 카테고리 선택
  useEffect(() => {
    const categoryList = async () => {
      // e.preventDefault();

      try {
        const res = await axios.get("/api/category/list", {
          params: { userId }, // 쿼리 파라미터로 userId 전달
        });

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
    console.log("e.target.value = " + e.target.value);
    // setSelectedCategory(e.target.value); // 사용자가 선택한 카테고리 저장
    setFormData({ ...formData, selectedCategory: e.target.value });
  };
  // 카테고리 선택 끝

  /* file 타입에 대한 onChange 이벤트 별도 처리 
     (향후 파일의 사이즈 검사 등의 로직 추가를 위해 확장성을 고려하여 별도 이벤트 생성) */
  const handleFileChange = (e) => {
    // 파일 확장자 검사
    const allowType = ["png", "jpg", "jpeg"];

    const selectedFile = e.target.files[0];
    const fileType = selectedFile.name.split(".").pop().toLowerCase();

    if (!allowType.includes(fileType)) {
      alert("png, jpg, jpeg 파일만 업로드 가능합니다.");
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
    setFormData((prevData) => ({
      ...prevData,
      file: selectedFile,
    }));
  };

  // 글쓰기 제출
  const write = async (e) => {
    e.preventDefault();

    const formResult = new FormData();

    // formData 객체에 state 값 추가하는 방식으로 진행
    formResult.append("selectedCategory", formData.selectedCategory);
    formResult.append("title", formData.title);
    formResult.append("content", formData.content);
    formResult.append("userId", formData.userId);

    if (formData.file) {
      formResult.append("file", formData.file);
    } else {
      formResult.append("file", null);
    }

    try {
      // FormData 객체는 그 자체로 전송
      const res = await axios.post("/api/post/write", formResult, {
        headers: {
          "Content-Type": "multipart/form-data",
          charset: "utf-8",
        },
      });

      if (res.status === 200) {
        alert("글 등록 성공!!");
        // router.push("/");
      }
    } catch (error) {
      console.log("error = " + error);
      if (error.response) {
        alert(error.response.data.msg);
      }
    }
  };
  // 글쓰기 제출 완료

  return (
    <form onSubmit={write}>
      <select
        className="w-full p-2 mt-3 border rounded-md"
        value={formData.selectedCategory}
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
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="제목을 입력하세요"
        className="w-full p-2 mt-3 border rounded-md"
      ></input>

      <div className="mb-10 mt-3">
        <ReactQuill
          id="content"
          theme="snow"
          value={formData.content} // 내장 이벤트(e) 대신 사용자 정의 이벤트로 상태 업데이트(예 : value )
          onChange={(value) => setFormData({ ...formData, content: value })}
          modules={modules}
          style={{ height: "500px" }}
        />
        {/* <p>Editor Content: {value}</p> */}
      </div>
      <div>
        <input
          id="file"
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 mt-3 border rounded-md"
        ></input>
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
