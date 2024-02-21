import { useMemo } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { AppRouterState, SearchState } from "../features/forecast/Forecast.tsx";
import { WeatherGeoLocation } from "@common/types/types.weather.ts";
import { useValidateLatLong } from "@hooks/useValidateLatLong.ts";

/**
 * Hook to get and set the location query parameters.
 *
 * @returns - An object containing the location query parameters and functions to set them.
 */
export const useLocationQuery = () => {
  const state = useRouterState() as AppRouterState;
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(state.location.searchStr);
  const isCompareRoute = location.pathname.includes("compare");
  const location1 = searchParams.get("location");
  const location1Obj = useMemo(() => stringToLocation(location1), [location1]);
  const location2 = searchParams.get("location2");
  const location2Obj = useMemo(() => stringToLocation(location2), [location2]);

  useValidateLatLong(searchParams.get("location"));

  // Function to update URL with one location
  const setLocation = (newLocation: string | WeatherGeoLocation) => {
    if (typeof newLocation === "object") {
      newLocation = `${newLocation.latitude},${newLocation.longitude}`;
    }
    const existingSearch = new URLSearchParams(window.location.search);
    const loc2 = existingSearch.get("location2");
    const searchPayload: SearchState = {
      location: newLocation,
    };
    if (!!loc2) {
      searchPayload.location2 = loc2;
    }
    navigate({
      to: state.location.pathname,
      search: searchPayload,
      replace: true,
    });
  };

  // Function to update URL with two locations for compare
  const setLocationForCompare = (newLocation2: string | WeatherGeoLocation) => {
    if (typeof newLocation2 === "object") {
      newLocation2 = `${newLocation2.latitude},${newLocation2.longitude}`;
    }
    navigate({
      to: state.location.pathname,
      search: {
        location: location1,
        location2: newLocation2,
      },
      replace: true,
    });
  };

  return useMemo(
    () => ({
      location1: location1Obj,
      location2: location2Obj,
      setLocation,
      setLocationForCompare,
      isCompareRoute,
    }),
    [location1, location2, isCompareRoute],
  );
};

/**
 * Function to convert a string to a location object.
 *
 * @param str - The string to convert.
 * @returns - The converted location object.
 */
function stringToLocation(str: string | null): WeatherGeoLocation | null {
  if (!str) return null;
  const [latitude, longitude] = str.split(",");
  return latitude && longitude
    ? { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }
    : null;
}
