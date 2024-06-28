import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./MapComponent'), { ssr: false })

interface MapComponentProps {
    latitude: number;
    longitude: number;
  }

function MapCaller({latitude,longitude}:MapComponentProps) {

    return <Map latitude={latitude} longitude={longitude} />
}

export default MapCaller
