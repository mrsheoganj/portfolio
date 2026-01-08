'use client';

import { useFormStatus } from 'react-dom';
import { createPortfolioItem } from '@/app/actions';
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-medium"
    >
      {pending ? 'Creating...' : 'Create Project'}
    </button>
  );
}

export default function NewProjectForm() {
    const [imageUrl, setImageUrl] = useState('');
    
    async function handleSubmit(formData: FormData) {
        if (!formData.get('imageUrl')) {
             if (imageUrl) {
                 formData.set('imageUrl', imageUrl);
             }
        }
        await createPortfolioItem(null, formData);
    }
    
    return (
        <form action={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6 max-w-2xl">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                <input name="title" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" placeholder="e.g. Minimalist Brand Identity" />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select name="category" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900">
                    <option value="Logo">Logo Design</option>
                    <option value="Branding">Branding</option>
                    <option value="Web Design">Web Design</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" rows={3} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" placeholder="Short description of the project..." />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
                
                {/* 
                  1. Uncomment this block to enable Cloudinary Upload
                  2. Remove the fallback <input> below
                */}
                
                {/* 
                <CldUploadWidget uploadPreset="portfolio_preset" onSuccess={(result) => {
                    // @ts-ignore
                    setImageUrl(result.info.secure_url);
                }}>
                    {({ open }) => {
                        return (
                            <button type="button" onClick={() => open()} className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm text-gray-700 transition">
                                Upload Image via Cloudinary
                            </button>
                        );
                    }}
                </CldUploadWidget>
                */}
                
                {/* Fallback Input - Remove if using Cloudinary */}
                <input 
                    name="imageUrl" 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)} 
                    placeholder="https://..." 
                    required={!imageUrl} 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" 
                />
                <p className="text-xs text-gray-500 mt-1">Paste an image URL (Unsplash, etc.) or configure Cloudinary in code to enable upload.</p>
                
                {imageUrl && (
                    <div className="mt-4">
                        <p className="text-xs text-gray-500 mb-1">Preview:</p>
                        <img src={imageUrl} alt="Preview" className="h-40 rounded object-cover border" />
                    </div>
                )}
            </div>

            <div className="pt-2">
                <SubmitButton />
            </div>
        </form>
    );
}
