"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../util/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";

// /post/123과 같은 URL로 접근하면, params 객체는 { id: "123" }와 같은 형태로 컴포넌트에 전달
export default function Detail({ params }) {
  const router = useRouter();
  const { user } = useAuth();
  const userId = user && user.body[0].id;
  const [post, setPost] = useState(null);
  // console.log("param = " + JSON.stringify(params));
  const { id } = params; // postId
  const [comment, setComment] = useState("");
  const [repliesRes, setRepliesRes] = useState([]); // 댓글 리스트

  const [editMode, setEditMode] = useState(null); // 수정 모드
  const [updateComment, setUpdateComment] = useState(""); // 수정할 댓글

  // 게시글 상세 조회 + 댓글 조회
  useEffect(() => {
    const fetchPostAndReply = async () => {
      try {
        // 애가 request에 담겨야하는데
        const res = await axios.post(`/api/detail/${id}`, {
          id,
        });
        // console.log("resssss " + JSON.stringify(res));
        if (res.status === 200) {
          setPost(res.data.body);
        }

        const repliesRes = await axios.get(`/api/reply/list`, {
          params: { id }, // id == postId
          // params: { userId, id }, // id == postId
        });
        if (repliesRes.status === 200) {
          setRepliesRes(repliesRes.data.body);
          // console.log("repliesRes " + JSON.stringify(repliesRes.data.body));
        }
      } catch (error) {
        console.log("에러 발생:", error);
        if (error.response) {
          // console.log("에러에러");
          // alert(error.response.data.msg);
        }
      }
    };
    fetchPostAndReply();
  }, [id, userId]);

  if (!post) {
    return <div>Loading...</div>;
  }
  // 게시글 상세 조회 끝

  // 게시글 삭제

  const deletePost = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      const res = await axios.delete(`/api/post/delete/${id}`);

      // console.log("resssss " + JSON.stringify(res));

      if (res.status === 200) {
        alert("삭제되었습니다");
        router.push("/");
        setTimeout(() => {
          window.location.reload(); // 새로고침
        }, 50); // 100ms 후 새로고침
      }
    } catch (error) {
      if (error.response) {
        // console.log("에러에러");
        alert(error.response.data.msg);
      }
    }
  };
  // 게시글 삭제 끝

  const cleanContent = DOMPurify.sanitize(post.content);

  // 댓글 save
  const replySave = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/reply/save`, {
        id,
        userId,
        comment, // 입력된 댓글 전달
      });

      if (res.status === 200) {
        console.log("res ? " + JSON.stringify(res));
        // console.log("res ds? " + JSON.stringify(res.data.body));
        console.log("ddddddddd " + res.data.body.insertId);
        // 새 댓글을 댓글 리스트에 추가
        const newReply = {
          id: res.data.body.insertId, // 서버에서 반환된 댓글 ID를 사용
          user_id: res.data.body.userId, // 서버에서 반환된 댓글 작성자 ID를 사용
          comment, // 입력된 댓글 내용
          shortUsername: user.body[0].username.slice(0, 1), // 댓글 작성자의 첫 글자만 사용
          originalUsername: user.body[0].username, // 댓글 작성자의 전체 이름 사용
        };

        console.log("newReply " + JSON.stringify(newReply));
        setRepliesRes((prevReplies) => [newReply, ...prevReplies]); // 새 댓글을 가장 위에 추가
        alert("댓글 save 성공!!");
        setComment(""); // 댓글 등록 후 textarea 초기화
        await fetchPostAndReply(); // 댓글 리스트를 다시 가져오기
      }
    } catch (error) {
      console.log("에러 발생:", error);
      if (error.response) {
        // console.log("에러에러");
        alert(error.response.data.msg);
      }
    }
  };
  // 댓글 save 끝

  // 댓글 삭제

  const deleteReply = async (replyId) => {
    console.log("replyId why " + replyId);

    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      const res = await axios.delete(`/api/reply/delete/${replyId}`);

      // console.log("resssss " + JSON.stringify(res));

      if (res.status === 200) {
        // 댓글 리스트에서 댓글 제거하는 로직
        setRepliesRes(
          (prevReplies) => prevReplies.filter((reply) => reply.id !== replyId) // replyId로 필터링
        );
        // 댓글 삭제하면 댓글 리스트에서 새로고침 하지 않고도 바로 반영하고싶다 ㅠㅠ
        // repliesRes에 새로운 상태를 반영해주면 되는것 아닌가 -> list에서 댓글을 다시 불러오는 로직을 추가해주면 될것 같다
        alert("삭제되었습니다");
        await fetchPostAndReply(); // 삭제 후 댓글 리스트를 다시 가져오기
      }
    } catch (error) {
      if (error.response) {
        // console.log("에러에러");
        alert(error.response.data.msg);
      }
    }
  };
  // 댓글 삭제 끝

  // 댓글 수정 시작

  const toggleEditMode = (replyId, currentComment) => {
    setEditMode(replyId);
    setUpdateComment(currentComment);
  };

  const cancelEdit = () => {
    setEditMode(null);
    setUpdateComment("");
  };

  const saveUpdatedReply = async (replyId) => {
    console.log("replyId is?  " + replyId);
    try {
      const res = await axios.put(`/api/reply/update`, {
        replyId,
        comment: updateComment,
        userId,
      });

      console.log("resssss " + JSON.stringify(res));

      // const res = await axios.post(`/api/reply/save`, {
      //   id,
      //   userId,
      //   comment, // 입력된 댓글 전달
      // });

      if (res.status === 200) {
        setRepliesRes((prevReplies) =>
          prevReplies.map((reply) =>
            reply.replyId === replyId
              ? { ...reply, comment: updateComment }
              : reply
          )
        );
        setEditMode(null);
        setUpdateComment("");
        alert("댓글 수정 성공!!");
      }
    } catch (error) {
      console.log("에러 발생:", error);
      if (error.response) {
        alert(error.response.data.msg);
      }
    }
  };

  // 댓글 수정 끝

  return (
    // 게시글
    <div className="flex flex-col mx-4 h-screen justify-start gap-y-4">
      <div className="flex flex-row justify-between">
        <h4 className="text-4xl py-4">{post.title}</h4>
        <p className="mt-auto mr-5">{post.createdAt}</p>
      </div>
      <hr></hr>
      <div
        className="mb-40"
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      />

      {user && user.body[0].id === post.userId && (
        <div className="flex flex-row justify-end">
          <button
            className="border p-2 bg-teal-600 rounded-md text-white hover:bg-teal-800"
            onClick={() => router.push(`/post/updateForm/${id}`)}
          >
            수정
          </button>
          <button
            className="border p-2 bg-red-700 rounded-md text-white mr-5 hover:bg-red-800"
            onClick={deletePost}
          >
            삭제
          </button>
        </div>
      )}

      {!user && <div></div>}
      {/* 게시글!! */}

      {/* 댓글 뷰 */}

      <div className="flex flex-col p-6 bg-white rounded-lg border">
        {user && (
          <form onSubmit={replySave}>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded-md"
              placeholder="댓글을 입력하세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="mt-2 w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-700">
              등록
            </button>
          </form>
        )}
        {!user && (
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded-md"
            placeholder="댓글을 쓰려면 로그인 먼저 하세요!"
            readOnly
          />
        )}
        <div className="text-lg font-semibold mt-6 mb-4">댓글 리스트</div>

        {repliesRes.map((reply, index) => (
          // console.log("reply " + JSON.stringify(reply)),
          // console.log("reply.comment " + JSON.stringify(reply.comment)),
          // console.log("reply.id " + JSON.stringify(reply.id)),
          // console.log("reply.comment " + JSON.stringify(reply.comment)),
          // console.log("reply.user_id " + JSON.stringify(reply.user_id)),
          // console.log("user.body[0].id " + JSON.stringify(user.body[0].id)),
          <div className="space-y-4" key={`${reply.id}-${index}`}>
            {/* 댓글1 */}
            <div className="flex items-start p-4 bg-gray-100 rounded-lg shadow-sm">
              <div className="flex-shrink-0 mr-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {reply.shortUsername}
                </div>
              </div>
              {/* 댓글 수정 */}
              <div>
                <div className="text-sm font-bold">
                  {reply.originalUsername}
                </div>
                {/* 수정 모드면 textarea */}
                {editMode === reply.id ? (
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={updateComment}
                    onChange={(e) => setUpdateComment(e.target.value)}
                  />
                ) : (
                  // 수정 모드가 아니면 댓글 내용
                  <div className="text-gray-700">{reply.comment}</div>
                )}
              </div>
            </div>
            {/* 댓글 */}
            {user && user.body[0].id === reply.user_id && (
              <div className="flex flex-row justify-end">
                {/* 편집 모드일 때  */}
                {editMode === reply.id ? (
                  <>
                    <button
                      className="border p-2 bg-teal-600 rounded-md text-white hover:bg-teal-800"
                      onClick={() => saveUpdatedReply(reply.id)}
                    >
                      저장
                    </button>
                    <button
                      className="border p-2 bg-gray-500 rounded-md text-white mr-5 hover:bg-gray-700"
                      onClick={cancelEdit}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  // 일반 모드일 때
                  <>
                    <button
                      className="border p-2 bg-teal-600 rounded-md text-white hover:bg-teal-800"
                      onClick={() => toggleEditMode(reply.id, reply.comment)}
                    >
                      수정
                    </button>
                    <button
                      className="border p-2 bg-red-700 rounded-md text-white mr-5 hover:bg-red-800"
                      onClick={() => deleteReply(reply.id)}
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            )}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
