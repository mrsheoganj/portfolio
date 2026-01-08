import Link from 'next/link';
import { LayoutDashboard, FileText, Image, LogOut } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-500">Welcome, {session.user?.name}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/content"
            className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
          >
            <FileText size={20} />
            <span>Edit Content</span>
          </Link>
          <Link
            href="/admin/portfolio"
            className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
          >
            <Image size={20} />
            <span>Portfolio</span>
          </Link>
        </nav>
        <div className="p-4 border-t">
            <a href="/api/auth/signout" className="flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition">
                <LogOut size={20} />
                <span>Logout</span>
            </a>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
