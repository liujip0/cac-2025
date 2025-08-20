import { Input, Password } from "@liujip0/components";
import { useState } from "react";
import TopBar from "../components/TopBar/TopBar.tsx";
import styles from "./signup.module.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

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
        />
        <Input
          id="signup-first-name"
          className={styles.input}
          value={firstName}
          onChange={(value) => {
            setFirstName(value);
          }}
          label="First Name"
        />
        <Input
          id="signup-last-name"
          className={styles.input}
          value={lastName}
          onChange={(value) => {
            setLastName(value);
          }}
          label="Last Name"
        />
        <Input
          id="signup-username"
          className={styles.input}
          value={username}
          onChange={(value) => {
            setUsername(value);
          }}
          label="Username"
        />
        <Password
          id="signup-password"
          className={styles.input}
          value={password}
          onChange={(value) => {
            setPassword(value);
          }}
          label="Password"
        />
      </div>
    </div>
  );
}
