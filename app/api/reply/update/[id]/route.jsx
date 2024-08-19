import { success, fail } from "../../../../util/ApiUtil";
import executeQuery from "../../../../_lib/db";

export async function PUT(request) {
  console.log("reqest " + JSON.stringify(request));
  console.log("111111111");
  try {
    const { id, userId, comment } = await request.json();

    const sql = "update reply_tb set comment = ? where id = ? and user_id = ?";
    const data = await executeQuery(sql, [comment, replyId, userId]); // id == replyId
    const getdata = JSON.parse(JSON.stringify(data));
    console.log("getdata = " + getdata);
    console.log("getdata = " + JSON.stringify(getdata));

    if (data.affectedRows > 0) {
      //   const responseBody = {
      //     insertId: getdata.insertId, // 댓글 ID
      //     userId: userId, // 작성자의 user_id 추가
      //   };
      return success(getdata);
    } else {
      return fail(null, 404, "게시글이 없습니다!");
    }
  } catch {
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
