import executeQuery from "../_lib/db";
import styles from "../../styles/index.module.css";
import { IndexDTO } from "../util/IndexResponse";

export default async function Index() {
  const sql = "select * from post_tb order by rand() limit 8";
  const data = await executeQuery(sql, "");
  // json 데이터를 객체로 다시 !
  const getdata = JSON.parse(JSON.stringify(data));
  // console.log("main Index = " + getdata);

  // DTO로 데이터 가공
  const indexList = getdata.map(
    (item) =>
      new IndexDTO(item.id, item.title, item.content, item.thumbnail_file)
  );
  console.log("main Index = " + JSON.stringify(indexList));

  return (
    <div className="flex flex-col mx-4 h-screen justify-start gap-y-4">
      <h1 className="text-4xl py-4">JSTORY MAIN</h1>
      <div className="flex flex-wrap justify-between">
        {indexList.map((post) => (
          <div key={post.id} className="w-full sm:w-1/2 p-2">
            <div
              className={`${styles.card} flex flex-row w-auto h-auto border rounded-xl`}
            >
              <div className="w-full h-64 sm:w-64 sm:h-64 w-6 flex justify-center items-center bg-gray-100">
                {post.thumbnail_file}
              </div>
              <div className="ml-7">
                <div className="text-2xl text-yellow-400 w-auto mt-3 mb-8">
                  {post.title}
                </div>
                <div className="w-auto ">{post.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
