import executeQuery from "../_lib/db";
import styles from "../../styles/index.module.css";
import { IndexDTO } from "../util/IndexResponse";
import Link from "next/link";

export default async function Index() {
  const sql = "select * from post_tb order by rand() limit 8";
  const data = await executeQuery(sql, "");
  // json 데이터를 객체로 다시 !
  const getdata = JSON.parse(JSON.stringify(data));
  // console.log("main Index = " + getdata);

  // DTO로 데이터 가공
  const indexList = getdata.map(
    (item) =>
      new IndexDTO(
        item.id,
        item.title,
        item.content,
        item.thumbnail_file,
        item.user_id
      )
  );
  // console.log("main Index = " + JSON.stringify(indexList));

  const removeImagesFromContent = (content) => {
    // 이미지 태그 제거
    const cleanedContent = content.replace(/<img[^>]*src="[^"]*"[^>]*>/gi, "");
    // 남은 HTML 태그 제거 (예: <p>, <br> 등)
    const textOnly = cleanedContent.replace(/<[^>]+>/g, " ");
    // 남은 공백 및 줄바꿈 정리
    return textOnly.replace(/\s+/g, " ").trim();
  };

  return (
    <div className="flex flex-col mx-4 justify-start gap-y-4">
      <h1 className="text-4xl py-4">JSTORY MAIN</h1>
      <div className="flex flex-wrap">
        {indexList.map((post) => (
          <div key={post.id} className="sm:w-1/2 p-2">
            <Link href={`/post/${post.id}`}>
              <div
                className={`${styles.card} flex flex-row w-auto h-auto border rounded-xl`}
              >
                <div className="sm:w-64 sm:h-30 w-6 flex justify-center items-center bg-gray-100">
                  <img
                    src={`/img/${post.thumbnail_file}`}
                    alt={post.thumbnail_file}
                    width={1500}
                    height={300}
                  />
                </div>
                <div className="ml-7">
                  <div className="text-2xl text-teal-500 w-auto mt-3 mb-8">
                    {post.title} ({post.user_id})
                  </div>

                  {/*  html 태그 안보이게 */}
                  <div
                    className={`${styles.textClamp} w-auto`}
                    dangerouslySetInnerHTML={{
                      __html: removeImagesFromContent(post.content),
                    }}
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
