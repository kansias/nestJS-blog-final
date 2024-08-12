import { success, fail } from "../../../util/ApiUtil";
import executeQuery from "../../../_lib/db";
import { ListDTO } from "../../../util/CategoryResponse";

export async function GET(request) {
  //   console.log("!11111111 " + request);
  //   console.log("111111111111" + JSON.stringify(request));

  try {
    // const { userId } = request;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // console.log("222222222222 " + userId);

    const sql = "select * from category_tb where user_id = ?";
    const data = await executeQuery(sql, [userId]);
    const getdata = JSON.parse(JSON.stringify(data));

    // DTO로 데이터 가공
    const categoryList = getdata.map(
      (item) => new ListDTO(item.id, item.category_name)
    );

    // console.log("333333333333 " + JSON.stringify(categoryList));

    if (data.length > 0) {
      return success(categoryList);
    } else {
      return fail(null, 404, "등록된 카테고리가 없습니다!");
    }
  } catch {
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
