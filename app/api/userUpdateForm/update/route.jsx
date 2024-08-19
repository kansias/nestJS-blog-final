import { success, fail } from "../../../util/ApiUtil";
import executeQuery from "../../../_lib/db";

export async function PUT(request) {
  console.log("request 11" + request);
  console.log("reqest " + JSON.stringify(request));
  console.log("111111111");
  try {
    const { userId, newPassword } = await request.json();

    console.log("222222222222");

    const sql = "update user_tb set password = ? where id = ?";
    const data = await executeQuery(sql, [newPassword, userId]);
    const getdata = JSON.parse(JSON.stringify(data));
    console.log("getdata = " + getdata);
    console.log("getdata = " + JSON.stringify(getdata));

    console.log("333333333333");

    if (data.affectedRows > 0) {
      console.log("444444");
      return success(getdata);
    } else {
      return fail(null, 404, "존재하지 않는 회원입니다!");
    }
  } catch {
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
