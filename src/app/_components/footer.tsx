import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black px-4 py-6 text-white">
            <div className="flex w-full flex-col items-center justify-between text-center md:flex-row md:text-left">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-xl font-bold">Luxury Market</h2>
                </div>

                <nav className="mb-4 flex space-x-4 md:mb-0">
                    <a href="#" className="hover:text-gray-400">
                        Home
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        About
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        Services
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        Contact
                    </a>
                </nav>

                <div className="flex space-x-4">
                    <a href="#" className="hover:text-gray-400">
                        <Facebook size={20} />
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        <Twitter size={20} />
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        <Instagram size={20} />
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        <Linkedin size={20} />
                    </a>
                </div>
            </div>

            <div className="mt-4 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} Luxury Market. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
