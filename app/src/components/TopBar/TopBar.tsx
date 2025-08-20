import { Button } from "@liujip0/components";
import { Link } from "react-router";
import linkStyles from "../styles/Link.module.css";
import styles from "./TopBar.module.css";

export default function TopBar() {
  return (
    <div className={styles.topBar}>
      <h1 className={styles.title}>
        <Link
          to="/"
          className={linkStyles.inheritLink}>
          HS Internship Finder
        </Link>
      </h1>
      <div className={styles.buttons}>
        <Link
          to="/signup"
          className={linkStyles.inheritLink}>
          <Button className={styles.button}>Sign Up</Button>
        </Link>
        <Link
          to="/login"
          className={linkStyles.inheritLink}>
          <Button className={styles.button}>Login</Button>
        </Link>
      </div>
    </div>
  );
}
