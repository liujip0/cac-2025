import { D1Database } from "@cloudflare/workers-types";
import {
  type FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { createContext } from "./context.ts";
import { appRouter } from "./routes/routes.ts";

export interface Env {
  DB: D1Database;

  FRONTEND_URL: string;

  JWT_SECRET_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      const response = new Response(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": env.FRONTEND_URL,
          Vary: "Origin",
          "Access-Control-Expose-Headers": "Content-Type,Authorization,Accept",
          "Access-Control-Max-Age": (60 * 60 * 24).toString(),
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type,Authorization,Accept,Accept-Language",
        },
      });
      return response;
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
