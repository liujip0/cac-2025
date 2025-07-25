import styles from "./TopBar.module.css";

export default function TopBar() {
  return (
    <div className={styles.topBarContainer}>
      <h1>HS Internship Finder</h1>
      <div className={styles.spacer}></div>
    </div>
  );
}
