import { success, fail } from "../../../util/ApiUtil";
import executeQuery from "../../../_lib/db";
import path from "path";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Next.js의 기본 bodyParser를 비활성화
  },
};

// const uploadDir = "../../../_lib/"; // 파일 업로드 디렉토리 로컬 또는 서버에 저장할 경로 등
// const uploadDir = "../../../../public/img"; // 파일 업로드 디렉토리 로컬 또는 서버에 저장할 경로 등
const uploadDir = path.join(process.cwd(), "public/img"); // 파일 업로드 디렉토리 로컬 또는 서버에 저장할 경로 등
console.log("uploadDir = " + uploadDir);
export async function POST(request) {
  try {
    const data = await request.formData();
    // key - value로 나눠줌 (분해)
    const dataObject = Array.from(data.entries()).reduce(
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
    if (file !== "null") {
      console.log("file = " + JSON.stringify(file));
      const buffer = await file.arrayBuffer(); // 파일을 버퍼로 변환 ( 파일을 읽어오기 위해 사용하며 일반적으로 파일을 읽어오는 방법 )
      fileName = `${Date.now()}-${file.name}`; // 파일명 중복 방지를 위해 현재 날짜와 시간을 파일명에 붙였음
      filePath = path.join(uploadDir, fileName); // 파일 경로

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      fs.writeFileSync(filePath, Buffer.from(new Uint8Array(buffer))); // 파일 저장
      console.log("filePath = " + filePath);
    }

    console.log("dataObject(server) = " + JSON.stringify(dataObject));
    fileURL = path.join("http://localhost:3000/img/", fileName);
    console.log("fileURL = " + fileURL);

    const sql =
      "insert into post_tb (category_id, title, content, user_id, thumbnail_file, created_at) values (?, ?, ?, ?, ?, now())";
    const writeDB = await executeQuery(sql, [
      selectedCategory,
      title,
      content,
      userId,
      fileURL, // 파일 경로를 DB에 저장 (파일 자체를 저장 XXX)
    ]);

    return success(dataObject);
  } catch (error) {
    console.error("Error parsing form data:", error);
    return fail(null, 500, "서버 오류");
  }
}
