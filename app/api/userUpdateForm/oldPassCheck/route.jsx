import { success, fail } from "../../../util/ApiUtil";
import executeQuery from "../../../_lib/db";

export async function GET(request) {
  console.log("server 11111 ");

  try {
    console.log("server 222222 ");
    const { searchParams } = new URL(request.url);
    console.log("seachParams ? " + searchParams);

    // 쿼리 매개변수에서 값 꺼내기
    const oldPassword = searchParams.get("oldPassword");
    console.log("server oldPassword " + oldPassword);
    const userId = searchParams.get("userId");
    console.log("server userId " + userId);

    const sql = "select id, password from user_tb where id = ?";
    const data = await executeQuery(sql, [userId]);
    const getdata = JSON.parse(JSON.stringify(data));

    console.log("server getdata " + JSON.stringify(getdata));
    // console.log("server getdata " + JSON.stringify(getdata.password));

    // GET으로 쓸 때엔 length ! // 배열이라 getdata[0] 으로 값을 들고와야함
    if (getdata.length > 0 && getdata[0].password === oldPassword) {
      console.log("server 4444 ");
      return success(getdata);
    } else {
      return fail(null, 403, "비밀번호가 일치하지 않습니다!");
    }
  } catch {
    console.error("오류 발생:", error);
    return fail(null, 500, "서버 오류");
  }
}
