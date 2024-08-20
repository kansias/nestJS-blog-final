import { success, fail } from "../../../../../util/ApiUtil";
import executeQuery from "../../../../../_lib/db";

export async function DELETE(request, { params }) {
  const { sessionUserId, blogUserId } = params;

  console.log("11111111");
  console.log("ser sessionUserId: ", sessionUserId);
  console.log("ser blogUserId: ", blogUserId);

  try {
    console.log("22222222");

    const selectSql = `select id from subscribe_tb where from_user_id = ? and to_user_id = ?`;
    const selectData = await executeQuery(selectSql, [
      sessionUserId,
      blogUserId,
    ]);
    if (selectData.length === 0) {
      return fail(null, 404, "구독 정보가 존재하지 않습니다");
    }

    const subId = selectData[0].id;

    //  DELETE 쿼리는 삭제된 행의 수를 반환
    const sql = "delete from subscribe_tb where id = ?";
    const data = await executeQuery(sql, [subId]);
    const getdata = JSON.parse(JSON.stringify(data));

    console.log("33333");

    if (data.affectedRows > 0) {
      console.log("구독 취소 완료");
      return success("취소 완료");
    }
  } catch (error) {
    console.log("error ", error);
    return fail(null, 500, "서버 오류");
  }
}
