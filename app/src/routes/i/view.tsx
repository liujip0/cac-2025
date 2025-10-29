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
                {/* <img
                  className={styles.image}
                  src={import.meta.env.BASE_URL + "Example.jpg"}
                /> */}
              </div>
              <QuickInfo
                industry={getInternship.data.industry || undefined}
                lengthWeeks={getInternship.data.length_weeks || undefined}
                weeklyHoursLow={
                  getInternship.data.weekly_hours_low || undefined
                }
                weeklyHoursHigh={
                  getInternship.data.weekly_hours_high || undefined
                }
                ageMin={getInternship.data.age_min || undefined}
                ageMax={getInternship.data.age_max || undefined}
                address={splitAddress}
                fullAddress
                hourlyPay={getInternship.data.hourly_pay || undefined}
              />
              {getInternship.data.website_url && (
                <p className={styles.description}>
                  <strong>Website:</strong>{" "}
                  <a
                    href={getInternship.data.website_url}
                    target="_blank">
                    {getInternship.data.website_url}
                  </a>
                </p>
              )}
              {getInternship.data.email && (
                <p className={styles.description}>
                  <strong>Contact Email:</strong>{" "}
                  <a href={`mailto:${getInternship.data.email}`}>
                    {getInternship.data.email}
                  </a>
                </p>
              )}
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
