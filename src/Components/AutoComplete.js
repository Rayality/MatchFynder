import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAutoLat, setAutoLng } from "../Redux/locationSlice";

const AutoComplete = () => {
    const [invalid, setInvalid] = useState(false)
    const dispatch = useDispatch()
    const autoCompleteRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        let load = async () => {
            const options = {
                componentRestrictions: { country: "us" },
                fields: ["address_components", "geometry", "name"],
                types: ["geocode"]
            };
            let google = window.google
            await google.maps.importLibrary("places");
            autoCompleteRef.current = await new google.maps.places.Autocomplete(
                inputRef.current,
                options
            );
            autoCompleteRef.current.addListener("place_changed", async function () {
                const place = await autoCompleteRef.current.getPlace();
                if (place !== undefined && place.hasOwnProperty('geometry')) {
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();
                    dispatch(setAutoLat(lat))
                    dispatch(setAutoLng(lng))
                } else {
                    setInvalid(true)
                }
            }
            );
        }
        load();
    }, [dispatch]);
    return (
        <div>
            <label>Select Location :</label>
            <input id="autocomplete-text" className={invalid ? "form-control is-invalid" : "form-control"} type="text" placeholder="Select a location from zip/city/state" ref={inputRef} />
        </div>
    );
};
export default AutoComplete;
