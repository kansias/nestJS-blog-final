import { success, fail } from "../../../../util/ApiUtil";
import executeQuery from "../../../../_lib/db";

export async function DELETE(request, { params }) {
  const { id } = params; //url에서 id값 가져오기

  try {
    //  DELETE 쿼리는 삭제된 행의 수를 반환
    const sql = "delete from post_tb where id = ?";
    const data = await executeQuery(sql, [id]);

    console.log("55555");

    if (data.affectedRows > 0) {
      console.log("게시글 삭제 완료");
      return success(data);
    } else {
      console.log("666666");
      return fail(null, 404, "존재하지 않는 게시글입니다");
    }
  } catch (error) {
    console.log("error ", error);
    return fail(null, 500, "서버 오류");
  }
}
