import { Button, Input, Password } from "@liujip0/components";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import TopBar from "../components/TopBar/TopBar.tsx";
import { trpc } from "../trpc.ts";
import styles from "./login.module.css";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loginError, setLoginError] = useState("");
  const login = useMutation(
    trpc.users.login.mutationOptions({
      onSuccess: (data) => {
        if (data) {
          setLoginError("");
          localStorage.setItem("api_token", data);
          navigate("/");
        } else {
          setLoginError("Error: Empty response from server");
        }
      },
      onError: (error) => {
        setLoginError("Error: " + error.message);
      },
    })
  );

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
              login.mutate({
                username,
                password,
              });
            }
          }}>
          Submit
        </Button>
        <p className={styles.error}>{loginError}</p>
      </div>
    </div>
  );
}
