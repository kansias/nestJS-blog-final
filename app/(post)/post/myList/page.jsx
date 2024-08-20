"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../util/AuthContext";
import axios from "axios";
import Link from "next/link";
import DOMPurify from "dompurify";
import styles from "../../../../styles/mylist.module.css";
import Image from "next/image";

export default function myList() {
  const { user } = useAuth();
  const userId = user && user.body[0].id;
  const username = user && user.body[0].username;
  const [blogPosts, setBlogPosts] = useState([]);

  // 페이징 번호
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // 데이터 로딩 상태
  const [hasNextPage, setHasNextPage] = useState(true); // 다음 페이지 여부 (마지막 페이지 알림)

  // 스크롤 위치를 저장하기 위한 ref
  const scrollRef = useRef(0);

  useEffect(() => {
    const myBlogPost = async (page) => {
      try {
        setLoading(true); // 데이터 로딩 중
        const res = await axios.get(`/api/post/myList`, {
          params: { userId, page }, // 쿼리 파라미터로 userId 전달 (페이징 할거니까 page도 전달. /api/post/myList?userId=1?page=1 이런 형식)
        });

        // console.log("resssss " + JSON.stringify(res));

        if (res.status === 200) {
          console.log("성공!!!");
          console.log("res.data.body = " + JSON.stringify(res.data.body));
          // setBlogPosts(res.data.body); // 블로그 포스트 데이터를 상태에 저장
          setBlogPosts((prevPosts) => [...prevPosts, ...res.data.body.posts]);
          setHasNextPage(res.data.body.hasNextPage); // 다음 페이지 여부 업데이트
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // 404 오류일 경우, '등록된 게시글이 없습니다' 메시지를 띄우고 페이징 종료
          setHasNextPage(false);
          if (blogPosts.length === 0) {
            alert(error.response.data.msg);
          }
        } else {
          alert("오류가 발생했습니다.");
        }
      } finally {
        setLoading(false); // 데이터 로딩 종료
      }
    };

    // 다음 페이지가 있을 때만 요청!
    if (userId && hasNextPage) {
      myBlogPost(page);
    }
  }, [userId, page, hasNextPage]);

  // 스크롤 페이징
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const scrollPercentage =
        (scrollTop / (documentHeight - windowHeight)) * 100;

      if (scrollPercentage >= 80 && !loading && hasNextPage) {
        setPage((prevPage) => prevPage + 1); // 다음 페이지로 이동
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      // 컴포넌트 언마운트 전 스크롤 위치 저장
      scrollRef.current = window.scrollY;
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasNextPage]);

  useEffect(() => {
    if (!hasNextPage && !loading && blogPosts.length > 0) {
      alert("마지막 페이지입니다!");
    }
  }, [hasNextPage, loading]);

  useEffect(() => {
    // 컴포넌트가 마운트되면 저장된 스크롤 위치로 복원
    if (scrollRef.current) {
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, []);

  // 이미지 태그 제거 함수
  const removeImagesFromContent = (content) => {
    // 이미지 태그 제거
    const cleanedContent = content.replace(/<img[^>]*src="[^"]*"[^>]*>/gi, "");
    // 남은 HTML 태그 제거 (예: <p>, <br> 등)
    const textOnly = cleanedContent.replace(/<[^>]+>/g, " ");
    // 남은 공백 및 줄바꿈 정리
    return textOnly.replace(/\s+/g, " ").trim();
  };

  // const cleanContent = DOMPurify.sanitize(blogPosts);
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10">{username}'s Blog</h1>
      {/* 각 포스트를 반복하여 렌더링 */}
      {blogPosts.map((post, index) => {
        const cleanContent = DOMPurify.sanitize(post.content); // 각 포스트의 콘텐츠를 정화
        const textOnly = removeImagesFromContent(cleanContent); // 이미지 태그 제거 및 텍스트만 남기기

        return (
          <div
            className="flex flex-row mb-8 border rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
            key={`${post.id}-${index}`} // 고유한 key 속성 추가
          >
            <div className="flex justify-center">
              {/* <img
                src={`/img/${post.thumbnail_file}`}
                alt={post.thumbnail_file}
                width={350}
                height={200}
              /> */}
              <Image // webpack을 통해 이미지 최적화 (용량 감소) 및 lazy 로딩
                src={`/img/${post.thumbnail_file}`}
                alt={post.thumbnail_file}
                width={350}
                height={200}
              />
            </div>

            <Link href={`/post/${post.id}`}>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.created_at}</p>
                <p className={`${styles.textOverflow} text-gray-800 mb-4`}>
                  {textOnly}
                </p>
              </div>
            </Link>
          </div>
        );
      })}
      {loading && <p>Loading...</p>} {/* 로딩 중일 때 표시 */}
    </div>
  );
}
