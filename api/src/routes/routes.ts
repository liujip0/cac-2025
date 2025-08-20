import { router } from "../trpc.ts";
import { usersRouter } from "./users/routes.ts";

export const appRouter = router({
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
