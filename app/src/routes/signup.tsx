import type { UsersRow } from "@cac-2025/api/src/dbtypes/Users.ts";
import { Button, Input, Password, Select } from "@liujip0/components";
import { skipToken, useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import TopBar from "../components/TopBar/TopBar.tsx";
import { trpc } from "../trpc.ts";
import styles from "./signup.module.css";

// eslint-disable-next-line react-refresh/only-export-components
export const SIGNUP_STORAGE_KEYS = {
  userType: "signup-user-type",
  email: "signup-email",
  username: "signup-username",
  firstName: "signup-first-name",
  lastName: "signup-last-name",
  password: "signup-password",
};

export default function Signup() {
  const navigate = useNavigate();

  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const submitKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      submitButtonRef.current?.click();
    }
  };

  const [userType, setUserType] = useState<UsersRow["user_type"]>(
    (localStorage.getItem(
      SIGNUP_STORAGE_KEYS.userType
    ) as UsersRow["user_type"]) ?? "student"
  );
  const [email, setEmail] = useState(
    localStorage.getItem(SIGNUP_STORAGE_KEYS.email) ?? ""
  );
  const [username, setUsername] = useState(
    localStorage.getItem(SIGNUP_STORAGE_KEYS.username) ?? ""
  );
  const [firstName, setFirstName] = useState(
    localStorage.getItem(SIGNUP_STORAGE_KEYS.firstName) ?? ""
  );
  const [lastName, setLastName] = useState(
    localStorage.getItem(SIGNUP_STORAGE_KEYS.lastName) ?? ""
  );
  const [password, setPassword] = useState(
    localStorage.getItem(SIGNUP_STORAGE_KEYS.password) ?? ""
  );
  useEffect(() => {
    localStorage.setItem(SIGNUP_STORAGE_KEYS.userType, userType);
    localStorage.setItem(SIGNUP_STORAGE_KEYS.email, email);
    localStorage.setItem(SIGNUP_STORAGE_KEYS.username, username);
    localStorage.setItem(SIGNUP_STORAGE_KEYS.firstName, firstName);
    localStorage.setItem(SIGNUP_STORAGE_KEYS.lastName, lastName);
    localStorage.setItem(SIGNUP_STORAGE_KEYS.password, password);
  }, [email, firstName, lastName, password, userType, username]);

  const checkUsername = useQuery(
    trpc.users.checkUsername.queryOptions(username ? username : skipToken, {
      initialData: { ok: true },
    })
  );
  const [passwordError, setPasswordError] = useState("");

  const [signupError, setSignupError] = useState("");
  const signup = useMutation(
    trpc.users.signup.mutationOptions({
      onSuccess: () => {
        localStorage.removeItem(SIGNUP_STORAGE_KEYS.userType);
        localStorage.removeItem(SIGNUP_STORAGE_KEYS.email);
        localStorage.removeItem(SIGNUP_STORAGE_KEYS.username);
        localStorage.removeItem(SIGNUP_STORAGE_KEYS.firstName);
        localStorage.removeItem(SIGNUP_STORAGE_KEYS.lastName);
        localStorage.removeItem(SIGNUP_STORAGE_KEYS.password);

        setSignupError("");
        navigate("/login");
      },
      onError: (error) => {
        setSignupError("Error: " + error.message);
      },
    })
  );

  return (
    <div className={styles.page}>
      <TopBar />
      <div className={styles.content}>
        <h1 className={styles.title}>Sign Up</h1>
        <Select
          id="signup-user-type"
          className={styles.input}
          value={userType}
          onChange={(value) => {
            setUserType(value as UsersRow["user_type"]);
          }}
          label="Account Type">
          <option value="student">Student</option>
          <option value="business">Business/Mentor</option>
          <option value="parent">Parent</option>
          <option value="teacher">Teacher</option>
        </Select>
        <Input
          id="signup-email"
          className={styles.input}
          value={email}
          onChange={(value) => {
            setEmail(value);
          }}
          type="email"
          label="Email"
          onKeyDown={submitKeyDown}
        />
        <Input
          id="signup-first-name"
          className={styles.input}
          value={firstName}
          onChange={(value) => {
            setFirstName(value);
          }}
          label="First Name"
          onKeyDown={submitKeyDown}
        />
        <Input
          id="signup-last-name"
          className={styles.input}
          value={lastName}
          onChange={(value) => {
            setLastName(value);
          }}
          label="Last Name"
          onKeyDown={submitKeyDown}
        />
        <Input
          id="signup-username"
          className={styles.input}
          value={username}
          onChange={(value) => {
            setUsername(value);
          }}
          label="Username"
          error={!checkUsername.data?.ok && checkUsername.data?.message !== ""}
          helperText={
            "This is what will be shown to other users.\n" +
            (checkUsername.data?.ok ? "" : checkUsername.data?.message)
          }
          helperTextClassName={styles.helperText}
          onKeyDown={submitKeyDown}
        />
        <Password
          id="signup-password"
          className={styles.input}
          value={password}
          onChange={(value) => {
            setPassword(value);
          }}
          label="Password"
          error={passwordError !== ""}
          helperText={passwordError}
          onKeyDown={submitKeyDown}
        />
        <Button
          className={styles.submitButton}
          ref={submitButtonRef}
          onClick={async () => {
            let error = false;
            setSignupError("");
            await checkUsername.refetch();

            if (!checkUsername.data?.ok) {
              error = false;
            }
            if (password.length < 6) {
              setPasswordError("Password must be at least 6 characters long");
              error = true;
            } else {
              setPasswordError("");
            }

            if (!error) {
              signup.mutate({
                username,
                password,
                email,
                firstName,
                lastName,
                userType,
              });
            }
          }}>
          Submit
        </Button>
        <p className={styles.error}>{signupError}</p>
      </div>
    </div>
  );
}
