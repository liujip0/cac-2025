import { router } from "../../trpc.ts";
import { createInternship } from "./createInternship.ts";
import { getInternship } from "./getInternship.ts";
import { internshipList } from "./internshipList.ts";

export const internshipsRouter = router({
  createInternship,
  getInternship,
  internshipList,
});
