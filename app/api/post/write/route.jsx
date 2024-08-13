import { success, fail } from "../../../util/ApiUtil";
import executeQuery from "../../../_lib/db";
// multipart/form-data 형식으로 전송된 데이터를 처리하기 위해 formidable 모듈 사용
// import { IncomingForm } from "formidable";

export const config = {
  api: {
    bodyParser: false, // Next.js의 기본 bodyParser를 비활성화
  },
};

export async function POST(request) {
  console.log("request = " + request);
  try {
    const data = request.formData();
    const dataObject = Array.from(data).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

    console.log("dataObject(server) = " + dataObject);
  } catch (error) {
    console.error("Error parsing form data:", error);
    return fail(null, 500, "서버 오류");
  }

  // const form = new IncomingForm();

  // form.parse(request, async (err, fields, files) => {
  //   if (err) {
  //     console.error("Error parsing form data:", err);
  //     return fail(null, 500, "서버 오류");
  //   }
  //   const { selectedCategory, title, content, userId } = fields;
  //   const { thumbnailFile } = files;

  //   // 파일 정보를 DB에 저장할 때 사용하거나, 필요에 따라 파일을 서버에 저장
  //   const thumbnailFilePath = thumbnailFile?.filepath; // 파일 경로 또는 저장 경로

  //   try {
  //     const sql =
  //       "insert into post_tb (category_id, title, content, user_id, thumbnail_file, created_at) values (?, ?, ?, ?, ?, now())";
  //     const data = await executeQuery(sql, [
  //       selectedCategory,
  //       title,
  //       content,
  //       userId,
  //       thumbnailFilePath, // 파일 경로를 DB에 저장 (파일 자체를 저장 XXX)
  //     ]);

  //     return success(data);
  //   } catch (error) {
  //     console.error("Database error:", error);
  //     return fail(null, 500, "서버 오류");
  //   }
  // });
}
