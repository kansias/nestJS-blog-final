import executeQuery from "../_lib/db";

export default async function Index() {
  const sql = "select * from post_tb";
  const data = await executeQuery(sql, "");
  // json 데이터를 객체로 다시 !
  const getdata = JSON.parse(JSON.stringify(data));
  console.log("main Index = " + getdata);

  return (
    <div>
      <h1>메인 페이지</h1>
    </div>
  );
}
