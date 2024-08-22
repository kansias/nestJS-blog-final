import { success, fail } from "../../../../util/ApiUtil";
import executeQuery from "../../../../_lib/db";
import path from "path";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Next.js의 기본 bodyParser를 비활성화
  },
};

const uploadDir = path.join(process.cwd(), "public/img"); // 파일 업로드 디렉토리 로컬 또는 서버에 저장할 경로 등
console.log("uploadDir = " + uploadDir);

export async function PUT(request) {
  const url = new URL(request.url);
  const postId = url.pathname.split("/").pop(); // URL 경로에서 마지막 부분을 가져옴
  console.log("postId 있지요? = " + postId);

  console.log("update request " + request);
  console.log("111111111");

  try {
    // formData로 들고와서 .json을 사용하지 못한다. 그래서 entries()를 사용하여 key, value로 나눠줌
    const requestData = await request.formData();
    const dataObject = Array.from(requestData.entries()).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {}
    );

    const { selectedCategory, title, content, userId, file } = dataObject;

    let filePath = null;
    let fileName = "";
    let fileURL = "";

    if (file) {
      const buffer = await file.arrayBuffer(); // 파일을 버퍼로 변환 ( 파일을 읽어오기 위해 사용하며 일반적으로 파일을 읽어오는 방법 )
      fileName = `${Date.now()}-${file.name}`; // 파일명 중복 방지를 위해 현재 날짜와 시간을 파일명에 붙였음
      filePath = path.join(uploadDir, fileName); // 파일 경로

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      fs.writeFileSync(filePath, Buffer.from(new Uint8Array(buffer))); // 파일 저장
      console.log("filePath = " + filePath);
    }

    console.log("222222222222");

    console.log("dataObject(server) = " + JSON.stringify(dataObject));
    // fileURL = path.join("http://localhost:3000/img/", fileName);
    fileURL = path.join("", fileName);
    console.log("fileURL = " + fileURL);

    const sql =
      "update post_tb set title = ?, content = ?, category_id = ?, thumbnail_file = ? where id = ?";
    const data = await executeQuery(sql, [
      title,
      content,
      selectedCategory,
      fileURL,
      postId,
    ]);
    const getdata = JSON.parse(JSON.stringify(data));
    console.log("getdata = " + getdata);

    console.log("333333333333");

    if (data.affectedRows > 0) {
      console.log("444444");
      return success(getdata);
    } else {
      console.log("55555");
      return fail(null, 404, "게시글이 없습니다!");
    }
  } catch {
    console.log("66666666");
    // console.log("error ");
    return fail(null, 500, "서버 오류");
  }
}
