import { success, fail } from "../../util/ApiUtil";
import executeQuery from "../../_lib/db";
import { IndexDTO } from "../../util/IndexResponse";

export async function GET() {
  //   console.log("server 111");

  try {
    // console.log("server 222");

    const sql = "select * from post_tb order by rand() limit 8";
    const data = await executeQuery(sql, "");
    // json 데이터를 객체로 다시 !
    const getdata = JSON.parse(JSON.stringify(data));
    // console.log("main Index = " + getdata);

    // console.log("server 333");

    if (data.length > 0) {
      // DTO로 데이터 가공
      const indexList = getdata.map(
        (item) =>
          new IndexDTO(
            item.id,
            item.title,
            item.content,
            item.thumbnail_file,
            item.user_id
          )
      );
      return success(indexList);
    } else {
      return fail(null, 404, "존재하지 않는 블로그입니다!");
    }
  } catch {
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
