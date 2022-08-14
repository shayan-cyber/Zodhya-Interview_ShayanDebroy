import React from "react";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

function PlacesSearch({ changeLatLon, isStart , changeFormattedAddress}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        // console.log("Coordinates: ", { lat, lng });
        console.log(results[0]);
        changeLatLon(lat, lng, isStart);
        changeFormattedAddress(results[0].formatted_address, isStart);

      });
    };

  const renderSuggestions = () => (
    <div className="p-2 border-2 rounded-md shadow-lg">
      {data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
          <li
            className="text-lg font-medium"
            key={place_id}
            onClick={handleSelect(suggestion)}
          >
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      })}
    </div>
  );

  return (
    <div className="w-full">
      <div ref={ref} className="w-full">
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          //   placeholder="Where are you going?"
          className="w-full bg-gray-100 border-2 focus:outline-none border-blue-200 rounded-md p-2"
        />
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === "OK" && <ul>{renderSuggestions()}</ul>}
      </div>
    </div>
  );
}

export default PlacesSearch;
