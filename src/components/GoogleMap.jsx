import React from 'react'
import config from '../config';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

export default function GoogleMap() {

    return (
        <>
            <div className='w-1/2 h-96'>
                <APIProvider apiKey={config.MAPS_API_KEY}>
                    <Map
                        className='w-full h-full'
                        defaultCenter={{lat: 41.744400, lng: -88.043900}}
                        defaultZoom={15}
                        center={{lat: 41.7362927, lng: -88.0403732}}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                    >
                        <Marker position={{lat: 41.7362927, lng: -88.0403732}} />
                    </Map>
                </APIProvider>
            </div>
            
        </>
    )
}