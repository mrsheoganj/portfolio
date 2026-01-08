import Link from 'next/link';
import { getSiteConfig } from '@/app/actions';

export default async function Navbar() {
  const config = await getSiteConfig();
  const brandName = config['hero_title'] ? 'Prashant.' : 'Portfolio.';

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900 tracking-tight">
              P<span className="text-blue-600">.</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="#home" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition">Home</Link>
              <Link href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition">About</Link>
              <Link href="#portfolio" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition">Portfolio</Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition">Contact</Link>
            </div>
          </div>
          <div>
            <Link 
                href="/contact" 
                className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
            >
                Hire Me
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
