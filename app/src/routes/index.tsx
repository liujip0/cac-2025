import TopBar from "../components/TopBar/TopBar.tsx";
import styles from "./index.module.css";

export default function Index() {
  return (
    <div className={styles.page}>
      <TopBar />
      Index!
    </div>
  );
}
