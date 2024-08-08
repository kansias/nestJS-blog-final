"use client";

import Link from "next/link";
import styles from "../styles/navigation.module.css";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();

  return (
    <nav className={styles.nav}>
      <ul>
        <li className={path === "/" ? styles.active : ""}>
          <Link href="/">
            내블로그
            <span className={styles.linkCheck}></span>
          </Link>
        </li>
        <li className={path === "/post" ? styles.active : ""}>
          <Link href="/post">
            글쓰기
            <span className={styles.linkCheck}></span>
          </Link>
        </li>
        <li>구독자관리</li>
        <li>내구독리스트</li>
        <li>계정관리</li>
        <li>카테고리관리</li>
        <li>로그아웃</li>
      </ul>
    </nav>
  );
}

// <li>로그인</li>
//         <li>회원가입</li>
