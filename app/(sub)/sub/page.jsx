"use client";

import { useEffect, useState } from "react";
import axios from "axios";
// import { useAuth } from "../../util/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function SubList() {
  const { data: session, status } = useSession(); // next-auth
  // 로그인 한 유저
  //   const { user } = useAuth();
  //   const userId = user && user.body[0].id;
  const userId = session?.user.id;
  //   const username = user && user.body[0].username;
  const username = session?.user.username;
  // 로그인 한 유저 정보 끝

  const router = useRouter();

  // 내 구독리스트 배열로 상태 저장
  const [mySubList, setMySubList] = useState([]);

  // 서버 요청
  useEffect(() => {
    const mySubscribeList = async () => {
      if (status === "loading") return;
      if (status === "unauthenticated") {
        alert("로그인이 필요합니다.");
        router.push("/user/loginForm");
        return;
      }
      console.log("front 111 ");
      try {
        const res = await axios.get(`/api/sub/list`, {
          params: { userId },
        });

        console.log("front 222 ");
        console.log("mySubList ? " + JSON.stringify(res.data.body));

        if (res.status === 200) {
          // console.log("성공!!!");
          setMySubList(res.data.body);
          // console.log("res.data.body = " + JSON.stringify(res.data.body));
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.msg);
        }
      }
    };

    mySubscribeList();
  }, [userId]);
  // 서버 요청 끝

  // 새로운 배열 생성 (reduce 메서드 사용)
  const newSubList = mySubList.reduce((acc, post) => {
    if (!acc[post.username]) {
      acc[post.username] = [];
    }
    acc[post.username].push(post);
    return acc;
  }, {});
  // username 별로 모아서 post를 뿌릴 것임 (구독 중인 블로그 목록)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          {username}님이 구독 중인 블로그
        </h1>
        {/* map 돌리기 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(newSubList).map(([username, posts]) => (
            <div
              key={username}
              className="border rounded-lg p-4 shadow-sm flex justify-between items-start bg-white"
            >
              <div>
                <h3 className="text-xl font-bold mb-2">{username} 블로그</h3>
                {posts.map((post) => (
                  <Link href={`/post/${post.post_id}`} key={post.post_id}>
                    <p className="text-red-500 text-sm mb-1">
                      [최신글] {post.title}
                    </p>
                  </Link>
                ))}
              </div>
              <button className="bg-red-500 text-white py-1 px-4 rounded">
                구독취소
              </button>
            </div>
          ))}
        </div>
        {/* map 돌리기 */}
      </div>
    </div>
  );
}
