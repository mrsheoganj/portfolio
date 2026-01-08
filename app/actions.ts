'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// --- Site Config Actions ---

export async function getSiteConfig() {
  const configs = await prisma.siteConfig.findMany();
  const configMap: Record<string, string> = {};
  configs.forEach((c: any) => {
    configMap[c.key] = c.value;
  });
  return configMap;
}

export async function updateSiteConfig(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  
  for (const [key, value] of Object.entries(rawData)) {
    if (typeof value === 'string') {
      await prisma.siteConfig.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
  }

  revalidatePath('/');
  revalidatePath('/admin/content');
  return { success: true };
}

// --- Portfolio Actions ---

export async function getPortfolioItems() {
  return await prisma.portfolioItem.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function createPortfolioItem(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const category = formData.get('category') as string;

  if (!title || !imageUrl) {
    return { message: 'Title and Image URL are required' };
  }

  await prisma.portfolioItem.create({
    data: {
      title,
      description,
      imageUrl,
      category,
    },
  });

  revalidatePath('/');
  revalidatePath('/portfolio');
  revalidatePath('/admin/portfolio');
  return { message: 'Project created successfully' };
}

export async function updatePortfolioItem(id: string, prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const category = formData.get('category') as string;

  await prisma.portfolioItem.update({
    where: { id },
    data: {
      title,
      description,
      imageUrl,
      category,
    },
  });

  revalidatePath('/');
  revalidatePath('/portfolio');
  revalidatePath('/admin/portfolio');
  return { message: 'Project updated successfully' };
}

export async function deletePortfolioItem(id: string) {
  await prisma.portfolioItem.delete({
    where: { id },
  });

  revalidatePath('/');
  revalidatePath('/portfolio');
  revalidatePath('/admin/portfolio');
  return { success: true };
}
