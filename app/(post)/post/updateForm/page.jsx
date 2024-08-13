"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// SSR 시 react-quill을 제외하기 위해 동적 import
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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

export default function UpdateForm() {
  const [value, setValue] = useState("");

  return (
    <form>
      <select className="w-full p-2 mt-3 border rounded-md">
        <option value="">선택하세요</option>
        <option value="option1">옵션 1</option>
        <option value="option2">옵션 2</option>
        <option value="option3">옵션 3</option>
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
      <div>
        <input
          id="file"
          type="file"
          onChange={(e) =>
            console.log("e.target.files[0] = " + e.target.files[0]) ||
            setFormData({ ...formData, file: e.target.files[0] })
          }
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
