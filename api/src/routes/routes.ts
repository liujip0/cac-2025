import { router } from "../trpc.ts";
import { internshipsRouter } from "./internships/routes.ts";
import { usersRouter } from "./users/routes.ts";

export const appRouter = router({
  internships: internshipsRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
