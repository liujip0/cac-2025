import { router } from "../../trpc.ts";
import { checkusername } from "./checkusername.ts";
import { login } from "./login.ts";
import { signup } from "./signup.ts";

export const usersRouter = router({
  signup: signup,
  login: login,
  checkusername: checkusername,
});
