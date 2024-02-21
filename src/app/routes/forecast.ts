import { createFileRoute } from "@tanstack/react-router";
import Forecast from "../features/forecast/Forecast.tsx";

export const Route = createFileRoute("/forecast")({
  component: Forecast,
});
