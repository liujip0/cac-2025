import type { D1Result } from "@cloudflare/workers-types";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import z from "zod";
import { publicProcedure } from "../../trpc.ts";

type UsersRow = {
  username: string;
  password_hash: string;
  email: string;
  first_name: string;
  last_name: string;
  token_secret: string;
};

export const login = publicProcedure
  .input(
    z.object({
      username: z.string(),
      password: z.string(),
    })
  )
  .mutation(async (opts) => {
    let user: D1Result<UsersRow>;

    if (z.email().safeParse(opts.input.username).success) {
      user = await opts.ctx.env.DB.prepare(
        "SELECT username, email, password_hash, token_secret FROM Users WHERE email = ?"
      )
        .bind(opts.input.username)
        .run<UsersRow>();
    } else {
      user = await opts.ctx.env.DB.prepare(
        "SELECT username, email, password_hash, token_secret FROM Users WHERE username = ?"
      )
        .bind(opts.input.username)
        .run<UsersRow>();
    }

    if (user.success) {
      if (user.results.length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username or password",
        });
      } else {
        const passwordHash = user.results[0].password_hash;
        const validPassword = await bcrypt.compare(
          opts.input.password,
          passwordHash
        );
        if (validPassword) {
          return jwt.sign(
            {
              token_secret: user.results[0].token_secret,
            },
            opts.ctx.env.JWT_SECRET_KEY,
            {
              expiresIn: "7d",
            }
          );
        }
      }
    }
  });
