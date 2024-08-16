import { success, fail } from "../../../util/ApiUtil";
import executeQuery from "../../../_lib/db";

export async function POST(request) {
  console.log("reqest " + JSON.stringify(request));
  console.log("111111111");
  try {
    const { id, userId, comment } = await request.json();

    console.log("222222222222");

    console.log("server " + "id " + id + " userId " + userId);

    const sql =
      "INSERT INTO reply_tb (post_id, user_id, comment, created_at) VALUES (?, ?, ?, NOW());";
    const data = await executeQuery(sql, [id, userId, comment]);
    const getdata = JSON.parse(JSON.stringify(data));
    console.log("getdata = " + getdata);

    console.log("333333333333");

    if (data.affectedRows > 0) {
      console.log("444444");
      return success(getdata);
    } else {
      console.log("55555");
      return fail(null, 404, "게시글이 없습니다!");
    }
  } catch {
    console.log("66666666");
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
