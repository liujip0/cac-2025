import type { UserInfoResult } from "@cac-2025/api/src/routes/users/userInfo.ts";
import { Button } from "@liujip0/components";
import { Link, useNavigate } from "react-router";
import { LOCAL_STORAGE_KEYS } from "../../trpc.ts";
import linkStyles from "../styles/Link.module.css";
import styles from "./TopBar.module.css";

type TopBarProps = {
  user?: UserInfoResult;
};
export default function TopBar({ user }: TopBarProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.topBar}>
      <img
        className={styles.logo}
        src={import.meta.env.BASE_URL + "logo.png"}
      />
      <h1 className={styles.title}>
        <Link
          to="/"
          className={linkStyles.inheritLink}>
          iFind
        </Link>
      </h1>
      {user ?
        <div className={styles.buttonsContainer}>
          <p className={styles.userText}>Hi, {user.username}!</p>
          <Button
            className={styles.button}
            onClick={() => {
              localStorage.removeItem(LOCAL_STORAGE_KEYS.apiToken);
              navigate("/");
              navigate(0);
            }}>
            Log Out
          </Button>
        </div>
      : <div className={styles.buttonsContainer}>
          <Link
            to="/signup"
            className={linkStyles.inheritLink}>
            <Button className={styles.button}>Sign Up</Button>
          </Link>
          <Link
            to="/login"
            className={linkStyles.inheritLink}>
            <Button className={styles.button}>Log In</Button>
          </Link>
        </div>
      }
    </div>
  );
}
