// Mock DB Service
// Since Prisma generation is failing in this environment, I am creating a file-based mock service.
// This service will have the same interface as the Prisma calls I intended to make.
// I will also include the real Prisma code in comments or adjacent files so the user can switch.

import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'mock-db.json');

// Initial Data
const INITIAL_DATA = {
  users: [
    {
      id: 'admin-user',
      email: 'prashantkumarsheoganj@gmail.com',
      password: 'password', // Plain text for mock, but real app handles logic
      name: 'Prashant Kumar',
    }
  ],
  siteConfig: [
    { id: '1', key: 'hero_title', value: 'Creative Graphic Designer & Visual Artist' },
    { id: '2', key: 'hero_subtitle', value: 'Crafting minimal, unique, and attractive digital experiences.' },
    { id: '3', key: 'about_text', value: 'I am Prashant Kumar, a passionate graphic designer from Rajasthan, India. I specialize in branding, logo design, and web interfaces that leave a lasting impression.' },
    { id: '4', key: 'contact_email', value: 'prashantkumarsheoganj@gmail.com' },
    { id: '5', key: 'social_linkedin', value: '#' },
    { id: '6', key: 'social_instagram', value: '#' },
  ],
  portfolioItems: [
    {
      id: 'p1',
      title: 'Minimalist Brand Identity',
      description: 'A clean and modern identity for a tech startup.',
      imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2700',
      category: 'Branding',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'p2',
      title: 'Modern Logo Design',
      description: 'Geometric logo concept for an architecture firm.',
      imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b7993143a2d?auto=format&fit=crop&q=80&w=2700',
      category: 'Logo',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'p3',
      title: 'E-commerce Web Design',
      description: 'User-friendly interface for an online fashion store.',
      imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=2700',
      category: 'Web Design',
      createdAt: new Date().toISOString(),
    }
  ]
};

function readDb() {
  if (!fs.existsSync(path.dirname(DB_FILE))) {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2));
    return INITIAL_DATA;
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function writeDb(data: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

export const db = {
  user: {
    findUnique: async ({ where }: any) => {
      const data = readDb();
      return data.users.find((u: any) => u.email === where.email) || null;
    }
  },
  siteConfig: {
    findUnique: async ({ where }: any) => {
       const data = readDb();
       return data.siteConfig.find((c: any) => c.key === where.key) || null;
    },
    findMany: async () => {
      const data = readDb();
      return data.siteConfig;
    },
    upsert: async ({ where, update, create }: any) => {
      const data = readDb();
      const index = data.siteConfig.findIndex((c: any) => c.key === where.key);
      if (index >= 0) {
        // Update
        const updated = { ...data.siteConfig[index], ...update, updatedAt: new Date().toISOString() };
        data.siteConfig[index] = updated;
        writeDb(data);
        return updated;
      } else {
        // Create
        const newItem = { id: Math.random().toString(36).substr(2, 9), ...create, createdAt: new Date().toISOString() };
        data.siteConfig.push(newItem);
        writeDb(data);
        return newItem;
      }
    }
  },
  portfolioItem: {
    findMany: async ({ orderBy }: any) => {
      const data = readDb();
      // naive sort
      return data.portfolioItems.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
    create: async ({ data: itemData }: any) => {
      const data = readDb();
      const newItem = { 
        id: Math.random().toString(36).substr(2, 9), 
        ...itemData, 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      data.portfolioItems.push(newItem);
      writeDb(data);
      return newItem;
    },
    update: async ({ where, data: updateData }: any) => {
      const data = readDb();
      const index = data.portfolioItems.findIndex((p: any) => p.id === where.id);
      if (index >= 0) {
         const updated = { ...data.portfolioItems[index], ...updateData, updatedAt: new Date().toISOString() };
         data.portfolioItems[index] = updated;
         writeDb(data);
         return updated;
      }
      throw new Error('Item not found');
    },
    delete: async ({ where }: any) => {
       const data = readDb();
       const newItems = data.portfolioItems.filter((p: any) => p.id !== where.id);
       data.portfolioItems = newItems;
       writeDb(data);
       return { id: where.id };
    }
  }
};
