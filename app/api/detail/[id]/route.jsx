import { success, fail } from "../../../util/ApiUtil";
import executeQuery from "../../../_lib/db";
import { DetailDTO } from "../../../util/PostResponse";

export async function POST(request) {
  //   console.log("xksk??");
  try {
    const dataJson = await request.json(); // request에서 JSON 데이터 읽기
    const { id } = dataJson;

    console.log("444444");
    const sql = "select * from post_tb where id = ?";
    const data = await executeQuery(sql, [id]); //id 배열로 전달
    console.log("data = " + JSON.stringify(data));
    // json 데이터를 객체로 다시 !
    const getdata = JSON.parse(JSON.stringify(data));

    console.log("55555");
    console.log("dataJson = " + JSON.stringify(dataJson));

    if (data.length > 0) {
      console.log("66666");
      // DTO로 데이터 가공
      const post = new DetailDTO(
        getdata[0].id,
        getdata[0].title,
        getdata[0].content,
        getdata[0].created_at,
        getdata[0].user_id
      );

      console.log("Post Detail = " + JSON.stringify(post));
      return success(post, 200);
    } else {
      console.log("7777");
      return fail(null, 404, "존재하지 않는 게시글입니다!!");
    }
  } catch {
    console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
