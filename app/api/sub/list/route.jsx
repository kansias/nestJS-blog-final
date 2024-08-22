import { success, fail } from "../../../util/ApiUtil";
import executeQuery from "../../../_lib/db";

export async function GET(request) {
  console.log("server 111");

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    console.log("server 222");

    const sql = `SELECT post_id, title, user_id, u.username
                        FROM (SELECT p.id AS post_id, p.title, p.user_id, s.to_user_id, s.id,
                                ROW_NUMBER() OVER (PARTITION BY p.user_id ORDER BY p.id DESC) AS rn
                                FROM post_tb p

                                JOIN subscribe_tb s
                                ON p.user_id = s.to_user_id
                                WHERE s.from_user_id = ?) AS subquery

                        INNER JOIN user_tb u
                        ON subquery.to_user_id = u.id
                        WHERE rn <= 2
                        ORDER BY subquery.id DESC, post_id DESC`;

    const data = await executeQuery(sql, [userId]);
    const getdata = JSON.parse(JSON.stringify(data));

    console.log("server 333");

    if (data.length > 0) {
      return success(getdata);
    } else {
      return success([]); // 빈 배열 반환 (NULL처리)
    }
  } catch {
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
