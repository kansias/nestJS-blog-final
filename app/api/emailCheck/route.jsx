import { success, fail } from "../../util/ApiUtil";
import executeQuery from "../../_lib/db";

export async function POST(request) {
  //   console.log("xksk??");
  try {
    const dataJson = await request.json(); // request에서 JSON 데이터 읽기
    const { email } = dataJson;

    console.log("444444");
    const sql = "select * from user_tb where email = ?";
    const data = await executeQuery(sql, [email]);

    console.log("55555");
    console.log("dataJson = " + JSON.stringify(dataJson));

    if (data.length > 0) {
      console.log("6666666");
      return fail(null, 404, "중복된 이메일입니다!!");
    } else {
      console.log("7777");
      return success(data);
    }
  } catch {
    console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
