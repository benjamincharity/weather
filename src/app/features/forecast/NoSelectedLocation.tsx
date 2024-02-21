import { Card } from "@ui/Card";
import { Link, LinkProps, useRouterState } from "@tanstack/react-router";
import { AppRouterState } from "./Forecast.tsx";

function CustomLink(props: LinkProps) {
  return (
    <Link
      className={
        "py-3 px-4 block items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-white text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      }
      {...props}
    />
  );
}

interface NoSelectedLocationProps {
  isCompareRoute?: boolean;
}

export function NoSelectedLocation({
  isCompareRoute,
}: NoSelectedLocationProps) {
  const state = useRouterState() as AppRouterState;

  function generateNewSearch(newLocation: string) {
    return isCompareRoute
      ? {
          location: state.location.search.location,
          location2: newLocation,
        }
      : {
          location: newLocation,
          location2: state.location.search.location2,
        };
  }

  return (
    <Card className={"p-2"}>
      <h3 className={"text-lg font-bold"}>Enter a location above 👆🏼</h3>
      <p className={"text-sm font-bold mb-2"}>
        or select a location to get started!
      </p>

      <div className={"grid grid-cols-3 gap-2"}>
        <CustomLink search={generateNewSearch("40.7127753,-74.0059728")}>
          NYC
        </CustomLink>
        <CustomLink search={generateNewSearch("33.748752,-84.38768449999999")}>
          ATL
        </CustomLink>
        <CustomLink search={generateNewSearch("51.4679914,-0.455051")}>
          LHR
        </CustomLink>
      </div>
    </Card>
  );
}
