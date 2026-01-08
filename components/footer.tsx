export default function Footer() {
    return (
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Prashant Kumar. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-900 transition">
              <span className="sr-only">Instagram</span>
              {/* Icon placeholder */}
              IG
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 transition">
              <span className="sr-only">LinkedIn</span>
              LI
            </a>
          </div>
        </div>
      </footer>
    );
  }
