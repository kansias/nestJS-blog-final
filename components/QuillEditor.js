import React, { useState } from "react";
import dynamic from "next/dynamic";

// 동적 import로 'react-quill'을 SSR에서 제외합니다.
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function MyEditor() {
  const [value, setValue] = useState("");

  return (
    <div>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <p>Editor Content: {value}</p>
    </div>
  );
}
