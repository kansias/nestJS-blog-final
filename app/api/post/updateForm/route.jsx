import { success, fail } from "../../../util/ApiUtil";
import executeQuery from "../../../_lib/db";
import { ListDTO } from "../../../util/CategoryResponse";

export async function GET(request) {
  try {
    // const { searchParams } = new URL(request.url);
    // const userId = searchParams.get("userId");

    const sql = "select * from post_tb where id = ?";
    const data = await executeQuery(sql, [postId]);
    const getdata = JSON.parse(JSON.stringify(data));

    if (data.length > 0) {
      return success();
    } else {
      return fail(null, 404, "게시글이 없습니다!");
    }
  } catch {
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
