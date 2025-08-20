import { Button, Input, Password } from "@liujip0/components";
import { useState } from "react";
import TopBar from "../components/TopBar/TopBar.tsx";
import styles from "./login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loginError, setLoginError] = useState("");

  return (
    <div className={styles.page}>
      <TopBar />
      <div className={styles.content}>
        <h1 className={styles.title}>Log In</h1>
        <Input
          id="login-username"
          className={styles.input}
          value={username}
          onChange={(value) => {
            setUsername(value);
          }}
          label="Username or Email"
          error={usernameError !== ""}
          helperText={usernameError}
        />
        <Password
          id="login-password"
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
          onClick={() => {
            let error = false;
            setLoginError("");

            if (username.length === 0) {
              setUsernameError("Username or email is required");
              error = true;
            } else {
              setUsernameError("");
            }

            if (password.length === 0) {
              setPasswordError("Password is required");
              error = true;
            } else {
              setPasswordError("");
            }

            if (!error) {
            }
          }}>
          Submit
        </Button>
        <p className={styles.error}>{loginError}</p>
      </div>
    </div>
  );
}
