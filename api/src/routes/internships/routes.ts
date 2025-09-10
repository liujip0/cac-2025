import { router } from "../../trpc.ts";
import { createInternship } from "./createInternship.ts";
import { getInternship } from "./getInternship.ts";

export const internshipsRouter = router({
  createInternship,
  getInternship,
});
