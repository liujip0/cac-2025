import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { Env } from "./index.ts";

export const createContext = async ({
  req,
  env,
  resHeaders,
}: FetchCreateContextFnOptions & {
  env: Env;
}) => {
  const responseHeaders = resHeaders;
  responseHeaders.set("Access-Control-Allow-Origin", "*");
  responseHeaders.set(
    "Access-Control-Allow-Headers",
    "*, Content-Type, Authorization"
  );
  responseHeaders.set("Access-Control-Allow-Methods", "*");
  responseHeaders.set("Allow", "GET, POST, OPTIONS");

  return {
    req,
    env,
    resHeaders: responseHeaders,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
