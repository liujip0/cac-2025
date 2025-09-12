import type { UserInfoResult } from "@cac-2025/api/src/routes/users/userInfo.ts";
import { Button } from "@liujip0/components";
import { skipToken, useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Filters from "../components/Filters/Filters.tsx";
import Internship from "../components/Internship/Internship.tsx";
import TopBar from "../components/TopBar/TopBar.tsx";
import linkStyles from "../components/styles/Link.module.css";
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
        {userInfo.data ?
          <MainContent userInfo={userInfo.data} />
        : <div>Welcome! Lorem ipsum something something</div>}
      </div>
    </div>
  );
}

type MainContentProps = {
  userInfo: UserInfoResult;
};
function MainContent({ userInfo }: MainContentProps) {
  switch (userInfo.userType) {
    case "student":
      return (
        <>
          <Filters />
          <div className={styles.feed}>
            <InternshipsList />
          </div>
        </>
      );
    case "business":
      return (
        <>
          <Filters />
          <div className={styles.feed}>
            <div>
              <Link
                to="/i/create"
                className={linkStyles.inheritLink}>
                <Button>
                  <span className="material-symbols-outlined">add</span>
                  Create Internship
                </Button>
              </Link>
            </div>
            <InternshipsList />
          </div>
        </>
      );
    case "parent":
      return (
        <>
          <Filters />
          <div className={styles.feed}>
            <InternshipsList />
          </div>
        </>
      );
    case "teacher":
      return (
        <>
          <Filters />
          <div className={styles.feed}>
            <InternshipsList />
          </div>
        </>
      );
    case "admin":
      return (
        <>
          <Filters />
          <div className={styles.feed}>
            <div>
              <Button>
                <span className="material-symbols-outlined">add</span>
                Create Internship
              </Button>
            </div>
            {/* <Internship />
            <Internship />
            <Internship /> */}
          </div>
        </>
      );
  }
}

function InternshipsList() {
  const internshipsList = useQuery(
    trpc.internships.internshipList.queryOptions({
      start: 0,
      limit: 10,
    })
  );

  return (
    <>
      {internshipsList.data?.map((internship) => (
        <Link
          key={internship.id}
          to={`/i/view/${internship.id}`}
          className={linkStyles.inheritLink}>
          <Internship
            title={internship.title}
            description={internship.description}
            startDate={internship.start_date}
            endDate={internship.end_date}
            hours={internship.hours}
            address={internship.address}
          />
        </Link>
      ))}
    </>
  );
}
