import Link from "next/link";
import styles from "../styles/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className="flex flex-row gap-x-8 justify-center mb-3">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
        <p>© 2024 Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
}
