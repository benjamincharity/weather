import { createFileRoute } from '@tanstack/react-router';
import ForecastCompare from '../features/forecast/ForecastCompare';

export const Route = createFileRoute('/forecast/compare')({
  component: ForecastCompare,
});
