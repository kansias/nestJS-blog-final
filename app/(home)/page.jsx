import executeQuery from "../_lib/db";

export default async function Index() {
  const sql = "select * from post_tb";
  const data = await executeQuery(sql, "");
  // json 데이터를 객체로 다시 !
  const getdata = JSON.parse(JSON.stringify(data));
  console.log("main Index = " + getdata);

  return (
    <div className="flex flex-col mx-4 h-screen justify-start  gap-y-4  ">
      {/* <h1>메인 페이지</h1> */}

      <h1 className="text-4xl py-4">안녕하세요</h1>
      <div className="flex flex-row w-auto h-auto border rounded-xl ">
        <div className="w-full h-64 sm:w-64 sm:h-64 w-6 flex justify-center items-center bg-gray-100">
          사진
        </div>
        <div className="">
          <div className="text-2xl text-yellow-400 text-center w-auto mb-8">
            블로그 제목
          </div>
          <div className="text-center w-auto ">블로그 내용</div>
        </div>
      </div>
      <div>안녕하세요</div>
      <div>안녕하세요</div>
      <div>안녕하세요</div>
      <div>안녕하세요</div>
      <div>안녕하세요</div>
      <div>안녕하세요</div>
      <div>안녕하세요</div>
      <div>안녕하세요</div>
      <div>안녕하세요</div>
      <div>안녕하세요</div>
    </div>
  );
}
