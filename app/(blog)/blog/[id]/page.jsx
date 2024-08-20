"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../util/AuthContext";
import axios from "axios";
import Link from "next/link";
import DOMPurify from "dompurify";
import styles from "../../../../styles/mylist.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function otherBlogList() {
  const { user } = useAuth();
  const sessionUserId = user && user.body[0].id;

  const [blogPosts, setBlogPosts] = useState([]);

  // 페이징 번호
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // 데이터 로딩 상태
  const [hasNextPage, setHasNextPage] = useState(true); // 다음 페이지 여부 (마지막 페이지 알림)

  const [username, setUsername] = useState("");
  const [isSubscribe, setIsSubscribe] = useState(false); // 일단 false로 설정한다. 구독여부 상태 확인

  // 스크롤 위치를 저장하기 위한 ref
  const scrollRef = useRef(0);
  const path = usePathname();
  // console.log("path = " + path); // 결과 : path = /blog/1

  // 숫자 부분만 추출
  const pathNumber = path.match(/\/blog\/(\d+)/);
  // console.log("pathNumber = " + pathNumber[1]); // 결과 : pathNumber = 1
  //   console.log("pathNumber = " + pathNumber); // 결과 : pathNumber = /blog/1,1
  const blogUserId = pathNumber[1];

  useEffect(() => {
    // console.log("blogUserId = " + blogUserId);

    const otherBlogPost = async (page) => {
      // console.log("front 111");

      try {
        setLoading(true); // 데이터 로딩 중

        const res = await axios.get(`/api/blog`, {
          params: { blogUserId, page },
        });

        console.log("resssss " + JSON.stringify(res.data.body));

        if (res.status === 200) {
          // console.log("성공!!!");
          // console.log("res.data.body = " + JSON.stringify(res.data.body));
          setBlogPosts((prevPosts) => [...prevPosts, ...res.data.body.posts]);
          setHasNextPage(res.data.body.hasNextPage); // 다음 페이지 여부 업데이트
          setUsername(res.data.body.username);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // 404 오류일 경우, '등록된 게시글이 없습니다' 메시지를 띄우고 페이징 종료
          setHasNextPage(false);
          if (blogPosts.length === 0) {
            alert(error.response.data.msg);
          }
        }
      } finally {
        setLoading(false); // 데이터 로딩 종료
      }
    };

    // 다음 페이지가 있을 때만 요청!

    otherBlogPost(page);
  }, [page, hasNextPage, blogUserId]);

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

  // 구독하기 save
  const subSave = async () => {
    try {
      const res = await axios.post(`/api/sub/subscribe`, {
        sessionUserId,
        blogUserId,
      });

      console.log("resssss " + JSON.stringify(res));

      if (res.status === 200) {
        setIsSubscribe(true);
        alert("구독 완료!!");
      }
    } catch (error) {
      console.log("에러 발생:", error);
      if (error.response) {
        // console.log("에러에러");
        alert(error.response.data.msg);
      }
    }
  };
  // 구독하기 save 끝

  // 구독하기 useEffect
  useEffect(() => {}, [isSubscribe]);

  // 구독 취소

  const subDelete = async (replyId) => {
    console.log("replyId why " + replyId);

    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      // DELETE는 URL에 리소스 정보를 포함시켜 요청
      const res = await axios.delete(`/api/sub/cancel`);

      if (res.status === 200) {
        // 댓글 리스트에서 댓글 제거하는 로직
        setRepliesRes(
          (prevReplies) =>
            prevReplies.filter((reply) => reply.replyId !== replyId) // replyId로 필터링
        );
        // 댓글 삭제하면 댓글 리스트에서 새로고침 하지 않고도 바로 반영하고싶다 ㅠㅠ
        // repliesRes에 새로운 상태를 반영해주면 되는것 아닌가 -> list에서 댓글을 다시 불러오는 로직을 추가해주면 될것 같다
        fetchPostAndReply();

        alert("삭제되었습니다");
      }
    } catch (error) {
      if (error.response) {
        // console.log("에러에러");
        alert(error.response.data.msg);
      }
    }
  };
  // 구독 취소 끝

  // const cleanContent = DOMPurify.sanitize(blogPosts);
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl font-bold mb-10">{username}'s Blog</h1>

        {/* 여기다 삼항연산자 로직 넣기!!!! */}
        {/* 구독하기 */}
        <h1
          className="text-3 font-bold mb-10 bg-teal-500 rounded-full p-2 text-white cursor-pointer"
          onClick={subSave}
        >
          구독하기
        </h1>
        {/* 구독하기 */}

        {/* 구독취소 */}
        <h1
          className="text-3 font-bold mb-10 bg-red-500 rounded-full p-2 text-white cursor-pointer"
          onClick={subDelete}
        >
          구독취소
        </h1>
        {/* 구독취소 */}
      </div>
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
