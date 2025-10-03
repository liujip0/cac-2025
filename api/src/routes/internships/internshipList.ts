import { TRPCError } from "@trpc/server";
import z from "zod";
import type { InternshipsRow } from "../../dbtypes/Internships.ts";
import { authorizedProcedure } from "../../trpc.ts";

export const internshipList = authorizedProcedure
  .input(
    z.object({
      start: z.number().int().nonnegative().default(0),
      limit: z.number().int().positive().max(100).default(20),
    })
  )
  .query(async (opts) => {
    const results = await opts.ctx.env.DB.prepare(
      `SELECT
        id, title, start_date, end_date, weekly_hours, description, address, business, hourly_pay
      FROM Internships
      ORDER BY start_date DESC
      LIMIT ? OFFSET ?;`
    )
      .bind(opts.input.limit, opts.input.start)
      .run<InternshipsRow>();

    if (!results.success) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch internships",
      });
    }
    return results.results;
  });
