'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Project = {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    description: string;
};

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Work</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        filter === cat 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
                {filteredProjects.map((project) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        key={project.id}
                        className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-shadow bg-gray-50 aspect-[4/3]"
                    >
                        <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
                            <span className="text-blue-400 text-sm font-semibold mb-1">{project.category}</span>
                            <h3 className="text-white text-xl font-bold">{project.title}</h3>
                            <p className="text-gray-300 text-sm mt-2 line-clamp-2">{project.description}</p>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
        
        {filteredProjects.length === 0 && (
            <div className="text-center text-gray-500 py-12">
                No projects found in this category.
            </div>
        )}
      </div>
    </section>
  );
}
