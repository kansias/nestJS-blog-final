import executeQuery from "../../_lib/db";

export default async function Post() {
  const sql = "select * from post_tb";
  const data = await executeQuery(sql, "");
  const getdata = JSON.parse(JSON.stringify(data));
  console.log(getdata);
  return (
    <div>
      {getdata.map((data) => {
        return (
          <p key={data.id}>
            {" "}
            {/* 여기서 key 속성을 추가합니다 */}
            {data.id} {data.title} {data.content}
          </p>
        );
      })}
    </div>
  );
}
