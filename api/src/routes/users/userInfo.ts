import { authorizedProcedure } from "../../trpc.ts";

export type UserInfoResult = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

export const userInfo = authorizedProcedure.query(
  async (opts): Promise<UserInfoResult> => {
    return {
      username: opts.ctx.user.username,
      email: opts.ctx.user.email,
      firstName: opts.ctx.user.firstName,
      lastName: opts.ctx.user.lastName,
    };
  }
);
