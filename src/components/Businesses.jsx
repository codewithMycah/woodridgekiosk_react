import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { MapPin, Phone, Link } from 'lucide-react'
import Searchbar from './Searchbar';

export default function Businesses() {
    const [businesses, setBusinesses] = useState([]);

    // Fetch businesses from backend
    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/businesses')
            setBusinesses(Array.isArray(response.data) ? response.data : [])
        } catch (error) {
            console.error('Error:', error.message)
        }
        };
    
    fetchData();
    }, []);

    // Helper to get image URL
    const getImageUrl = (image) => `http://127.0.0.1:5000/image/${image}`;

    return (
        <>
        
        <div className='flex flex-col p-6 mx-auto'>
            <Searchbar />
            <h1>Business Directory</h1>
            {businesses.length === 0 ? (
                <p>Loading businesses...</p>
            ) : (
            <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-6 gap-8 w-full'> 
                {businesses && businesses.map((business) => (
                    <li key={business._id} className='p-4 border border-gray-400 rounded-xl'>
                        <div className='h-60 w-full'>
                            {business.image ? (
                                <img className='rounded-md w-full h-full object-cover' src={getImageUrl(business.image)} alt={business.business_name} />
                            ) : (
                                <p>No Image Available</p>
                            )}
                        </div>
                        <div className='p-2 space-y-2'>
                            <h3 className='font-semibold text-xl'>{business.business_name}</h3>
                            <div className='flex gap-2'><MapPin /><p>{business.address}</p></div>
                            <div className='flex gap-2'><Phone /><p>{business.contact_number}</p></div>
                            {business.website_url !== 'none' && (
                                <div className='flex gap-2'>
                                    <Link />{business.website_url}
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            )}
        </div>
        </>
    )
}