import React from 'react'
import heroImage from '../assets/bg_woodridge.jpg';

export default function Hero() {

    return (
        <>
            <section className="hero bg-cover bg-center h-80" style={{ backgroundImage: `url(${heroImage})` }}>
                <div className="flex items-center justify-center h-full bg-green-600/60">
                    <div className="text-center text-white flex flex-col items-center">
                        <img src="/src/assets/woodridge_icon_white.svg" alt="Icon" className='w-36' />
                        <p className="w-3xl mt-4 text-lg md:text-xl">Discover local businesses and hidden gems in Woodridge – your go-to kiosk for connecting with the best shops, services, and more!</p>
                        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Get Started
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}