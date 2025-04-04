import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

// icons
import { MapPin } from 'lucide-react'

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
    }, [business_id]);

    // Helper to get image URL
    const getImageUrl = (image) => `${config.API_URL}/image/${image}`;

    if (!business) {
        return <div className='flex h-screen items-center justify-center text-3xl font-bold'>Business not found!</div>;
    }

    return (
        <>
            {business && (
                <div className="hero bg-cover bg-center h-80 text-white" style={{ backgroundImage: `url(${getImageUrl(business.image)})` }}>
                    <div className="bg-linear-to-t from-black/50 to-black/10 h-full w-full">
                        <div className='flex flex-col items-start justify-end min-w-4xl lg:w-5xl xl:w-7xl mx-auto pb-8 h-full'>
                            <h1 className='text-3xl font-bold'>{business.business_name}</h1>
                            <h3 className='flex flex-row gap-2'><MapPin />{business.address}</h3>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}