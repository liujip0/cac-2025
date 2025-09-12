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
  startDate?: string;
  endDate?: string;
  hours?: string;
  address?: string;
  className?: string;
};
export default function Internship({
  title,
  description,
  startDate,
  endDate,
  hours,
  address,
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

  const parsedStartDate = startDate && new Date(startDate);
  const parsedEndDate = endDate && new Date(endDate);
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
          <img
            className={styles.image + " " + styles.imageNarrow}
            src={import.meta.env.BASE_URL + "Example.jpg"}
          />
        </div>
        <QuickInfo
          startDate={parsedStartDate || undefined}
          endDate={parsedEndDate || undefined}
          hours={hours}
          address={splitAddress}
        />
        <p className={styles.description}>{description}</p>
      </div>
    : <div className={styles.internship}>
        <div className={styles.internshipInfo}>
          <h2 className={styles.title}>{title}</h2>
          <QuickInfo
            startDate={parsedStartDate || undefined}
            endDate={parsedEndDate || undefined}
            hours={hours}
            address={splitAddress}
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
  startDate?: Date;
  endDate?: Date;
  hours?: string;
  address?: string[];
};
function QuickInfo({ startDate, endDate, hours, address }: QuickInfoProps) {
  return (
    <div className={styles.quickInfo}>
      {startDate && endDate && (
        <InfoChip
          icon={
            <span className="material-symbols-outlined">calendar_month</span>
          }>
          {startDate.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
          {" - "}
          {endDate.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </InfoChip>
      )}
      {address &&
        (address[0] === ADDRESS_TYPES.VIRTUAL ||
          (address[0] === ADDRESS_TYPES.US && address[3] && address[4])) && (
          <InfoChip
            icon={
              <span className="material-symbols-outlined">location_on</span>
            }>
            {
              {
                US: address[3] + ", " + address[4],
                VIRTUAL: "Virtual",
              }[address[0]]
            }
          </InfoChip>
        )}
      {hours && (
        <InfoChip
          icon={<span className="material-symbols-outlined">schedule</span>}>
          {hours}
        </InfoChip>
      )}
    </div>
  );
}
