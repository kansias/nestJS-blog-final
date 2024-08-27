// import NextAuth, { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // 자체 구현 로그인
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",

      // 이 부분은 자체 로그인 로직을 구현
      // 대소문자 상관 X
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // 외부 서버와 통신하여 유저 정보와 토큰을 가져오는 로직을 여기에 구현합니다.
        const { username, password } = credentials;

        console.log("nextauth " + username);
        console.log("nextauth " + password);

        try {
          console.log("이건 타니??????");
          // 외부 서버와의 통신을 통해 유저 정보와 토큰을 가져옵니다.
          const response = await axios.post("http://localhost:3000/api/login", {
            username,
            password,
          });

          console.log("왜안돼??");

          // console.log("nextauth res " + response);
          // console.log("nextauth res " + JSON.stringify(response));

          const data = response.data;

          if (data) {
            // 유저 정보와 토큰을 NextAuth.js 세션에 저장합니다.
            console.log("server data json = " + JSON.stringify(data));

            return {
              id: data.body.id,
              username: data.body.username,
              email: data.body.email,
              //   token: data.token,
            };
          } else {
            // 로그인 실패 시 null을 반환합니다.
            return null;
          }
        } catch (error) {
          console.error("서버 오류11 왜~~~");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session(session, token) {
      // 세션에 토큰 정보를 추가합니다.
      // 최초 로그인시에는 jwt 함수는 user값을 받고, 그 다음(업데이트)부터는 token 값이 매개변수로 받는다.
      session.token = token.token;
      return session;
    },
  },
  session: {
    // jwt: true,
    strategy: "jwt",
    maxAge: 30 * 60, // 세션 만료시간 30분
  },
});

export { handler as GET, handler as POST };
