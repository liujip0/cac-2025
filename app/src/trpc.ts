import type { AppRouter } from "@cac-2025/api/src/routes/routes.ts";
import { QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

export const queryClient = new QueryClient();

export const LOCAL_STORAGE_KEYS = {
  apiToken: "api_token",
};

const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_SERVER_URL + "/api",
      headers: () => ({
        Authorization:
          "Bearer " + localStorage.getItem(LOCAL_STORAGE_KEYS.apiToken) || "",
      }),
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});
