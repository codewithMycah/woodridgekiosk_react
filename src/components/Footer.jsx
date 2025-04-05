import React from 'react'

export default function Footer() {
    const YEAR = new Date().getFullYear()

    const LINKS = [
        {
          title: "About Us",
          href: "/aboutus",
        },
        {
          title: "Contact Us",
          href: "/contact",
        },
    ];

    return (
        <>
            <footer className='text-sm w-full gap-x-12 gap-y-3 border-t border-gray-400 border-surface py-4 text-center'>
                <div className='max-w-7xl flex flex-row flex-wrap items-center justify-center md:justify-between mx-auto'>
                    <div>&copy; {YEAR} Woodridge Kiosk</div>
                    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        {LINKS.map(({ title, href }) => (
                            <li key={title}>
                                <a href={href} className="hover:underline hover:underline-offset-8">{title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </footer>
        </>
    )
}