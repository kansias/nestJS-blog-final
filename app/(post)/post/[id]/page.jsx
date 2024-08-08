import executeQuery from "../../../_lib/db";
import { DetailDTO } from "../../../util/PostResponse";

export default async function Detail({ params }) {
  const { id } = params;

  const sql = "select * from post_tb where id = ?";
  const data = await executeQuery(sql, [id]); //id 배열로 전달
  console.log("data = " + JSON.stringify(data));
  // json 데이터를 객체로 다시 !
  const getdata = JSON.parse(JSON.stringify(data));

  //   TODO: 데이터가 존재하지 않을때... 유효성검사 필요 (서버에서)

  // DTO로 데이터 가공
  const post =
    getdata.length > 0
      ? new DetailDTO(
          getdata[0].id,
          getdata[0].title,
          getdata[0].content,
          getdata[0].created_at
        )
      : null;
  console.log("Post Detail = " + JSON.stringify(post));

  return (
    <div className="flex flex-col mx-4 bg-slate-600 h-screen justify-start gap-y-4">
      <div>
        <h4 className="text-4xl py-4">{post.title}</h4>
        <p>{post.createdAt}</p>
      </div>
      <hr></hr>
      <div>
        <h4>{post.content}</h4>
      </div>
    </div>
  );
}
