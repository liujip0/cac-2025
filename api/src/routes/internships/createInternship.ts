import { TRPCError } from "@trpc/server";
import z from "zod";
import type { InternshipsRow } from "../../dbtypes/Internships.ts";
import { authorizedProcedure } from "../../trpc.ts";

export const createInternship = authorizedProcedure
  .input(
    z.object({
      title: z.string(),
      websiteUrl: z.string(),
      email: z.string(),
      description: z.string(),
      industry: z.string(),
      lengthWeeks: z.number().int().positive(),
      weeklyHoursLow: z.number().min(0).max(168),
      weeklyHoursHigh: z.number().min(0).max(168),
      ageMin: z.number().int().nonnegative(),
      ageMax: z.number().int().nonnegative(),
      address: z.string(),
      hourlyPay: z.number().min(0),
    })
  )
  .mutation(async (opts) => {
    const results = await opts.ctx.env.DB.prepare(
      `INSERT INTO
        Internships (
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
        )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *;`
    )
      .bind(
        opts.input.title,
        opts.ctx.user.username,
        opts.input.websiteUrl,
        opts.input.email,
        opts.input.description,
        opts.input.industry,
        opts.input.lengthWeeks,
        opts.input.weeklyHoursLow,
        opts.input.weeklyHoursHigh,
        opts.input.ageMin,
        opts.input.ageMax,
        opts.input.address,
        opts.input.hourlyPay
      )
      .run<InternshipsRow>();

    if (!results.success) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create internship",
      });
    }

    return results.results[0].id;
  });
