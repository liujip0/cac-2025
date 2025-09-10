import { Button, Input, TextArea } from "@liujip0/components";
import { skipToken, useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AddressInput, {
  ADDRESS_INITIAL_VALUE,
} from "../../components/AddressInput/AddressInput.tsx";
import TopBar from "../../components/TopBar/TopBar.tsx";
import { LOCAL_STORAGE_KEYS, trpc } from "../../trpc.ts";
import styles from "./create.module.css";

// eslint-disable-next-line react-refresh/only-export-components
export const CREATE_INTERNSHIP_STORAGE_KEYS = {
  title: "create-internship-title",
  startDate: "create-internship-start-date",
  endDate: "create-internship-end-date",
  hours: "create-internship-hours",
  description: "create-internship-description",
  address: "create-internship-address",
};

export default function CreateInternship() {
  const userInfo = useQuery(
    trpc.users.userInfo.queryOptions(
      localStorage.getItem(LOCAL_STORAGE_KEYS.apiToken) ? undefined : skipToken
    )
  );

  const createInternship = useMutation(
    trpc.internships.createInternship.mutationOptions({
      onSuccess(data) {},
      onError(error) {},
    })
  );

  const [title, setTitle] = useState(
    localStorage.getItem(CREATE_INTERNSHIP_STORAGE_KEYS.title) ?? ""
  );
  const [startDate, setStartDate] = useState(
    localStorage.getItem(CREATE_INTERNSHIP_STORAGE_KEYS.startDate) ?? ""
  );
  const [endDate, setEndDate] = useState(
    localStorage.getItem(CREATE_INTERNSHIP_STORAGE_KEYS.endDate) ?? ""
  );
  const [hours, setHours] = useState(
    localStorage.getItem(CREATE_INTERNSHIP_STORAGE_KEYS.hours) ?? ""
  );
  const [description, setDescription] = useState(
    localStorage.getItem(CREATE_INTERNSHIP_STORAGE_KEYS.description) ?? ""
  );
  const [address, setAddress] = useState(
    localStorage.getItem(CREATE_INTERNSHIP_STORAGE_KEYS.address) ??
      ADDRESS_INITIAL_VALUE.US
  );
  useEffect(() => {
    localStorage.setItem(CREATE_INTERNSHIP_STORAGE_KEYS.title, title);
    localStorage.setItem(CREATE_INTERNSHIP_STORAGE_KEYS.startDate, startDate);
    localStorage.setItem(CREATE_INTERNSHIP_STORAGE_KEYS.endDate, endDate);
    localStorage.setItem(CREATE_INTERNSHIP_STORAGE_KEYS.hours, hours);
    localStorage.setItem(
      CREATE_INTERNSHIP_STORAGE_KEYS.description,
      description
    );
    localStorage.setItem(CREATE_INTERNSHIP_STORAGE_KEYS.address, address);
  }, [title, startDate, endDate, hours, description, address]);

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
              label="Title"
            />

            <TextArea
              id="create-internship-description"
              className={styles.textarea}
              value={description}
              onChange={(value) => {
                setDescription(value);
              }}
              rows={5}
              label="Description"
            />

            <h2 className={styles.categoryHeading}>Internship Location</h2>
            <AddressInput
              id="create-internship-address"
              value={address}
              onChange={(value) => {
                setAddress(value);
              }}
            />

            <h2 className={styles.categoryHeading}>
              Internship Duration & Timing
            </h2>
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
              label="Hours"
            />

            <Button className={styles.submitButton}>Submit</Button>
          </>
        )}
      </div>
    </div>
  );
}
