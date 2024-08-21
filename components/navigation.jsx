"use client";

import Link from "next/link";
import styles from "../styles/navigation.module.css";
import { usePathname } from "next/navigation";
import { useAuth } from "../app/util/AuthContext";

export default function Navigation() {
  const path = usePathname();
  // login은 true, false 상태값이 필요하니까 isLogin으로 가져왔고, logout은 logout이라 그대로 가져옴
  const { isLogin, logout } = useAuth();
  // console.log("로그인 상태 " + isLogin);

  return (
    <nav className={styles.nav}>
      <ul>
        {/* 항상 있어야함 */}
        <li className={path === "/" ? styles.active : ""}>
          <Link href="/">
            MAIN
            <span className={styles.linkCheck}></span>
          </Link>
        </li>

        {isLogin ? (
          <>
            <li className={path === "/post" ? styles.active : ""}>
              <Link href="/post/myList">
                내블로그
                <span className={styles.linkCheck}></span>
              </Link>
            </li>
            <li className={path === "/post/writeForm" ? styles.active : ""}>
              <Link href="/post/writeForm">글쓰기</Link>
            </li>
            <li className={path === "/user/updateForm" ? styles.active : ""}>
              <Link href="/user/updateForm">계정관리</Link>
            </li>
            <li className={path === "/sub" ? styles.active : ""}>
              <Link href="/sub">내구독리스트</Link>
            </li>

            <li className={path === "/category" ? styles.active : ""}>
              <Link href="/category">카테고리관리</Link>
            </li>
            <li>
              <button onClick={logout}>로그아웃</button>
            </li>
          </>
        ) : (
          <>
            <li className={path === "/user/loginForm" ? styles.active : ""}>
              <Link href="/user/loginForm">로그인</Link>
            </li>
            <li className={path === "/user/joinForm" ? styles.active : ""}>
              <Link href="/user/joinForm">회원가입</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

// <li>로그인</li>
//         <li>회원가입</li>
