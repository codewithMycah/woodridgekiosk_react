// Libraries needed
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// json query
import { jsonquery } from '@jsonquerylang/jsonquery'

// backend URL 
import config from '../config';

// icons
import { MapPin, Phone, Link as LinkIcon, ArrowUpAZ, ListFilter } from 'lucide-react'
import { InfinitySpin } from 'react-loader-spinner'

export default function Businesses() {
    const [businesses, setBusinesses] = useState([]); // variable to store the data from backend
    const [filtered, setFiltered] = useState([]); // Filtered businesses
    const [searchQuery, setSearchQuery] = useState(""); // variable for search input
    const loading = false // loading icon visibility set initially to false

    // Fetch businesses data from backend (flask & python)
    useEffect(() => {
        const fetchData = async () => {
            try {
                // request data from backend
                const response = await axios.get(`${config.API_URL}/businesses`)
                // console.info(response.data)

                // store data from backend to businesses variable, check if data is an array
                setBusinesses(Array.isArray(response.data) ? response.data : [])
                
                // set initial data for the filtered variable
                setFiltered(response.data);
            } catch (error) {
                console.error('Error:', error.message)
            }
        };
        
        // call the fetchData function
        fetchData();
    }, []);

    // Helper to get image URL
    const getImageUrl = (image) => `${config.API_URL}/image/${image}`;

    // Handle search input and filter the data
    const handleSearch = (e) => {
        const query = e.target.value; // store value from user's input to query variable
        setSearchQuery(query);

        // Used filter function using jsonquery, however, filter is case-sensitive
        // const filteredBusinesses = jsonquery(businesses, `filter(regex(.business_name, "${query}") or regex(.business_category, "${query}"))`)
        // console.info('Output:', filteredBusinesses)
        // setFiltered(filteredBusinesses.length > 0 ? filteredBusinesses : []);

        // Filter businesses based on search query matching name or category
        // Used javascript .filter function
        const filteredBusinesses = businesses.filter((business) => 
            business.business_name.toLowerCase().includes(query.toLowerCase()) || 
            business.business_category.toLowerCase().includes(query.toLowerCase())
        );
        // set filtered variable
        setFiltered(filteredBusinesses.length > 0 ? filteredBusinesses : []);
    };

    // when sort button is clicked, this function will be triggered
    const btnSort = () => {
        // sort data by business name from A - Z
        const sortBusiness = jsonquery(businesses, `sort(.business_name, "asc")`)
        console.info(sortBusiness)
        setFiltered(sortBusiness.length > 0 ? sortBusiness : []);
    }

    return (
        <>
        
        <div className='max-w-7xl flex flex-col mx-auto py-4'>
            <div className='flex flex-row items-center justify-center text-sm text-gray-600 gap-4'>
                <div>
                    {/* Search Bar */}
                    <div className="flex px-4 py-1 rounded-md border-2 border-green-500 overflow-hidden max-w-lg mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
                            className="fill-gray-600 mr-3 rotate-90">
                            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                        </svg>
                        <input 
                            type="text"
                            placeholder="Search Something..." 
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full outline-none bg-transparent" />
                    </div>
                </div>
                <div>
                    {/* Sort Button */}
                    <button className='cursor-pointer flex flex-row items-center justify-center gap-2 px-4 py-1 rounded-lg border-2 border-gray-300 hover:scale-105 hover:border-green-500' onClick={btnSort}>
                        <ArrowUpAZ /> Sort
                    </button>
                </div>
                <div>
                    {/* Filter Button */}
                    <button className='cursor-pointer flex flex-row items-center justify-center gap-2 px-4 py-1 rounded-lg border-2 border-gray-300 hover:scale-105 hover:border-green-500' onClick={btnSort}>
                        <ListFilter /> Filter
                    </button>
                </div>
            </div>

            <h1 className='mx-auto text-3xl m-4 font-semibold text-green-800'>Business Directory</h1>
            {/* Filtered Business List */}
            {/* Check if filtered variable is empty or not */}
            {/* Shows string 'Loading business' otherwise it shows businesses data */}
            {filtered.length === 0 ? (
                <div className='flex flex-col h-screen items-center justify-center gap-2'>
                    <InfinitySpin
                        visible={!loading}
                        width="200"
                        color="#4fa94d"
                        ariaLabel="infinity-spin-loading"
                    />
                    <p className='font-mono'>Loading businesses...</p>
                </div>
            ) : (
                <ul className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-6 gap-4 w-full'>
                    {filtered.length > 0 ? (
                        filtered.map((business) => (
                            <li key={business._id} className='border border-gray-300 rounded-xl hover:scale-105'>
                                <div className='h-60 w-full'>
                                    {business.image ? (
                                        <Link to={`/business/${business._id}`}>
                                            <img className='rounded-xl w-full h-full object-cover' src={getImageUrl(business.image)} alt={business.business_name} />
                                        </Link>
                                    ) : (
                                        <p>No Image Available</p>
                                    )}
                                </div>
                                <div className='p-6 space-y-2'>
                                    <h3 className='font-semibold text-lg'>{business.business_name}</h3>
                                    <div className='flex gap-2'><MapPin /><p>{business.address}</p></div>
                                    <div className='flex gap-2'>
                                        <Phone /><p>{business.contact_number}</p>
                                    </div>
                                    {business.website_url !== 'none' && (
                                        <div className='flex gap-2 hover:text-green-800 hover:font-semibold'>
                                            {/* change the link format in mongodb */}
                                            <LinkIcon /><a href={business.website_url} target='_blank' rel='noopener noreferrer'>Website</a>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>No results found</li>
                    )}
                </ul>
            )}
        </div>
        </>
    )
}