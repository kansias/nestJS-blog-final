import { success, fail } from "../../../util/ApiUtil";
import executeQuery from "../../../_lib/db";

export async function GET(request) {
  console.log("111111111111" + JSON.stringify(request));

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const page = parseInt(searchParams.get("page")) || 1; // 페이지 번호
    const pageSize = 5; // 한 페이지에 표시할 데이터 개수
    const offset = (page - 1) * pageSize; // 페이지의 시작점 계산 (몇 번째 데이터부터 가져올지)

    console.log("222222222222 userId:", userId, "page:", page);

    const sql =
      "select * from post_tb where user_id = ? order by id desc limit ? offset ?";
    const data = await executeQuery(sql, [userId, pageSize, offset]);
    const getdata = JSON.parse(JSON.stringify(data));

    // 다음 페이지가 있는지 확인 (간단히 다음 페이지가 있는지 여부를 확인하는 방법)
    const hasNextPage = getdata.length === pageSize;

    if (data.length > 0) {
      // return success(getdata);
      return success({ posts: getdata, hasNextPage });
    } else {
      return fail(null, 404, "등록된 게시글이 없습니다!");
    }
  } catch {
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
