import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type LinksFunction,
  type MetaFunction,
} from "react-router";
import type { Route } from "./+types/root";
import "./index.css";
import styles from "./root.module.css";

// eslint-disable-next-line react-refresh/only-export-components
export const meta: MetaFunction = () => {
  return [
    {
      title: "HS Internship Finder",
    },
    {
      property: "description",
      content: "A platform to find high school internships easily.",
    },
  ];
};

// eslint-disable-next-line react-refresh/only-export-components
export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: import.meta.env.BASE_URL + "favicon.ico",
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404 ?
        "The requested page could not be found."
      : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className={styles.errorBoundaryMain}>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className={styles.errorBoundaryPre}>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
