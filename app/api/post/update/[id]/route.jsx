import { success, fail } from "../../../../util/ApiUtil";
import executeQuery from "../../../../_lib/db";

export async function PUT(request) {
  //   console.log("update request " + request);
  console.log("111111111");
  try {
    // formData로 들고와서 .json을 사용하지 못한다. 그래서 entries()를 사용하여 key, value로 나눠줌
    const requestData = await request.formData();
    const dataObject = Array.from(requestData.entries()).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {}
    );

    const { selectedCategory, title, content, userId, file } = dataObject;

    const url = new URL(request.url);
    const postId = url.pathname.split("/").pop(); // URL 경로에서 마지막 부분을 가져옴
    console.log("postId 있지요? = " + postId);
    // const { searchParams } = new URL(request.url);
    // const postId = searchParams.get("postId");
    // console.log("postId 있지요? = " + postId);

    console.log("222222222222");

    const sql =
      "update post_tb set title = ?, content = ?, category_id = ? where id = ?";
    const data = await executeQuery(sql, [
      title,
      content,
      selectedCategory,
      postId,
    ]);
    const getdata = JSON.parse(JSON.stringify(data));
    console.log("getdata = " + getdata);

    console.log("333333333333");

    if (data.affectedRows > 0) {
      console.log("444444");
      return success(getdata);
    } else {
      console.log("55555");
      return fail(null, 404, "게시글이 없습니다!");
    }
  } catch {
    console.log("66666666");
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
