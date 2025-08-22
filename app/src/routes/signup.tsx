import type { UsersRow } from "@cac-2025/api/src/dbtypes/Users.ts";
import { Button, Input, Password, Select } from "@liujip0/components";
import { skipToken, useMutation, useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import z from "zod";
import TopBar from "../components/TopBar/TopBar.tsx";
import { trpc } from "../trpc.ts";
import styles from "./signup.module.css";

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

  const [userType, setUserType] = useState<UsersRow["user_type"]>("student");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const checkUsername = useQuery(
    trpc.users.checkUsername.queryOptions(username ? username : skipToken, {
      initialData: { ok: true },
    })
  );
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [signupError, setSignupError] = useState("");
  const signup = useMutation(
    trpc.users.signup.mutationOptions({
      onSuccess: () => {
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
          error={emailError !== ""}
          helperText={emailError}
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
          error={firstNameError !== ""}
          helperText={firstNameError}
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
          error={lastNameError !== ""}
          helperText={lastNameError}
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
          helperText={checkUsername.data?.ok ? "" : checkUsername.data?.message}
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
            if (email.length === 0) {
              setEmailError("Email is required");
              error = true;
            } else if (!z.email().safeParse(email).success) {
              setEmailError("Invalid email address");
              error = true;
            } else {
              setEmailError("");
            }
            if (firstName.length === 0) {
              setFirstNameError("First name is required");
              error = true;
            } else {
              setFirstNameError("");
            }
            if (lastName.length === 0) {
              setLastNameError("Last name is required");
              error = true;
            } else {
              setLastNameError("");
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
