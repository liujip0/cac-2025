import { D1Database } from "@cloudflare/workers-types";
import {
  type FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { createContext } from "./context.ts";
import { appRouter } from "./routes/routes.ts";

export interface Env {
  DB: D1Database;

  JWT_SECRET_KEY: string;
}

const handler = (request: Request, env: Env): Promise<Response> => {
  if (request.method === "OPTIONS") {
    const responseHeaders = new Headers();
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    responseHeaders.set("Access-Control-Allow-Headers", "*, Authorization");
    responseHeaders.set("Access-Control-Allow-Methods", "*");
    responseHeaders.set("Allow", "GET, POST, OPTIONS");

    return Promise.resolve(
      new Response(null, {
        status: 204,
        headers: responseHeaders,
      })
    );
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
};

export const POST = handler;
export const GET = handler;
export const OPTIONS = handler;
