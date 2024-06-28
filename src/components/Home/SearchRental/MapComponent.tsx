import { FC,} from 'react';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";


interface MapComponentProps {
  latitude: number;
  longitude: number;
}

const MapComponent: FC<MapComponentProps> = ({ latitude, longitude }) => {
  return (
    <div className="w-full h-64">
      <MapContainer center={[latitude, longitude]} zoom={13} className="h-full w-full" scrollWheelZoom={true} preferCanvas={false} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
          detectRetina={true}
        />

        <Marker position={[latitude, longitude]}>
          <Popup>
            Ubicación seleccionada: {latitude}, {longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
