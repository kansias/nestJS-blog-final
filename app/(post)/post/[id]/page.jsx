import executeQuery from "../../../_lib/db";
import { DetailDTO } from "../../../util/PostResponse";

export default async function Detail({ params }) {
  console.log("param = " + JSON.stringify(params));
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
    <div className="flex flex-col mx-4 h-screen justify-start gap-y-4">
      <div className="flex flex-row justify-between">
        <h4 className="text-4xl py-4">{post.title}</h4>
        <p className="mt-auto mr-5">{post.createdAt}</p>
      </div>
      <hr></hr>
      <div>
        <h4 className="mb-40">{post.content}</h4>
      </div>

      {/* 댓글 뷰 */}
      <div className="flex flex-col p-6 bg-white rounded-lg border">
        <textarea
          className="w-full h-24 p-2 border border-gray-300 rounded-md"
          placeholder="댓글을 입력하세요"
        />
        <button className="mt-2 w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-700">
          등록
        </button>

        <div className="text-lg font-semibold mt-6 mb-4">댓글 리스트</div>

        <div className="space-y-4">
          {/* 댓글1 */}
          <div className="flex items-start p-4 bg-gray-100 rounded-lg shadow-sm">
            <div className="flex-shrink-0 mr-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                S
              </div>
            </div>
            <div>
              <div className="text-sm font-bold">ssar</div>
              <div className="text-gray-700">댓글1</div>
            </div>
          </div>
          {/* 댓글 1 끝 */}
          {/* 댓글 2 */}
          <div className="flex items-start p-4 bg-gray-100 rounded-lg shadow-sm">
            <div className="flex-shrink-0 mr-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                C
              </div>
            </div>
            <div>
              <div className="text-sm font-bold">cos</div>
              <div className="text-gray-700">댓글2</div>
            </div>
          </div>
          {/* 댓글 2 끝 */}
        </div>
      </div>
    </div>
  );
}
