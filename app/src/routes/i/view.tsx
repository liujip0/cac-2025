import { skipToken, useQuery } from "@tanstack/react-query";
import { ADDRESS_FIELD_SEPARATOR } from "../../components/AddressInput/AddressInput.tsx";
import { QuickInfo } from "../../components/Internship/Internship.tsx";
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

  const parsedStartDate =
    getInternship.data?.start_date && new Date(getInternship.data.start_date);
  const parsedEndDate =
    getInternship.data?.end_date && new Date(getInternship.data.end_date);
  const splitAddress = getInternship.data?.address?.split(
    ADDRESS_FIELD_SEPARATOR
  );

  return (
    <div className={styles.page}>
      <TopBar user={userInfo.data} />
      <div className={styles.content}>
        <div className={styles.internship}>
          {getInternship.data ?
            <>
              <h1 className={styles.title}>{getInternship.data.title}</h1>
              <div className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src={import.meta.env.BASE_URL + "Example.jpg"}
                />
              </div>
              <QuickInfo
                startDate={parsedStartDate || undefined}
                endDate={parsedEndDate || undefined}
                hours={getInternship.data.weekly_hours || undefined}
                address={splitAddress}
                fullAddress
                hourlyPay={getInternship.data.hourly_pay}
              />
              <p className={styles.description}>
                {getInternship.data.description}
              </p>
            </>
          : <>
              <div>Loading info...</div>
            </>
          }
        </div>
      </div>
    </div>
  );
}
