import { Button, Input, TextArea } from "@liujip0/components";
import { skipToken, useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AddressInput, {
  ADDRESS_INITIAL_VALUE,
} from "../../components/AddressInput/AddressInput.tsx";
import TopBar from "../../components/TopBar/TopBar.tsx";
import { LOCAL_STORAGE_KEYS, trpc } from "../../trpc.ts";
import styles from "./create.module.css";

// eslint-disable-next-line react-refresh/only-export-components
export const CREATE_INTERNSHIP_STORAGE_KEYS = {
  title: "create-internship-title",
  websiteUrl: "create-internship-website-url",
  email: "create-internship-email",
  description: "create-internship-description",
  industry: "create-internship-industry",
  lengthWeeks: "create-internship-length-weeks",
  weeklyHoursLow: "create-internship-weekly-hours-low",
  weeklyHoursHigh: "create-internship-weekly-hours-high",
  ageMin: "create-internship-age-min",
  ageMax: "create-internship-age-max",
  address: "create-internship-address",
  hourlyPay: "create-internship-hourly-pay",
};

export default function CreateInternship() {
  const navigate = useNavigate();

  const userInfo = useQuery(
    trpc.users.userInfo.queryOptions(
      localStorage.getItem(LOCAL_STORAGE_KEYS.apiToken) ? undefined : skipToken
    )
  );

  const [submitError, setSubmitError] = useState("");
  const createInternship = useMutation(
    trpc.internships.createInternship.mutationOptions({
      onSuccess(data) {
        localStorage.removeItem(CREATE_INTERNSHIP_STORAGE_KEYS.title);
        localStorage.removeItem(CREATE_INTERNSHIP_STORAGE_KEYS.websiteUrl);
        localStorage.removeItem(CREATE_INTERNSHIP_STORAGE_KEYS.email);
        localStorage.removeItem(CREATE_INTERNSHIP_STORAGE_KEYS.description);
        localStorage.removeItem(CREATE_INTERNSHIP_STORAGE_KEYS.industry);
        localStorage.removeItem(CREATE_INTERNSHIP_STORAGE_KEYS.lengthWeeks);
        localStorage.removeItem(CREATE_INTERNSHIP_STORAGE_KEYS.weeklyHoursLow);
        localStorage.removeItem(CREATE_INTERNSHIP_STORAGE_KEYS.weeklyHoursHigh);
        localStorage.removeItem(CREATE_INTERNSHIP_STORAGE_KEYS.ageMin);
        localStorage.removeItem(CREATE_INTERNSHIP_STORAGE_KEYS.ageMax);
        localStorage.removeItem(CREATE_INTERNSHIP_STORAGE_KEYS.address);
        localStorage.removeItem(CREATE_INTERNSHIP_STORAGE_KEYS.hourlyPay);

        setSubmitError("");
        navigate(`/i/view/${data}`);
      },
      onError(error) {
        setSubmitError("Error: " + error.message);
      },
    })
  );

  const [title, setTitle] = useState(
    localStorage.getItem(CREATE_INTERNSHIP_STORAGE_KEYS.title) ?? ""
  );
  const [titleError, setTitleError] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState(
    localStorage.getItem(CREATE_INTERNSHIP_STORAGE_KEYS.websiteUrl) ?? ""
  );
  const [email, setEmail] = useState(
    localStorage.getItem(CREATE_INTERNSHIP_STORAGE_KEYS.email) ?? ""
  );
  const [description, setDescription] = useState(
    localStorage.getItem(CREATE_INTERNSHIP_STORAGE_KEYS.description) ?? ""
  );
  const [descriptionError, setDescriptionError] = useState("");
  const [industry, setIndustry] = useState(
    localStorage.getItem(CREATE_INTERNSHIP_STORAGE_KEYS.industry) ?? ""
  );
  const [lengthWeeks, setLengthWeeks] = useState(
    localStorage.getItem(CREATE_INTERNSHIP_STORAGE_KEYS.lengthWeeks) ?? ""
  );
  const [weeklyHoursLow, setWeeklyHoursLow] = useState(
    localStorage.getItem(CREATE_INTERNSHIP_STORAGE_KEYS.weeklyHoursLow) ?? ""
  );
  const [weeklyHoursHigh, setWeeklyHoursHigh] = useState(
    localStorage.getItem(CREATE_INTERNSHIP_STORAGE_KEYS.weeklyHoursHigh) ?? ""
  );
  const [ageMin, setAgeMin] = useState(
    localStorage.getItem(CREATE_INTERNSHIP_STORAGE_KEYS.ageMin) ?? ""
  );
  const [ageMax, setAgeMax] = useState(
    localStorage.getItem(CREATE_INTERNSHIP_STORAGE_KEYS.ageMax) ?? ""
  );
  const [address, setAddress] = useState(
    localStorage.getItem(CREATE_INTERNSHIP_STORAGE_KEYS.address) ??
      ADDRESS_INITIAL_VALUE.US
  );
  const [hourlyPay, setHourlyPay] = useState(
    localStorage.getItem(CREATE_INTERNSHIP_STORAGE_KEYS.hourlyPay) ?? "0.00"
  );
  const [hourlyPayError, setHourlyPayError] = useState("");
  useEffect(() => {
    localStorage.setItem(CREATE_INTERNSHIP_STORAGE_KEYS.title, title);
    localStorage.setItem(CREATE_INTERNSHIP_STORAGE_KEYS.websiteUrl, websiteUrl);
    localStorage.setItem(CREATE_INTERNSHIP_STORAGE_KEYS.email, email);
    localStorage.setItem(
      CREATE_INTERNSHIP_STORAGE_KEYS.description,
      description
    );
    localStorage.setItem(CREATE_INTERNSHIP_STORAGE_KEYS.industry, industry);
    localStorage.setItem(
      CREATE_INTERNSHIP_STORAGE_KEYS.lengthWeeks,
      lengthWeeks
    );
    localStorage.setItem(
      CREATE_INTERNSHIP_STORAGE_KEYS.weeklyHoursLow,
      weeklyHoursLow
    );
    localStorage.setItem(
      CREATE_INTERNSHIP_STORAGE_KEYS.weeklyHoursHigh,
      weeklyHoursHigh
    );
    localStorage.setItem(CREATE_INTERNSHIP_STORAGE_KEYS.ageMin, ageMin);
    localStorage.setItem(CREATE_INTERNSHIP_STORAGE_KEYS.ageMax, ageMax);
    localStorage.setItem(CREATE_INTERNSHIP_STORAGE_KEYS.address, address);
    localStorage.setItem(CREATE_INTERNSHIP_STORAGE_KEYS.hourlyPay, hourlyPay);
  }, [
    address,
    ageMax,
    ageMin,
    description,
    email,
    hourlyPay,
    industry,
    lengthWeeks,
    title,
    websiteUrl,
    weeklyHoursHigh,
    weeklyHoursLow,
  ]);

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
              error={titleError !== ""}
              helperText={titleError}
            />

            <Input
              id="create-internship-website-url"
              value={websiteUrl}
              onChange={(value) => {
                setWebsiteUrl(value);
              }}
              label="Website URL"
            />

            <Input
              id="create-internship-email"
              value={email}
              onChange={(value) => {
                setEmail(value);
              }}
              label="Contact Email"
            />

            <Input
              id="create-internship-industry"
              value={industry}
              onChange={(value) => {
                setIndustry(value);
              }}
              label="Industry / Topic"
            />

            <div className={styles.startEndDateContainer}>
              <Input
                id="create-internship-age-min"
                className={styles.startEndDate}
                value={ageMin}
                onChange={(value) => {
                  setAgeMin(value);
                }}
                label="Min. Age"
              />
              <Input
                id="create-internship-age-max"
                className={styles.startEndDate}
                value={ageMax}
                onChange={(value) => {
                  setAgeMax(value);
                }}
                label="Max. Age"
              />
            </div>

            <Input
              id="create-internship-hourly-pay"
              type="number"
              value={hourlyPay}
              onChange={(value) => {
                setHourlyPay(value);
              }}
              min={0}
              label="Hourly Pay"
              startIcon={"$"}
              error={hourlyPayError !== ""}
              helperText={hourlyPayError}
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
              error={descriptionError !== ""}
              helperText={descriptionError}
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

            <Input
              id="create-internship-length-weeks"
              value={lengthWeeks}
              onChange={(value) => {
                setLengthWeeks(value);
              }}
              label="Length (weeks)"
            />

            <div className={styles.startEndDateContainer}>
              <Input
                id="create-internship-weekly-hours-low"
                className={styles.startEndDate}
                value={weeklyHoursLow}
                onChange={(value) => {
                  setWeeklyHoursLow(value);
                }}
                label="Weekly Hours"
              />
              <div className={styles.startEndDateText}> to </div>
              <Input
                id="create-internship-weekly-hours-high"
                className={styles.startEndDate}
                value={weeklyHoursHigh}
                onChange={(value) => {
                  setWeeklyHoursHigh(value);
                }}
                label="_"
              />
            </div>

            <Button
              className={styles.submitButton}
              onClick={() => {
                let error = false;
                if (title === "") {
                  setTitleError("Title is required");
                  error = true;
                } else {
                  setTitleError("");
                }

                if (description === "") {
                  setDescriptionError("Description is required");
                  error = true;
                } else {
                  setDescriptionError("");
                }

                if (hourlyPay === "" || isNaN(parseFloat(hourlyPay))) {
                  setHourlyPayError("Hourly pay must be a valid number");
                  error = true;
                } else if (parseFloat(hourlyPay) < 0) {
                  setHourlyPayError("Hourly pay cannot be negative");
                  error = true;
                } else {
                  setHourlyPayError("");
                }

                if (error) {
                  return;
                }
                createInternship.mutate({
                  title,
                  websiteUrl: websiteUrl === "" ? null : websiteUrl,
                  email: email === "" ? null : email,
                  description,
                  industry: industry === "" ? null : industry,
                  lengthWeeks:
                    lengthWeeks === "" ? null : parseInt(lengthWeeks),
                  weeklyHoursLow:
                    weeklyHoursLow === "" ? null : parseInt(weeklyHoursLow),
                  weeklyHoursHigh:
                    weeklyHoursHigh === "" ? null : parseInt(weeklyHoursHigh),
                  ageMin: ageMin === "" ? null : parseInt(ageMin),
                  ageMax: ageMax === "" ? null : parseInt(ageMax),
                  address,
                  hourlyPay: parseFloat(hourlyPay),
                });
              }}>
              Submit
            </Button>
            <p className={styles.submitError}>{submitError}</p>
          </>
        )}
      </div>
    </div>
  );
}
