import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <nav className="bg-white shadow-md pt-8 md:pt-0">
                <div className="container mx-auto flex items-center justify-between px-4 py-6">
                    <a href="#">
                        <img src="/src/assets/woodridge.svg" alt="Icon" className='w-36' />
                    </a>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-8">
                        <li><a href="/" className="hover:text-blue-500">Home</a></li>
                        <li><a href="#" className="hover:text-blue-500">Listings</a></li>
                        <li><a href="#" className="hover:text-blue-500">Categories</a></li>
                        <li><a href="#" className="hover:text-blue-500">Deals</a></li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={toggleMenu}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <ul className="md:hidden flex flex-col items-center space-y-4 p-4">
                        <li><a href="/" className="hover:text-blue-500" onClick={toggleMenu}>Home</a></li>
                        <li><a href="#" className="hover:text-blue-500" onClick={toggleMenu}>Listings</a></li>
                        <li><a href="#" className="hover:text-blue-500" onClick={toggleMenu}>Categories</a></li>
                        <li><a href="#" className="hover:text-blue-500" onClick={toggleMenu}>Deals</a></li>
                    </ul>
                )}
            </nav>
        </>
    )
}