import { useRouterState } from "@tanstack/react-router";
import { AppRouterState } from "../../features/forecast/Forecast.tsx";
import React from "react";

export const CompareLocationsLink = React.memo(() => {
  const state = useRouterState() as AppRouterState;

  return (
    <a
      className="relative inline-flex overflow-hidden rounded-3xl p-[4px] hover:ring-2 hover:ring-orange-200 hover:ring-offset-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-4 focus:ring-offset-orange-50"
      href={"/forecast/compare" + state.location.searchStr}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FF4500_0%,#FFA500_50%,#FFFF00_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-3xl bg-white px-3 py-2 font-medium text-black backdrop-blur-3xl hover:font-semibold">
        <span className={"inline-block whitespace-nowrap"}>
          Compare two locations
        </span>
        <svg
          className="flex-shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </a>
  );
});
