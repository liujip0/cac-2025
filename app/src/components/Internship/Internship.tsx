import type React from "react";
import { useEffect, useState } from "react";
import styles from "./Internship.module.css";

export default function Internship() {
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

  return narrowScreen ?
      <div className={styles.internship + " " + styles.internshipNarrow}>
        <h2 className={styles.title}>Some Internship</h2>
        <div className={styles.imageContainerNarrow}>
          <img
            className={styles.image + " " + styles.imageNarrow}
            src={import.meta.env.BASE_URL + "Example.jpg"}
          />
        </div>
        <div className={styles.quickInfo}>
          <InfoChip
            icon={
              <span className="material-symbols-outlined">calendar_month</span>
            }>
            May 2024 - Aug 2024
          </InfoChip>
          <InfoChip
            icon={
              <span className="material-symbols-outlined">location_on</span>
            }>
            Remote
          </InfoChip>
          <InfoChip
            icon={<span className="material-symbols-outlined">schedule</span>}>
            Full-time
          </InfoChip>
          <InfoChip
            icon={
              <span className="material-symbols-outlined">attach_money</span>
            }>
            $10/hr
          </InfoChip>
          <InfoChip
            icon={<span className="material-symbols-outlined">school</span>}>
            High School
          </InfoChip>
        </div>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
          pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
          tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
          Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
          hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
          per conubia nostra inceptos himenaeos.
        </p>
      </div>
    : <div className={styles.internship}>
        <div className={styles.internshipInfo}>
          <h2 className={styles.title}>Some Internship</h2>
          <div className={styles.quickInfo}>
            <InfoChip
              icon={
                <span className="material-symbols-outlined">
                  calendar_month
                </span>
              }>
              May 2024 - Aug 2024
            </InfoChip>
            <InfoChip
              icon={
                <span className="material-symbols-outlined">location_on</span>
              }>
              Remote
            </InfoChip>
            <InfoChip
              icon={
                <span className="material-symbols-outlined">schedule</span>
              }>
              Full-time
            </InfoChip>
            <InfoChip
              icon={
                <span className="material-symbols-outlined">attach_money</span>
              }>
              $10/hr
            </InfoChip>
            <InfoChip
              icon={<span className="material-symbols-outlined">school</span>}>
              High School
            </InfoChip>
          </div>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
            faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
            pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
            tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
            Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
            hendrerit semper vel class aptent taciti sociosqu. Ad litora
            torquent per conubia nostra inceptos himenaeos.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
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
