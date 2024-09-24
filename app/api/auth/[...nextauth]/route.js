import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      //   token.role = "user";
      token.id = token.sub; // id 는 token.sub에 저장되어 있음.
      token.name = token.name;
      console.log("jwt call : ", token);
      return token;
    },
    async session({ session, token }) {
      //   session.user.role = token.role;
      session.user.id = token.sub;
      //   session.user.username = token.name; // 만약 세션에 name 이 아니라 username으로 저장하고 싶다면 이렇게 하면 됨. 물론 기존 user 키는 그대로 세션에 포함됨.
      session.user.email = token.email;
      console.log("jwt session call : ", session);
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials", // custom login provider 만들 때 필요한 이름. github, google, facebook 등이 기본 제공되는 소셜로그인 provider 이름인데 자체 회원가입 로그인을 만들 때는 이렇게 이름을 지정해줘야 함.
      credentials: {
        username: { label: "아이디", type: "text" },
        password: { label: "비밀번호", type: "password" },
      },

      async authorize(credentials, req) {
        console.log("credentials authorize call : ", credentials);
        if (!credentials?.username || !credentials?.password) return null;
        try {
          const res = await axios.post(`http://localhost:3000/api/login`, {
            username: credentials?.username,
            password: credentials?.password,
          });
          console.log("nextauth res.data : ", res);
          //   console.log("nextauth res.data.user : ", res.data.user);
          const user = await res.data.user;
          console.log("nextauth user : ", user);
          if (res.status === 200 && user) {
            console.log("nextauth user ok");
            return {
              id: user.id, // 무조건 "id"로 해야함 ( token.sub에 저장됨)
              name: user.username, // 무조건 "name"으로 해야함 ( token.name에 저장됨)
              email: user.email, // 무조건 "email"로 해야함 ( token.email에 저장됨)
              //   role: user.role,
            };
          } else {
            console.log("nextauth user null");
            return null;
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  pages: {
    signIn: "/user/loginForm", // 네비게이션상의 로그인 버튼을 눌렀을 때, 내가 만든 로그인 페이지로 이동하는 명령어. ( components/navigation.jsx 로그인 버튼 참고)
  },
});

export { handler as GET, handler as POST };
