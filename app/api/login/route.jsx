import { success, fail } from "../../util/ApiUtil";
// import { success, fail } from "../../util/ApiUtil";
import executeQuery from "../../_lib/db";

export async function POST(request) {
  console.log("!11111111 " + request);
  //   console.log("request = " + JSON.stringify(request));

  try {
    const dataJson = await request.json(); // request에서 JSON 데이터 읽기

    const { username, password } = dataJson; // username과 password 추출

    const sql = "select * from user_tb where username = ? and password = ?";
    const data = await executeQuery(sql, [username, password]);

    console.log("dataJson = " + JSON.stringify(dataJson));

    if (data.length > 0) {
      return success(data);
    } else {
      return fail(null, 401, "아이디 혹은 비밀번호를 확인해주세요");
    }
  } catch {
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
