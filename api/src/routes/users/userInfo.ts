import type { UsersRow } from "../../dbtypes/Users.ts";
import { authorizedProcedure } from "../../trpc.ts";

export type UserInfoResult = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: UsersRow["user_type"];
};

export const userInfo = authorizedProcedure.query(
  async (opts): Promise<UserInfoResult> => {
    return {
      username: opts.ctx.user.username,
      email: opts.ctx.user.email,
      firstName: opts.ctx.user.firstName,
      lastName: opts.ctx.user.lastName,
      userType: opts.ctx.user.userType,
    };
  }
);
