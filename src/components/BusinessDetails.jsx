import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

export default function BusinessDetails() {

    const { business_id } = useParams();
    const [business, setBusiness] = useState(null);

    // Fetch businesses from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${config.API_URL}/business/${business_id}`)
                console.info(response.data)

                setBusiness(response.data)
            } catch (error) {
                console.error('Error:', error.message)
            }
            };
        
        fetchData();
    }, [business_id]);

    if (!business) {
        return <div>Business not found!</div>;
    }

    return (
        <>
            {business && (
                <div>
                    <h1>{business.business_name}</h1>
                    <h1>{business.business_category}</h1>
                </div>
            )}
        </>
    )
}