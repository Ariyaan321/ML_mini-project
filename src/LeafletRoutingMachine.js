import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap, Marker, Popup } from "react-leaflet";
import PopupDetails from "./popupDetails"

const LeafletRoutingMachine = () => {
    const map = useMap();
    const [markers, setMarkers] = useState([]);
    const [popupLocation, setPopupLocation] = useState(null); // To store clicked location

    useEffect(() => {

        map.on("click", handleMapClick);

        return () => {
            map.off('click', handleMapClick)
        }
    }, [map]);


    const handleMapClick = (e) => {
        // Get the coordinates where the user clicked
        const { lat, lng } = e.latlng;
        // Set location to show PopupDetails
        // Create a new marker element
        const newMarker = (
            <Marker key={markers.length} position={[lat, lng]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        );
        // Update the markers state to include the new marker
        setMarkers([newMarker]);
        // reverseGeocode(lat, lng, "city3");
        setPopupLocation([lat, lng]);
    };
    // try here

    // Event handler for the 'routesfound' event
    const handleRoutesFound = (e) => {
        const waypoints = e.routes[0].waypoints;
        const latloc1 = waypoints[0].latLng.lat;
        const longloc1 = waypoints[0].latLng.lng;
        const latloc2 = waypoints[1].latLng.lat;
        const longloc2 = waypoints[1].latLng.lng;

        // Call the changeLoc function passing the event object
        changeLoc({
            routes: [
                {
                    waypoints: [
                        { latLng: { lat: latloc1, lng: longloc1 } },
                        { latLng: { lat: latloc2, lng: longloc2 } },
                    ],
                },
            ],
        });
    };

    // Function to handle location changes
    const changeLoc = (e) => {
        var waypoints = e.routes[0].waypoints;
        var latloc1 = waypoints[0].latLng.lat;
        var longloc1 = waypoints[0].latLng.lng;
        var latloc2 = waypoints[1].latLng.lat;
        var longloc2 = waypoints[1].latLng.lng;

        // Reverse geocoding for city1
        reverseGeocode(latloc1, longloc1, "city1");

        // Reverse geocoding for city2
        reverseGeocode(latloc2, longloc2, "city2");
    };

    // Reverse geocoding function
    const reverseGeocode = async (lat, lon, targetInputId) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            const data = await response.json();
            const locationName = data.display_name;

            // Update the DOM element with the obtained location information
            const targetInput = document.getElementById(targetInputId);
            if (targetInput) {
                targetInput.value = locationName;
            } else {
            }
        } catch (error) {
        }
    };

    return (
        <>
            {markers}
            {popupLocation ? <PopupDetails loc={popupLocation} /> : null}
        </>
    );


};

export default LeafletRoutingMachine;