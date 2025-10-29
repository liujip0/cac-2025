import { TRPCError } from "@trpc/server";
import z from "zod";
import type { InternshipsRow } from "../../dbtypes/Internships.ts";
import { authorizedProcedure } from "../../trpc.ts";

export const getInternship = authorizedProcedure
  .input(
    z.object({
      id: z.number().int().positive(),
    })
  )
  .query(async (opts) => {
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
      FROM Internships
      WHERE id = ?
      LIMIT 1;`
    )
      .bind(opts.input.id)
      .run<InternshipsRow>();

    if (!results.success) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch internship",
      });
    }
    return results.results[0];
  });
