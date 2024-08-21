import { success, fail } from "../../../util/ApiUtil";
import executeQuery from "../../../_lib/db";

export async function GET(request) {
  console.log("server 111");

  try {
    const { searchParams } = new URL(request.url);
    const sessionUserId = searchParams.get("sessionUserId");
    const blogUserId = searchParams.get("blogUserId");

    console.log("server 222");
    console.log("sessionUserId " + sessionUserId);
    console.log("blogUserId " + blogUserId);

    const sql =
      "select * from subscribe_tb where from_user_id = ? and to_user_id = ?";

    const data = await executeQuery(sql, [sessionUserId, blogUserId]);
    const getdata = JSON.parse(JSON.stringify(data));

    console.log("server 333");

    const isMyBlog = sessionUserId === blogUserId;

    if (data.length > 0) {
      return success({ isSubscribe: true, isMyBlog });
    } else {
      return success({ isSubscribe: false, isMyBlog });
    }
  } catch {
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
