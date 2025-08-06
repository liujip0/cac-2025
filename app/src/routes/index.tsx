import Filters from "../components/Filters/Filters.tsx";
import Internship from "../components/Internship/Internship.tsx";
import TopBar from "../components/TopBar/TopBar.tsx";
import styles from "./index.module.css";

export default function Index() {
  return (
    <div className={styles.page}>
      <TopBar />
      <div className={styles.content}>
        <Filters />
        <div className={styles.feed}>
          <Internship />
          <Internship />
          <Internship />
        </div>
      </div>
    </div>
  );
}
