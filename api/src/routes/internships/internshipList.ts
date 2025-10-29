import { TRPCError } from "@trpc/server";
import z from "zod";
import type { InternshipsRow } from "../../dbtypes/Internships.ts";
import { authorizedProcedure } from "../../trpc.ts";

export const internshipList = authorizedProcedure
  .input(
    z.object({
      start: z.number().int().nonnegative().default(0),
      limit: z.number().int().positive().max(100).default(20),
      paid: z.boolean(),
      unpaid: z.boolean(),
      industry: z.string().optional(),
    })
  )
  .query(async (opts) => {
    const filters = [];

    if (opts.input.paid && !opts.input.unpaid) {
      filters.push("hourly_pay IS NOT NULL AND hourly_pay > 0");
    } else if (!opts.input.paid && opts.input.unpaid) {
      filters.push("hourly_pay IS NULL OR hourly_pay = 0");
    } else if (!opts.input.paid && !opts.input.unpaid) {
      filters.push("1 = 0");
    }

    if (opts.input.industry) {
      filters.push(`industry = '${opts.input.industry}'`);
    }

    const results = await opts.ctx.env.DB.prepare(
      `SELECT
        id,
        title,
        business,
        website_url,
        email,
        description,
        industry,
        length_weeks,
        weekly_hours_low,
        weekly_hours_high,
        age_min,
        age_max,
        address,
        hourly_pay
      FROM Internships` +
        (filters.length > 0 ? " WHERE " : "") +
        filters.join(" AND ") +
        `
      ORDER BY hourly_pay DESC
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
