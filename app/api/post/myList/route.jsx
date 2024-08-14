import { success, fail } from "../../../util/ApiUtil";
import executeQuery from "../../../_lib/db";

export async function GET(request) {
  //   console.log("!11111111 " + request);
  console.log("111111111111" + JSON.stringify(request));

  try {
    // const { userId } = request;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    console.log("222222222222 " + userId);

    const sql = "select * from post_tb where user_id = ?";
    const data = await executeQuery(sql, [userId]);
    const getdata = JSON.parse(JSON.stringify(data));

    if (data.length > 0) {
      return success(getdata);
    } else {
      return fail(null, 404, "등록된 게시글이 없습니다!");
    }
  } catch {
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
