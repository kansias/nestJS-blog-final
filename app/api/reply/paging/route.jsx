import { success, fail } from "../../../util/ApiUtil";
import executeQuery from "../../../_lib/db";

export async function GET(request) {
  console.log("server request = " + request.url);

  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("id");
    console.log("server postId " + postId);

    const page = parseInt(searchParams.get("page")) || 1; // 페이지 번호
    console.log("sever page = " + page);

    const pageSize = 5; // 한 페이지에 표시할 데이터 개수
    const offset = (page - 1) * pageSize; // 페이지의 시작점 계산 (몇 번째 데이터부터 가져올지)

    const sql = `
                select r.id as replyId, r.post_id, r.user_id, r.created_at, r.comment, 
                u.username from reply_tb r 
                join user_tb u on r.user_id = u.id 
                where r.post_id = ? 
                order by r.id desc 
                limit ? offset ?
              `;

    const data = await executeQuery(sql, [postId, pageSize, offset]);
    const getdata = JSON.parse(JSON.stringify(data));

    const hasNextPage = getdata.length === pageSize;

    // username의 첫 글자만 추출
    const formattedData = getdata.map((reply) => ({
      ...reply,
      originalUsername: reply.username, // 원본 username
      shortUsername: reply.username.charAt(0), // username의 첫 글자만 추출
    }));

    if (formattedData.length > 0) {
      return success({ replys: formattedData, hasNextPage });
    } else {
      return fail(null, 404, "더이상 댓글이 없습니다!");
    }
  } catch {
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
