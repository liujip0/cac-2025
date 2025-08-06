import { Button } from "@liujip0/components";
import styles from "./TopBar.module.css";

export default function TopBar() {
  return (
    <div className={styles.topBar}>
      <h1 className={styles.title}>HS Internship Finder</h1>
      <div className={styles.buttons}>
        <Button className={styles.button}>Sign Up</Button>
        <Button className={styles.button}>Login</Button>
      </div>
    </div>
  );
}
