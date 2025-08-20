import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import z from "zod";
import { publicProcedure } from "../../trpc.ts";

export const signup = publicProcedure
  .input(
    z.object({
      username: z.string(),
      password: z.string(),
      email: z.string().email(),
      firstName: z.string(),
      lastName: z.string(),
    })
  )
  .mutation(async (opts) => {
    const passwordHash = await bcrypt.hash(opts.input.password, 10);

    const result = await opts.ctx.env.DB.prepare(
      "INSERT INTO Users (username, password_hash, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)"
    )
      .bind(
        opts.input.username,
        passwordHash,
        opts.input.email,
        opts.input.firstName,
        opts.input.lastName
      )
      .run();

    if (result.success) {
      return;
    } else {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create user",
      });
    }
  });
