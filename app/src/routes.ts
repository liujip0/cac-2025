import {
  index,
  prefix,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("signup", "routes/signup.tsx"),
  route("login", "routes/login.tsx"),
  ...prefix("i", [
    route("create", "routes/i/create.tsx"),
    route("view/:internshipId", "routes/i/view.tsx"),
  ]),
] satisfies RouteConfig;
