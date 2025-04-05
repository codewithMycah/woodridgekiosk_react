import { useState } from 'react'
import { Menu, X, House, List, BadgePercent } from 'lucide-react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <nav className="bg-white shadow-md pt-8 md:pt-0">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-6">
                    <a href="/">
                        <img src="/src/assets/woodridge.svg" alt="Icon" className='w-36' />
                    </a>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-8 [&>li>a]:flex [&>li>a]:flex-row [&>li>a]:items-center [&>li>a]:gap-2 [&>li>a:hover]:hover:text-green-500">
                        <li><a href="/"><House /> Home</a></li>
                        <li><a href="#"><List /> Listings</a></li>
                        <li><a href="#"><BadgePercent /> Deals</a></li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={toggleMenu}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <ul className="md:hidden flex flex-col items-center space-y-2 p-4 [&>li>a]:flex [&>li>a]:flex-row [&>li>a]:items-center [&>li>a]:gap-2 [&>li>a:hover]:hover:text-green-500">
                        <li><a href="/" onClick={toggleMenu}><House /> Home</a></li>
                        <li><a href="#" onClick={toggleMenu}><List /> Listings</a></li>
                        <li><a href="#" onClick={toggleMenu}><BadgePercent /> Deals</a></li>
                    </ul>
                )}
            </nav>
        </>
    )
}