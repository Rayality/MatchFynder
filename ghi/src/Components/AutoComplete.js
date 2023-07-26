import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAutoLocation } from "../Redux/locationSlice";

const AutoComplete = () => {
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        componentRestrictions: { country: "us" },
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["geocode"]
    };
    const dispatch = useDispatch()
    useEffect(() => {
        let load = async () => {
            let google = window.google
        let { AutocompleteService } = await window.google.maps.importLibrary("places")
        autoCompleteRef.current = await new google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            const lat = place.geometry.location.lat()
            const lng = place.geometry.location.lng()
            dispatch(setAutoLocation(lat, lng))

            console.log(lat,lng);

        });
        }
        load();

    }, []);


    return (
        <div>
            <label>query :</label>
            <input id="autocomplete-text" type="text" size="50" placeholder="zip code, city, state" ref={inputRef} />
        </div>
    );
};
export default AutoComplete;
