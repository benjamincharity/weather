import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";

/**
 * Validates a given latitude and longitude string.
 *
 * @param latLongString - The latitude and longitude string to validate.
 * @returns - Returns true if the latitude and longitude string is valid, otherwise false.
 */
export function useValidateLatLong(latLongString: string | null): boolean {
  const navigate = useNavigate();
  function handleError() {
    toast.error("Invalid lat/long", {
      id: "invalid-lat-long",
    });
    navigate({ to: "/forecast", replace: true, search: false });
    return false;
  }
  if (!latLongString) {
    return true;
  }
  const latitude = latLongString?.split(",")[0];
  const longitude = latLongString?.split(",")[1];
  if (!latitude || !longitude) {
    return handleError();
  }

  const latPattern = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
  const longPattern = /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

  const result = !(!latPattern.test(latitude) || !longPattern.test(longitude));
  if (!result) {
    return handleError();
  }

  return true;
}
