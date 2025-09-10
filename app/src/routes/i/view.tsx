import type { Route } from "./+types/view";

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return params;
}

export default function ViewInternship({ params }: Route.ComponentProps) {
  return (
    <div>
      <h1>View Internship</h1>
      <p>Internship ID: {params.internshipId}</p>
    </div>
  );
}
