import { useEffect, useRef } from "react";

const DEFAULT_CENTER = { lat: -27.451122108555772, lng: -58.97900497057584 };
const DEFAULT_ZOOM = 16;

const GoogleMaps = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        
        if (ref.current) {
        // Inicializar el mapa
        const map = new window.google.maps.Map(ref.current, {
            center: DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
        });

        // marcador
            new google.maps.Marker({
                position: DEFAULT_CENTER,
                map: map,
            });
        }

    }, []);

    return <div ref={ref} style={{ width: "300px", height: "200px" }} />;
};

export default GoogleMaps;
