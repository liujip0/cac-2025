import type React from "react";
import { useEffect, useState } from "react";
import {
  ADDRESS_FIELD_SEPARATOR,
  ADDRESS_TYPES,
} from "../AddressInput/AddressInput.tsx";
import styles from "./Internship.module.css";

type InternshipProps = {
  title: string;
  description: string;

  industry?: string;
  lengthWeeks?: number;
  weeklyHoursLow?: number;
  weeklyHoursHigh?: number;
  ageMin?: number;
  ageMax?: number;
  address?: string;
  hourlyPay?: number;

  className?: string;
};
export default function Internship({
  title,
  description,

  industry,
  lengthWeeks,
  weeklyHoursLow,
  weeklyHoursHigh,
  ageMin,
  ageMax,
  address,
  hourlyPay,

  className,
}: InternshipProps) {
  const mediaQuery = window.matchMedia("(max-width: 700px)");
  const [narrowScreen, setNarrowScreen] = useState(mediaQuery.matches);
  useEffect(() => {
    function updateNarrowScreen() {
      setNarrowScreen(mediaQuery.matches);
    }
    mediaQuery.addEventListener("change", updateNarrowScreen);
    return () => {
      mediaQuery.removeEventListener("change", updateNarrowScreen);
    };
  });

  const splitAddress = address?.split(ADDRESS_FIELD_SEPARATOR);

  return narrowScreen ?
      <div
        className={
          styles.internship +
          " " +
          styles.internshipNarrow +
          " " +
          (className || "")
        }>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.imageContainerNarrow}>
          {/* <img
            className={styles.image + " " + styles.imageNarrow}
            src={import.meta.env.BASE_URL + "Example.jpg"}
          /> */}
        </div>
        <QuickInfo
          industry={industry}
          lengthWeeks={lengthWeeks}
          weeklyHoursLow={weeklyHoursLow}
          weeklyHoursHigh={weeklyHoursHigh}
          ageMin={ageMin}
          ageMax={ageMax}
          address={splitAddress}
          hourlyPay={hourlyPay}
        />
        <p className={styles.description}>{description}</p>
      </div>
    : <div className={styles.internship}>
        <div className={styles.internshipInfo}>
          <h2 className={styles.title}>{title}</h2>
          <QuickInfo
            industry={industry}
            lengthWeeks={lengthWeeks}
            weeklyHoursLow={weeklyHoursLow}
            weeklyHoursHigh={weeklyHoursHigh}
            ageMin={ageMin}
            ageMax={ageMax}
            address={splitAddress}
            hourlyPay={hourlyPay}
          />
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.imageContainer}>
          <img
            className={styles.image + " " + styles.imageWide}
            src={import.meta.env.BASE_URL + "Example.jpg"}
          />
        </div>
      </div>;
}

type InfoChipProps = {
  icon: React.ReactNode;
  children?: React.ReactNode;
};
function InfoChip({ icon, children }: InfoChipProps) {
  return (
    <div className={styles.infoChip}>
      {icon}
      {children}
    </div>
  );
}

type QuickInfoProps = {
  industry?: string;
  lengthWeeks?: number;
  weeklyHoursLow?: number;
  weeklyHoursHigh?: number;
  ageMin?: number;
  ageMax?: number;
  address?: string[];
  fullAddress?: boolean;
  hourlyPay?: number;
};
export function QuickInfo({
  industry,
  lengthWeeks,
  weeklyHoursLow,
  weeklyHoursHigh,
  ageMin,
  ageMax,
  address,
  fullAddress = false,
  hourlyPay,
}: QuickInfoProps) {
  return (
    <div className={styles.quickInfo}>
      {industry && (
        <InfoChip
          icon={<span className="material-symbols-outlined">factory</span>}>
          {industry}
        </InfoChip>
      )}
      {lengthWeeks && (
        <InfoChip
          icon={
            <span className="material-symbols-outlined">calendar_month</span>
          }>
          {lengthWeeks} week{lengthWeeks !== 1 ? "s" : ""}
        </InfoChip>
      )}
      {(weeklyHoursLow || weeklyHoursHigh) && (
        <InfoChip
          icon={<span className="material-symbols-outlined">schedule</span>}>
          {weeklyHoursLow || ""}
          {weeklyHoursLow && weeklyHoursHigh ? "-" : ""}
          {weeklyHoursHigh || ""} hrs/wk
        </InfoChip>
      )}
      {(ageMin || ageMax) && (
        <InfoChip
          icon={<span className="material-symbols-outlined">cake</span>}>
          {ageMin || ""}
          {ageMin && ageMax ? "-" : ""}
          {ageMax || ""} yrs
        </InfoChip>
      )}
      {address &&
        address.filter((x) => x !== "").length > 0 &&
        (fullAddress ?
          <InfoChip
            icon={
              <span className="material-symbols-outlined">location_on</span>
            }>
            {
              {
                [ADDRESS_TYPES.US]: address
                  .slice(1)
                  .filter((x) => x !== "")
                  .join(", "),
                [ADDRESS_TYPES.VIRTUAL]: (
                  <a
                    href={address[1]}
                    target="_blank">
                    {address[1]}
                  </a>
                ),
              }[address[0]]
            }
          </InfoChip>
        : (address[0] === ADDRESS_TYPES.VIRTUAL ||
            (address[0] === ADDRESS_TYPES.US && address[3] && address[4])) && (
            <InfoChip
              icon={
                <span className="material-symbols-outlined">location_on</span>
              }>
              {
                {
                  [ADDRESS_TYPES.US]: address[3] + ", " + address[4],
                  [ADDRESS_TYPES.VIRTUAL]: "Virtual",
                }[address[0]]
              }
            </InfoChip>
          ))}
      {hourlyPay && (
        <InfoChip
          icon={
            <span className="material-symbols-outlined">attach_money</span>
          }>
          ${hourlyPay.toFixed(2)} / hr
        </InfoChip>
      )}
    </div>
  );
}
