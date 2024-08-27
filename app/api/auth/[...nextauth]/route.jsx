// import NextAuth, { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // 자체 구현 로그인
import axios from "axios";

// const handler = NextAuth({
export const authOptions = {
  pages: {
    signIn: "/api/login",
  },
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

            const user = data.body[0];
            console.log("user = " + JSON.stringify(user));
            return {
              id: user.id,
              username: user.username,
              email: user.email,
              token: data.token, // 이 필드가 jwt 콜백에서 사용됨
            };
            // return data;
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
      }
      console.log("토큰이 있니 = " + token);
      console.log("토큰이 있니 = " + JSON.stringify(token));
      return token;
    },
    async session({ session, token }) {
      console.log("gggggggggggggg " + JSON.stringify(token.id));
      console.log("세션 있니 11 = ", JSON.stringify(session));
      session.user.id = token.id; // 세션의 user 객체에 id 추가
      session.user.token = token.token;
      console.log("세션 있니 22 = ", JSON.stringify(session));
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30분
    updateAge: 24 * 60 * 60, // 24시간마다 세션 갱신
  },

  // });
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
