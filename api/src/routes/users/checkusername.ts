import { TRPCError } from "@trpc/server";
import z from "zod";
import { publicProcedure } from "../../trpc.ts";

type CheckUsernameResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      message: string;
    };

export const checkUsername = publicProcedure
  .input(z.string())
  .query(async (opts): Promise<CheckUsernameResult> => {
    if (opts.input.length < 3) {
      return {
        ok: false,
        message: "Username must be at least 3 characters long",
      };
    }

    const result = await opts.ctx.env.DB.prepare(
      "SELECT COUNT(*) as count FROM Users WHERE username = ?"
    )
      .bind(opts.input)
      .run();

    if (result.success) {
      if (result.results[0]["count"] === 0) {
        return {
          ok: true,
        } as CheckUsernameResult;
      } else {
        return {
          ok: false,
          message: "Username is already taken",
        } as CheckUsernameResult;
      }
    } else {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to check username",
      });
    }
  });
