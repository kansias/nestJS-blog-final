"use client";

import styles from "../../styles/index.module.css";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Index() {
  const [index, setIndex] = useState([]);

  // 서버 요청
  useEffect(() => {
    // console.log("front 111 ");

    const indexList = async () => {
      try {
        const res = await axios.get(`/api/index`, {});

        // console.log("front 222 ");
        // console.log("index ? " + JSON.stringify(res));
        console.log("res.data.body = " + JSON.stringify(res.data.body));

        if (res.status === 200) {
          setIndex(res.data.body);
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.msg);
        }
      }
    };

    indexList();
  }, []);
  // 서버 요청 끝

  const removeImagesFromContent = (content) => {
    // 이미지 태그 제거
    const cleanedContent = content.replace(/<img[^>]*src="[^"]*"[^>]*>/gi, "");
    // 남은 HTML 태그 제거 (예: <p>, <br> 등)
    const textOnly = cleanedContent.replace(/<[^>]+>/g, " ");
    // 남은 공백 및 줄바꿈 정리
    return textOnly.replace(/\s+/g, " ").trim();
  };

  return (
    <div className="flex flex-col mx-4 justify-start gap-y-4">
      <h1 className="text-4xl py-4">JSTORY MAIN</h1>
      <div className="flex flex-wrap">
        {index.map((post) => (
          <div key={post.post_id} className="sm:w-1/2 p-2">
            <Link href={`/post/${post.post_id}`}>
              <div
                className={`${styles.card} flex flex-row w-auto h-auto border rounded-xl`}
              >
                <div className="sm:w-64 sm:h-30 w-6 flex justify-center items-center bg-gray-100">
                  <Image // webpack을 통해 이미지 최적화 (용량 감소) 및 lazy 로딩
                    src={`/img/${post.thumbnail_file}`}
                    alt={post.thumbnail_file}
                    width={1500}
                    height={300}
                  />
                </div>
                <div className="ml-7">
                  <div className="text-2xl text-teal-500 w-auto mt-3 mb-8">
                    {post.title}
                  </div>

                  {/*  html 태그 안보이게 */}
                  <div
                    className={`${styles.textClamp} w-auto`}
                    dangerouslySetInnerHTML={{
                      __html: removeImagesFromContent(post.content),
                    }}
                  />
                </div>
              </div>
            </Link>
            <Link href={`/blog/${post.user_id}`}>
              <div className="mt-4 p-2 bg-teal-500 text-white rounded-md text-center">
                {post.username} 블로그 바로가기
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
