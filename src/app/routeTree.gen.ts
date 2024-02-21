/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as ForecastImport } from './routes/forecast';
import { Route as IndexImport } from './routes/index';
import { Route as ForecastCompareImport } from './routes/forecast.compare';

// Create/Update Routes

const ForecastRoute = ForecastImport.update({
  path: '/forecast',
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any);

const ForecastCompareRoute = ForecastCompareImport.update({
  path: '/compare',
  getParentRoute: () => ForecastRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    '/forecast': {
      preLoaderRoute: typeof ForecastImport;
      parentRoute: typeof rootRoute;
    };
    '/forecast/compare': {
      preLoaderRoute: typeof ForecastCompareImport;
      parentRoute: typeof ForecastImport;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  ForecastRoute.addChildren([ForecastCompareRoute]),
]);

/* prettier-ignore-end */
