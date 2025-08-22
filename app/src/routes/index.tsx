import { skipToken, useQuery } from "@tanstack/react-query";
import Filters from "../components/Filters/Filters.tsx";
import Internship from "../components/Internship/Internship.tsx";
import TopBar from "../components/TopBar/TopBar.tsx";
import { LOCAL_STORAGE_KEYS, trpc } from "../trpc.ts";
import styles from "./index.module.css";

export default function Index() {
  const userInfo = useQuery(
    trpc.users.userInfo.queryOptions(
      localStorage.getItem(LOCAL_STORAGE_KEYS.apiToken) ? undefined : skipToken
    )
  );

  return (
    <div className={styles.page}>
      <TopBar user={userInfo.data} />
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
