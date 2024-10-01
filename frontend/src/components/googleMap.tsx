import { useEffect } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;

declare global {
    interface Window {
        google: typeof google;
        initMap: () => void;
    }
}

const GoogleMap = () => {
    useEffect(() => {
        const initMap = () => {
            const location = { lat: -27.449911149532912, lng: -58.97721869777109 };
            const map = new window.google.maps.Map(document.getElementById("map") as HTMLElement, {
                zoom: 16,
                center: location,
            });
            new window.google.maps.Marker({
                position: location,
                map: map,
            });
        };

        window.initMap = initMap;

        const loadScript = () => {
            const existingScript = document.getElementById("google-maps-script");
            if (!existingScript) {
                const script = document.createElement("script");
                script.id = "google-maps-script";
                script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap&libraries=geometry,places&v=weekly`;
                script.async = true;
                script.defer = true;
                document.body.appendChild(script);
            } else if (window.google) {
                initMap();
            }
        };

        loadScript();
    }, []);

    return <div id="map" ></div>;
};

export default GoogleMap;
