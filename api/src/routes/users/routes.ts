import { router } from "../../trpc.ts";
import { checkUsername } from "./checkUsername.ts";
import { login } from "./login.ts";
import { signup } from "./signup.ts";

export const usersRouter = router({
  signup: signup,
  login: login,
  checkUsername: checkUsername,
});
