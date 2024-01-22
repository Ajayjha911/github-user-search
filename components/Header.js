import Link from "next/link";
import styles from "../styles/HeaderFooter.module.css";

const Header = () => (
  <header className={styles.header}>
    <Link href="/">
      <div className={styles.logo}>GitHub Users</div>
    </Link>
  </header>
);

export default Header;
