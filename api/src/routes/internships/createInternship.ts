import { TRPCError } from "@trpc/server";
import z from "zod";
import type { InternshipsRow } from "../../dbtypes/Internships.ts";
import { authorizedProcedure } from "../../trpc.ts";

export const createInternship = authorizedProcedure
  .input(
    z.object({
      title: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      weeklyHours: z.number().min(0).max(168),
      description: z.string(),
      address: z.string(),
      hourlyPay: z.number().min(0),
    })
  )
  .mutation(async (opts) => {
    const results = await opts.ctx.env.DB.prepare(
      `INSERT INTO Internships
        (title, start_date, end_date, weekly_hours, description, address, business, hourly_pay)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *;`
    )
      .bind(
        opts.input.title,
        opts.input.startDate,
        opts.input.endDate,
        opts.input.weeklyHours,
        opts.input.description,
        opts.input.address,
        opts.ctx.user.username,
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
