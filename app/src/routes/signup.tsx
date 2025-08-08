import TopBar from "../components/TopBar/TopBar.tsx";
import styles from "./signup.module.css";

export default function SignUp() {
  return (
    <div className={styles.page}>
      <TopBar />
      <div className={styles.content}>Sign Up</div>
    </div>
  );
}
