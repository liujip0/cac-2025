import { router } from "../../trpc.ts";
import { createInternship } from "./createInternship.ts";

export const internshipsRouter = router({
  createInternship,
});
