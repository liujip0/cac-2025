import { router } from "../../trpc.ts";
import { checkusername } from "./checkusername.ts";
import { login } from "./login.ts";
import { signup } from "./signup.ts";
import { userInfo } from "./userInfo.ts";

export const usersRouter = router({
  signup: signup,
  login: login,
  checkUsername: checkusername,
  userInfo: userInfo,
});
