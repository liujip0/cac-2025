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
      hours: z.string(),
      description: z.string(),
      address: z.string(),
    })
  )
  .mutation(async (opts) => {
    const results = await opts.ctx.env.DB.prepare(
      `INSERT INTO Internships
        (title, start_date, end_date, hours, description, address, business)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      RETURNING *;`
    )
      .bind(
        opts.input.title,
        opts.input.startDate,
        opts.input.endDate,
        opts.input.hours,
        opts.input.description,
        opts.input.address,
        opts.ctx.user.username
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
