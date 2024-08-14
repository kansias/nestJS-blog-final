import { success, fail } from "../../../../util/ApiUtil";
import executeQuery from "../../../../_lib/db";

export async function GET(request) {
  console.log("111111111");
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    console.log("222222222222");

    const sql = "select * from post_tb where id = ?";
    const data = await executeQuery(sql, [postId]);
    const getdata = JSON.parse(JSON.stringify(data));
    console.log("getdata = " + getdata);

    console.log("333333333333");

    if (data.length > 0) {
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
