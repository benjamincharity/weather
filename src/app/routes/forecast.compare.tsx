import { createFileRoute } from "@tanstack/react-router";
import ForecastCompare from "../features/forecast/ForecastCompare.tsx";

export const Route = createFileRoute("/forecast/compare")({
  component: ForecastCompare,
});
