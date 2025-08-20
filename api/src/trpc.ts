import { initTRPC, TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import type { Context } from "./context.ts";
import type { UsersRow } from "./dbtypes/Users.ts";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const authorizedProcedure = t.procedure.use(async (opts) => {
  const token = opts.ctx.req.headers
    .get("Authorization")
    ?.replace("Bearer ", "");
  if (!token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Missing or invalid token",
    });
  }

  const validToken = jwt.verify(
    token,
    opts.ctx.env.JWT_SECRET_KEY
  ) as jwt.JwtPayload;
  if ("token_secret" in validToken && "username" in validToken) {
    const user = await opts.ctx.env.DB.prepare(
      "SELECT username, token_secret, email, first_name, last_name FROM Users WHERE username = ?"
    )
      .bind(validToken.username)
      .run<UsersRow>();

    if (user.success) {
      if (user.results[0].token_secret === validToken.token_secret) {
        return opts.next({
          ...opts,
          ctx: {
            user: {
              username: user.results[0].username,
              email: user.results[0].email,
              firstName: user.results[0].first_name,
              lastName: user.results[0].last_name,
            },
          },
        });
      } else {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Missing or invalid token",
        });
      }
    } else {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Missing or invalid token",
      });
    }
  }
});
