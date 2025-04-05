import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

import GoogleMap from './GoogleMap';

// icons
import { MapPin, Frown, House } from 'lucide-react'

export default function BusinessDetails() {

    const { business_id } = useParams();
    const [business, setBusiness] = useState(null);

    // Fetch businesses from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${config.API_URL}/business/${business_id}`)
                // console.info(response.data)

                setBusiness(response.data)
            } catch (error) {
                console.error('Error:', error.error)
            }
        };
        
        fetchData();
    }, [business_id]); //Runs on the first render
    //And any time any dependency value changes

    // Helper to get image URL
    const getImageUrl = (image) => `${config.API_URL}/image/${image}`;

    if (!business) {
        return (
            <div className='flex flex-col h-screen items-center justify-center gap-2'>
                <Frown size={128}/>
                <h1 className='text-7xl font-bold'>404</h1>
                <span className='font-mono'>Page not found</span>
                <a href="/" className="text-white cursor-pointer flex flex-row items-center justify-center gap-2 px-4 py-1 rounded-lg bg-gray-400 border-2 border-gray-300 hover:scale-105 hover:border-green-500">
                    <House />Home
                </a>
            </div>
        )
    }

    return (
        <>
            {business && (
                <div className="hero bg-cover bg-center h-80 text-white" style={{ backgroundImage: `url(${getImageUrl(business.image)})` }}>
                    <div className="bg-linear-to-t from-black/50 to-black/10 h-full w-full">
                        <div className='flex flex-col items-start justify-end w-4xl lg:w-5xl xl:w-7xl mx-auto pb-8 h-full'>
                            <h1 className='text-3xl font-bold'>{business.business_name}</h1>
                            <h3 className='flex flex-row gap-2'><MapPin />{business.address}</h3>
                        </div>
                    </div>
                    <div className='max-w-7xl mx-auto'>
                        <GoogleMap></GoogleMap>
                    </div>
                </div>
            )}
        </>
    )
}