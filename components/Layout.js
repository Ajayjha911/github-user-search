import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => (
  <div className={styles.container}>
    <Header />
    <main className={styles.mainContent}>{children}</main>
    <Footer />
  </div>
);

export default Layout;
