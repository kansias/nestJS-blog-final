import { success, fail } from "../../util/ApiUtil";
import executeQuery from "../../_lib/db";

export async function POST(request) {
  console.log("!11111111 " + request);

  try {
    const dataJson = await request.json(); // request에서 JSON 데이터 읽기

    const { userId, categoryName } = dataJson; // username과 password 추출

    const sql =
      "insert into category_tb (user_id, category_name) values (?, ?)";
    const data = await executeQuery(sql, [userId, categoryName]);

    console.log("dataJson = " + JSON.stringify(dataJson));

    // 세션에 있는 유저 정보가 없으면 돌아가! 하면 됨
    if (userId.length > 0) {
      return success(data);
    } else {
      return fail(null, 403, "로그인 하세요~~~");
    }
  } catch {
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
