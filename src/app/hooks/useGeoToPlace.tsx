import { useState, useEffect } from "react";
import type {
  WeatherGeoLocation,
  WeatherLabeledGeo,
} from "@common/types/types.weather.ts";

/**
 * Hook to convert a geographical location to a place.
 *
 * @param weatherGeoLocation - The geographical location to convert.
 * @returns - The converted place.
 */
export function useGeoToPlace(weatherGeoLocation: WeatherGeoLocation | null): {
  location: WeatherLabeledGeo | null;
  error: Error | null;
} {
  const [location, setLocation] = useState<WeatherLabeledGeo | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isSubscribed = true;

    const geocoder = new google.maps.Geocoder();

    const reverseGeocode = (location: WeatherGeoLocation) => {
      const latLng = { lat: location.latitude, lng: location.longitude };
      geocoder.geocode({ location: latLng }, (results, status) => {
        const msg =
          status === "INVALID_REQUEST"
            ? "Invalid lat/long"
            : "Geocoder failed due to: " + status;
        if (
          status === google.maps.GeocoderStatus.OK &&
          !!results?.length &&
          results[0]
        ) {
          setError(null);
          if (isSubscribed) {
            const cityAndState = getCityAndState(results);
            setLocation({
              latitude: location.latitude,
              longitude: location.longitude,
              label: results[0].formatted_address,
              ...cityAndState,
            });
          }
        } else {
          console.error("Geocoder failed due to: " + status);
          setError(new Error(msg));
          if (isSubscribed) {
            setLocation(null);
          }
        }
      });
    };

    if (!!weatherGeoLocation) {
      reverseGeocode(weatherGeoLocation);
    }

    return () => {
      isSubscribed = false;
    };
  }, [weatherGeoLocation]);

  return { location, error };
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface ResponseItem {
  address_components: AddressComponent[];
  // Include other properties from your objects if necessary
}

/**
 * Function to get city and state from response data.
 *
 * @param data - The response data.
 * @returns - The city and state.
 */
function getCityAndState(
  data: ResponseItem[],
): { city: string; state: string } | null {
  const locationData = {
    city: "",
    state: "",
  };

  for (const item of data) {
    for (const component of item.address_components) {
      if (component.types.includes("locality")) {
        locationData.city = component.long_name;
      } else if (component.types.includes("administrative_area_level_1")) {
        locationData.state = component.short_name; // Use short_name for state abbreviation
      }

      // If both city and state have been found, no need to continue
      if (locationData.city && locationData.state) {
        return locationData;
      }
    }
  }

  // Return the found city and state, if any
  return locationData.city && locationData.state ? locationData : null;
}
