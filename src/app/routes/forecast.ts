import { createFileRoute } from '@tanstack/react-router';
import Forecast from '../features/forecast/Forecast';

export const Route = createFileRoute('/forecast')({
  component: Forecast,
});
