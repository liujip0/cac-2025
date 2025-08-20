import { D1Database } from "@cloudflare/workers-types";
import {
  type FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { createContext } from "./context.ts";
import { appRouter } from "./routes/routes.ts";

export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      const responseHeaders = new Headers();
      responseHeaders.set("Access-Control-Allow-Origin", "*");
      responseHeaders.set("Access-Control-Allow-Headers", "*, Authorization");

      return new Response(null, {
        status: 204,
        headers: responseHeaders,
      });
    }

    return fetchRequestHandler({
      endpoint: "/api",
      req: request,
      router: appRouter,
      createContext: (options: FetchCreateContextFnOptions) =>
        createContext({
          ...options,
          env,
        }),
    });
  },
};
