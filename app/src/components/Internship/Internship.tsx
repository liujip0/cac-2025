import type React from "react";
import styles from "./Internship.module.css";

export default function Internship() {
  return (
    <div className={styles.internship}>
      <h2 className={styles.title}>Some Internship</h2>
      <div className={styles.quickInfo}>
        <InfoChip
          icon={
            <span className="material-symbols-outlined">calendar_month</span>
          }>
          May 2024 - Aug 2024
        </InfoChip>
        <InfoChip
          icon={<span className="material-symbols-outlined">location_on</span>}>
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
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus
        ex sapien vitae pellentesque sem placerat. In id cursus mi pretium
        tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
        Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis
        massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper
        vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
        inceptos himenaeos.
      </p>
    </div>
  );
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
