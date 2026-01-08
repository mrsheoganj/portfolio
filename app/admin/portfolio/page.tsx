import { getPortfolioItems } from '@/app/actions';
import ProjectList from './project-list';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default async function PortfolioPage() {
  const projects = await getPortfolioItems();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Portfolio Manager</h1>
        <Link 
            href="/admin/portfolio/new" 
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
            <Plus size={18} />
            <span>Add Project</span>
        </Link>
      </div>
      
      <ProjectList projects={projects} />
    </div>
  );
}
