import type { Route } from "./+types/viewinternship";

// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-unused-vars
export async function loader(_params: Route.LoaderArgs) {}

export default function ViewInternship({ params }: Route.ComponentProps) {
  return (
    <div>
      <h1>View Internship</h1>
      <p>Internship ID: {params.internshipId}</p>
    </div>
  );
}
