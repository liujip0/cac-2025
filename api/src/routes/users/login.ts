import type { D1Result } from "@cloudflare/workers-types";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import z from "zod";
import type { UsersRow } from "../../dbtypes/Users.ts";
import { publicProcedure } from "../../trpc.ts";

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

    if (!user.success) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch user",
      });
    }

    if (user.results.length === 0) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid username or password",
      });
    }

    const passwordHash = user.results[0].password_hash;
    const validPassword = await bcrypt.compare(
      opts.input.password,
      passwordHash
    );

    if (!validPassword) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid username or password",
      });
    }

    return jwt.sign(
      {
        token_secret: user.results[0].token_secret,
        username: user.results[0].username,
      },
      opts.ctx.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
  });
