import { success, fail } from "../../util/ApiUtil";
import executeQuery from "../../_lib/db";
import { IndexDTO } from "../../util/IndexResponse";

export async function GET() {
  //   console.log("server 111");

  try {
    // console.log("server 222");

    // const sql = "SELECT DISTINCT * FROM post_tb ORDER BY RAND() LIMIT 8";
    const sql = `SELECT DISTINCT p.id as post_id, u.id as user_id, u.username, p.title, p.content, 
      p.thumbnail_file FROM post_tb p JOIN user_tb u ON p.user_id = u.id ORDER BY RAND() LIMIT 8`;

    const data = await executeQuery(sql, "");
    // json 데이터를 객체로 다시 !
    const getdata = JSON.parse(JSON.stringify(data));
    // console.log("main Index = " + getdata);

    // console.log("server 333");

    if (data.length > 0) {
      return success(getdata);
    } else {
      return fail(null, 404, "존재하지 않는 블로그입니다!");
    }
  } catch {
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
