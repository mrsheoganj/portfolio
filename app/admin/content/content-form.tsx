'use client';

import { useFormStatus } from 'react-dom';
import { updateSiteConfig } from '@/app/actions';
import { useState } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
    >
      {pending ? 'Saving...' : 'Save Changes'}
    </button>
  );
}

export default function ContentEditor({ config }: { config: Record<string, string> }) {
  const [message, setMessage] = useState('');

  async function clientAction(formData: FormData) {
      await updateSiteConfig(formData);
      setMessage('Content updated successfully!');
      setTimeout(() => setMessage(''), 3000);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Site Content</h1>
      {message && <div className="p-4 mb-4 bg-green-100 text-green-700 rounded-lg">{message}</div>}
      
      <form action={clientAction} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
        
        <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Hero Section</h2>
            <div className="grid gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
                    <input name="hero_title" defaultValue={config['hero_title']} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
                    <input name="hero_subtitle" defaultValue={config['hero_subtitle']} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" />
                </div>
            </div>
        </div>

        <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">About Section</h2>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">About Text</label>
                <textarea name="about_text" defaultValue={config['about_text']} rows={5} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" />
            </div>
        </div>

        <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Contact Info</h2>
             <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input name="contact_email" defaultValue={config['contact_email']} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                    <input name="social_linkedin" defaultValue={config['social_linkedin']} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                    <input name="social_instagram" defaultValue={config['social_instagram']} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" />
                </div>
            </div>
        </div>

        <div className="pt-4">
            <SubmitButton />
        </div>
      </form>
    </div>
  );
}
