import { success, fail } from "../../../util/ApiUtil";
import executeQuery from "../../../_lib/db";

export async function GET(request) {
  //   console.log("111111111 ");
  try {
    // const { userId } = request;
    const { searchParams } = new URL(request.url);
    // const userId = searchParams.get("userId");
    const postId = searchParams.get("id");
    console.log("postId " + postId);

    // console.log("222222222222 ");

    const sql =
      "select r.id as replyId, r.post_id, r.user_id, r.created_at, r.comment, u.username from reply_tb r join user_tb u on r.user_id = u.id where r.post_id = ? order by r.id desc";
    const data = await executeQuery(sql, [postId]);
    const getdata = JSON.parse(JSON.stringify(data));

    // username의 첫 글자만 추출
    const formattedData = getdata.map((reply) => ({
      ...reply,
      originalUsername: reply.username, // 원본 username
      shortUsername: reply.username.charAt(0), // username의 첫 글자만 추출
    }));

    // console.log("333333333333 ");

    return success(formattedData.length > 0 ? formattedData : []);
  } catch {
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
