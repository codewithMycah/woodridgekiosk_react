import React from 'react'
import Businesses from '../components/Businesses'
import Hero from '../components/Hero'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

export default function Home() {

    return (
        <>
            <Hero />
            <div className='flex'>
                <Sidebar />
                <Businesses />
            </div>
            <Footer />
        </>
    )
}