import { useState, useEffect, useRef } from "react";
import type { WeatherLabeledGeo } from "@common/types/types.weather.ts";

export interface LocationAutocompleteProps {
  onSelection: (location: WeatherLabeledGeo) => void;
  value?: string;
}

export const LocationAutocomplete = ({
  onSelection,
  value = "",
}: LocationAutocompleteProps) => {
  const [input, setInput] = useState(() => value);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setInput(value);
  }, [value]);

  useEffect(() => {
    const inputElement = inputRef.current!;
    const autocomplete = new google.maps.places.Autocomplete(inputElement);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        setError("Unable to find location. Please try another address.");
        return;
      }
      const location: WeatherLabeledGeo = {
        label: place.formatted_address ?? "No label",
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      };
      onSelection?.(location);
      setInput(location.label);
    });
  }, []);

  return (
    <div>
      <label htmlFor="address-autocomplete" className="sr-only">
        Location:
      </label>
      <div className="flex rounded-lg shadow-sm relative">
        <input
          aria-describedby="hs-validation-name-error-helper"
          className="py-3 rounded-3xl ps-12 px-4 block w-full border-gray-200 shadow-sm rounded-0 text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
          id="address-autocomplete"
          name="hs-search-box-with-loading-3"
          onChange={(e) => {
            setError("");
            setInput(e.target.value);
          }}
          onFocus={(e) => {
            setError("");
            e.target.select();
          }}
          placeholder="Enter location.."
          ref={inputRef}
          required
          type="text"
          value={input}
        />
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
          <svg
            className={"w-[24px] h-[24px] fill-gray-400"}
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
          </svg>
        </div>
      </div>
      {!!error && (
        <div className={"w-full text-left"}>
          <p
            className="text-sm inline-block bg-white py-1 px-2 rounded-sm text-red-600 mt-2"
            id="hs-validation-name-error-helper"
          >
            ⚠️ {error}
          </p>
        </div>
      )}
    </div>
  );
};
