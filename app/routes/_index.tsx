import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rhamsez Thevenin" },
    { name: "description", content: "Rhamsez Thevenin's personal website." },
  ];
}

export default function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl md:text-7xl font-light mb-6 tracking-tight">
          Rhamsez Thevenin
        </h1>
        <p className="text-xl md:text-2xl font-light">
          Coming Soon
        </p>
      </div>
    </div>
  );
}

