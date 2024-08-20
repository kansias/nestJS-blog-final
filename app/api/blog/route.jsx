import { success, fail } from "../../util/ApiUtil";
import executeQuery from "../../_lib/db";

export async function GET(request) {
  console.log("server other blog 111");
  try {
    const { searchParams } = new URL(request.url);
    const blogUserId = searchParams.get("blogUserId");

    const page = parseInt(searchParams.get("page")) || 1; // 페이지 번호
    const pageSize = 5; // 한 페이지에 표시할 데이터 개수
    const offset = (page - 1) * pageSize; // 페이지의 시작점 계산

    console.log("222222222222 blogUserId:", blogUserId, "page:", page);

    // 첫 번째 쿼리: 포스트 가져오기
    const sql = "select * from post_tb where user_id = ? limit ? offset ?";
    const data = await executeQuery(sql, [blogUserId, pageSize, offset]);
    const getdata = JSON.parse(JSON.stringify(data));

    // 두 번째 쿼리: 사용자 이름 가져오기
    const sql2 = "select username from user_tb where id = ?";
    const data2 = await executeQuery(sql2, [blogUserId]);
    const getdata2 = JSON.parse(JSON.stringify(data2));

    // 사용자 이름을 가져오는 부분
    const username = getdata2.length > 0 ? getdata2[0].username : null;

    // 다음 페이지가 있는지 확인 (간단히 다음 페이지가 있는지 여부를 확인하는 방법)
    const hasNextPage = getdata.length === pageSize;

    if (data.length > 0) {
      // return success(getdata);
      return success({ posts: getdata, username, hasNextPage });
    } else {
      return fail(null, 404, "등록된 게시글이 없습니다!");
    }
  } catch {
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
