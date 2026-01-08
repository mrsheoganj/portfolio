import { getPortfolioItems, getSiteConfig } from '@/app/actions';

export default async function AdminDashboard() {
  const projects = await getPortfolioItems();
  const config = await getSiteConfig();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Projects</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{projects.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Portfolio Views</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">1,234</p>
          <span className="text-xs text-green-500 mt-1 block">Placeholder Stat</span>
        </div>

         <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-sm text-white">
          <h3 className="text-blue-100 text-sm font-medium">Quick Action</h3>
          <p className="text-xl font-bold mt-2">Add New Project</p>
          <a href="/admin/portfolio/new" className="inline-block mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition">
            Create Now &rarr;
          </a>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Current Site Info</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                     <span className="text-sm text-gray-400">Hero Title</span>
                     <p className="font-medium">{config['hero_title'] || 'Not set'}</p>
                 </div>
                 <div>
                     <span className="text-sm text-gray-400">Contact Email</span>
                     <p className="font-medium">{config['contact_email'] || 'Not set'}</p>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
}
