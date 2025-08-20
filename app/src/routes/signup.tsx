import { Button, Input, Password } from "@liujip0/components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TopBar from "../components/TopBar/TopBar.tsx";
import { trpc } from "../trpc.ts";
import styles from "./signup.module.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const checkusername = useQuery(
    trpc.users.checkusername.queryOptions(username, {
      initialData: { ok: true },
    })
  );
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const signup = useMutation(trpc.users.signup.mutationOptions());

  return (
    <div className={styles.page}>
      <TopBar />
      <div className={styles.content}>
        <h1 className={styles.title}>Sign Up</h1>
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
        />
        <Input
          id="signup-username"
          className={styles.input}
          value={username}
          onChange={(value) => {
            setUsername(value);
          }}
          label="Username"
          error={!checkusername.data?.ok}
          helperText={checkusername.data?.ok ? "" : checkusername.data.message}
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
        />
        <Button
          className={styles.submitButton}
          onClick={async () => {
            let error = false;
            await checkusername.refetch();

            if (!checkusername.data?.ok) {
              error = false;
            }
            if (email.length === 0) {
              setEmailError("Email is required");
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
              });
            }
          }}>
          Submit
        </Button>
      </div>
    </div>
  );
}
