import TopBar from "../TopBar/TopBar.tsx";
import styles from "./Scaffold.module.css";

type ScaffoldProps = {
  children?: React.ReactNode;
};
export default function Scaffold({ children }: ScaffoldProps) {
  return (
    <div className={styles.screenContainer}>
      <TopBar />
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
}
