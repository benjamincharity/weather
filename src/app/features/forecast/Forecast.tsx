import { Outlet } from "@tanstack/react-router";
import { SingleForecast } from "./SingleForecast.tsx";
import { useLocationQuery } from "@hooks/useLocationQuery.ts";
import { CompareLocationsLink } from "@ui/CompareLocationsLink.tsx";

export interface SearchState {
  location: string;
  location2?: string;
}

export interface AppRouterState {
  location: {
    hash: string;
    href: string;
    pathname: string;
    search: SearchState;
    searchStr: string;
  };
  state: SearchState;
}

const Forecast = () => {
  const { location1, setLocation, isCompareRoute } = useLocationQuery();

  return (
    <div className={"relative z-20 text-center h-full"}>
      <div
        className={`outline-4 outline-amber-600 grid grid-rows-1 grid-cols-2 h-full`}
      >
        <div
          className={`column-1 ${isCompareRoute ? "col-span-1" : "col-span-2"}`}
        >
          <SingleForecast
            header={
              !isCompareRoute && (
                <div className={"relative z-20 mb-4"}>
                  <CompareLocationsLink />
                </div>
              )
            }
            selectedLocation={location1}
            setSelectedLocation={setLocation}
          />
        </div>

        <div className={"column-2"}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Forecast;
