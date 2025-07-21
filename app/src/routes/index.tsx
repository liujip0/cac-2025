import TopBar from "src/components/TopBar/TopBar.tsx";
import globalStyles from "../globalStyles.module.css";

export default function Index() {
  return (
    <div className={globalStyles.screenContainer}>
      <TopBar />
    </div>
  );
}
