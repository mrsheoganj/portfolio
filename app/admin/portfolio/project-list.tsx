'use client';

import { useFormStatus } from 'react-dom';
import { deletePortfolioItem } from '@/app/actions';
import { Trash2, Edit } from 'lucide-react';

function DeleteButton({ id }: { id: string }) {
    const { pending } = useFormStatus();
    
    return (
        <button 
            disabled={pending}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
            title="Delete Project"
        >
            <Trash2 size={18} />
        </button>
    );
}

export default function ProjectList({ projects }: { projects: any[] }) {
    const handleDelete = async (id: string) => {
        await deletePortfolioItem(id);
    };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-600">Image</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Title</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Category</th>
            <th className="p-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50 transition">
              <td className="p-4">
                <img src={project.imageUrl} alt={project.title} className="w-16 h-12 object-cover rounded" />
              </td>
              <td className="p-4 font-medium text-gray-900">{project.title}</td>
              <td className="p-4 text-gray-500">{project.category}</td>
              <td className="p-4 text-right flex justify-end gap-2">
                <form action={handleDelete.bind(null, project.id)}>
                    <DeleteButton id={project.id} />
                </form>
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
              <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">No projects found. Add one!</td>
              </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
