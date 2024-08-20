import { success, fail } from "../../../util/ApiUtil";
import executeQuery from "../../../_lib/db";

export async function POST(request) {
  console.log("reqest " + JSON.stringify(request));
  console.log("111111111");
  try {
    const { sessionUserId, blogUserId } = await request.json();

    console.log("222222222222");

    console.log(
      "server " + "sessionUserId " + sessionUserId + " blogUserId " + blogUserId
    );

    const sql =
      "INSERT INTO subscribe_tb (from_user_id, to_user_id, created_at) VALUES (?, ?, NOW());";
    const data = await executeQuery(sql, [sessionUserId, blogUserId]);
    const getdata = JSON.parse(JSON.stringify(data));
    console.log("getdata = " + JSON.stringify(getdata));

    if (data.affectedRows > 0) {
      console.log("444444");
      return success(getdata);
    } else {
      console.log("55555");
      return fail(null, 404, "잘못된 회원입니다!");
    }
  } catch {
    console.log("66666666");
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
