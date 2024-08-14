"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../util/AuthContext";
import axios from "axios";

export default function myList() {
  const { user } = useAuth();
  const userId = user && user.body[0].id;
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const myBlogPost = async () => {
      try {
        const res = await axios.get(`/api/post/myList`, {
          params: { userId }, // 쿼리 파라미터로 userId 전달
        });

        console.log("resssss " + JSON.stringify(res));

        if (res.status === 200) {
          console.log("성공!!!");
          setBlogPosts(res.data.body); // 블로그 포스트 데이터를 상태에 저장
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.msg);
        }
      }
    };

    if (userId) {
      myBlogPost();
    }
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10">cos's Blog</h1>


{/* TODO : 태그 잘못!!!!!!!!!!!! */}
{blogPosts.map((post) => (
      <div className="flex flex-row mb-8 border rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
        <div className="flex justify-center">
          <img
            src={`/img/cat.jpg`}
            // alt={post.thumbnail_file}
            width={250}
            height={200}
          />
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">fs</h2>
          <p className="text-gray-600 mb-4">2024-08-14 (10:08)</p>
          <p className="text-gray-800 mb-4">dssaz</p>
          <button className="bg-green-500 text-white py-2 px-4 rounded">
            Read More
          </button>
        </div>
      </div>
      )}
    </div>
  );
}
