import { Checkbox, Select } from "@liujip0/components";
import styles from "./Filters.module.css";

type FiltersProps = {
  paid: boolean;
  setPaid: (value: boolean) => void;
  unpaid: boolean;
  setUnpaid: (value: boolean) => void;

  industry: string;
  setIndustry: (value: string) => void;
};
export default function Filters({
  paid,
  setPaid,
  unpaid,
  setUnpaid,

  industry,
  setIndustry,
}: FiltersProps) {
  return (
    <div className={styles.filters}>
      <h2 className={styles.title}>Filters</h2>

      <h3 className={styles.subtitle}>Pay</h3>
      <Checkbox
        buttonClassName={styles.checkbox}
        id="filter-paid"
        value={paid}
        onChange={(value) => {
          setPaid(value);
        }}
        label="Paid"
      />
      <Checkbox
        buttonClassName={styles.checkbox}
        id="filter-unpaid"
        value={unpaid}
        onChange={(value) => {
          setUnpaid(value);
        }}
        label="Unpaid"
      />

      <h3 className={styles.subtitle}>Industry</h3>
      <Select
        id="filter-industry"
        value={industry}
        onChange={(value) => {
          setIndustry(value);
        }}>
        <option value="All">All</option>
        <option value="Business">Business</option>
        <option value="Education">Education</option>
        <option value="Insurance">Insurance</option>
        <option value="Management">Management</option>
        <option value="Marketing">Marketing</option>
        <option value="Retail">Retail</option>
      </Select>
    </div>
  );
}
