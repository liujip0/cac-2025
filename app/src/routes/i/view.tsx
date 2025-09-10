import { skipToken, useQuery } from "@tanstack/react-query";
import TopBar from "../../components/TopBar/TopBar.tsx";
import { LOCAL_STORAGE_KEYS, trpc } from "../../trpc.ts";
import type { Route } from "./+types/view";
import styles from "./view.module.css";

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return params;
}

export default function ViewInternship({ params }: Route.ComponentProps) {
  const userInfo = useQuery(
    trpc.users.userInfo.queryOptions(
      localStorage.getItem(LOCAL_STORAGE_KEYS.apiToken) ? undefined : skipToken
    )
  );
  const getInternship = useQuery(
    trpc.internships.getInternship.queryOptions({
      id: parseInt(params.internshipId),
    })
  );

  return (
    <div className={styles.page}>
      <TopBar user={userInfo.data} />
      <div className={styles.content}>
        <div className={styles.internship}>
          {getInternship.data && (
            <>
              <h1 className={styles.title}>{getInternship.data.title}</h1>
              <p className={styles.description}>
                {getInternship.data.description}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
