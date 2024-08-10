import { success, fail } from "../../util/apiUtil";
// import { success, fail } from "../../util/ApiUtil";
import executeQuery from "../../_lib/db";

export async function POST(request) {
  //   console.log("!11111111 " + request);
  //   console.log("request = " + JSON.stringify(request));

  try {
    // console.log("2222222222");
    const dataJson = await request.json(); // request에서 JSON 데이터 읽기
    // console.log("3333333333");
    const { username, password } = dataJson; // username과 password 추출

    // console.log("444444");
    const sql = "select * from user_tb where username = ? and password = ?";
    const data = await executeQuery(sql, [username, password]);

    // console.log("55555");
    console.log("dataJson = " + JSON.stringify(dataJson));

    if (data.length > 0) {
      //   console.log("6666666");
      return success(data);
    } else {
      //   console.log("7777");
      return fail(null, 401, "아이디 혹은 비밀번호를 확인해주세요");
    }
  } catch {
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
