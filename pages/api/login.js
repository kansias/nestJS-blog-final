import executeQuery from "../../app/_lib/db";

export default async function login(request, response) {
  if (request.method == "POST") {
    const { username, password } = request.body; // request.body로부터 username과 password 추출
    console.log("request.body " + JSON.stringify(request.body));
    // db 연결
    const sql = "select * from user_tb where username = ? and password = ?";
    const data = await executeQuery(sql, [username, password]);

    console.log("data 확인 = " + JSON.stringify(data));

    if (data.length > 0) {
      response.status(200).json({ success: true, user: data[0] });
    } else {
      response.status(401).json({
        success: false,
        message: "아이디 혹은 비밀번호가 일치하지 않습니다",
      });
    }
  }
}
