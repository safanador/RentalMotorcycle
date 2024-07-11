import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./MapComponent'), { ssr: false })

interface MapComponentProps {
    latitude: number;
    longitude: number;
    address: string;
  }

function MapCaller({latitude,longitude, address}:MapComponentProps) {

    return <Map latitude={latitude} longitude={longitude} address={address} />
}

export default MapCaller
