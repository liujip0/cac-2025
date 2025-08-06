import styles from "./Internship.module.css";

export default function Internship() {
  return (
    <div className={styles.internship}>
      <h2 className={styles.title}>Some Internship</h2>
      <div className={styles.quickInfo}>
        <InfoChip />
      </div>
    </div>
  );
}

function InfoChip() {
  return (
    <div className={styles.infoChip}>
      <span className="material-symbols-outlined">attach_money</span>
      $10/hr
    </div>
  );
}
