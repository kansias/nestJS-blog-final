import { success, fail } from "../../../../util/ApiUtil";
import executeQuery from "../../../../_lib/db";

// id로 받았는데 왜 params를 썻지? request.url 안쓰고..
export async function DELETE(request, { params }) {
  console.log("params ", params);
  const { id } = params; //url에서 id값 (replyId) 가져오기
  console.log("id ", id);

  try {
    //  DELETE 쿼리는 삭제된 행의 수를 반환
    const sql = "delete from reply_tb where id = ?";
    const data = await executeQuery(sql, [id]);

    console.log("55555");

    if (data.affectedRows > 0) {
      console.log("댓글 삭제 완료");
      return success(data);
    } else {
      console.log("666666");
      return fail(null, 404, "존재하지 않는 댓글입니다");
    }
  } catch (error) {
    console.log("error ", error);
    return fail(null, 500, "서버 오류");
  }
}
