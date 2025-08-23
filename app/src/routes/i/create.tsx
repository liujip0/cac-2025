import { Input, TextArea } from "@liujip0/components";
import { skipToken, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TopBar from "../../components/TopBar/TopBar.tsx";
import { LOCAL_STORAGE_KEYS, trpc } from "../../trpc.ts";
import styles from "./create.module.css";

export default function CreateInternship() {
  const userInfo = useQuery(
    trpc.users.userInfo.queryOptions(
      localStorage.getItem(LOCAL_STORAGE_KEYS.apiToken) ? undefined : skipToken
    )
  );

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hours, setHours] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className={styles.page}>
      <TopBar user={userInfo.data} />
      <div className={styles.content}>
        {userInfo.data && (
          <>
            <h1 className={styles.title}>Create Internship</h1>
            <Input
              id="create-internship-title"
              value={title}
              onChange={(value) => {
                setTitle(value);
              }}
              label="Internship Title"
            />
            <div className={styles.startEndDateContainer}>
              <Input
                id="create-internship-start-date"
                className={styles.startEndDate}
                type="date"
                value={startDate}
                onChange={(value) => {
                  setStartDate(value);
                }}
                label="Start Date"
              />
              <Input
                id="create-internship-end-date"
                className={styles.startEndDate}
                type="date"
                value={endDate}
                onChange={(value) => {
                  setEndDate(value);
                }}
                label="End Date"
              />
            </div>
            <Input
              id="create-internship-hours"
              value={hours}
              onChange={(value) => {
                setHours(value);
              }}
              //TODO: Come up with a better label
              label="Hours"
            />

            <TextArea
              id="create-internship-description"
              className={styles.textarea}
              value={description}
              onChange={(value) => {
                setDescription(value);
              }}
              rows={5}
              label="Internship Description"
            />
          </>
        )}
      </div>
    </div>
  );
}
