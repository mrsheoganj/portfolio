import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create default admin user
  // Password is "password" - In production, this should be hashed.
  
  await prisma.user.upsert({
    where: { email: 'prashantkumarsheoganj@gmail.com' },
    update: {},
    create: {
      email: 'prashantkumarsheoganj@gmail.com',
      name: 'Prashant Kumar',
      password: 'password', // Simple auth logic in lib/auth.ts does direct comparison for this starter
    },
  });

  // Initial Site Config
  const configs = [
    { key: 'hero_title', value: 'Creative Graphic Designer & Visual Artist' },
    { key: 'hero_subtitle', value: 'Crafting minimal, unique, and attractive digital experiences.' },
    { key: 'about_text', value: 'I am Prashant Kumar, a passionate graphic designer from Rajasthan, India. I specialize in branding, logo design, and web interfaces that leave a lasting impression.' },
    { key: 'contact_email', value: 'prashantkumarsheoganj@gmail.com' },
    { key: 'social_linkedin', value: '#' },
    { key: 'social_instagram', value: '#' },
  ];

  for (const config of configs) {
    await prisma.siteConfig.upsert({
      where: { key: config.key },
      update: {},
      create: config,
    });
  }

  // Initial Portfolio Items
  const portfolioItems = [
    {
      title: 'Minimalist Brand Identity',
      description: 'A clean and modern identity for a tech startup.',
      imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2700',
      category: 'Branding',
    },
    {
      title: 'Modern Logo Design',
      description: 'Geometric logo concept for an architecture firm.',
      imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b7993143a2d?auto=format&fit=crop&q=80&w=2700',
      category: 'Logo',
    },
    {
      title: 'E-commerce Web Design',
      description: 'User-friendly interface for an online fashion store.',
      imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=2700',
      category: 'Web Design',
    },
  ];

  for (const item of portfolioItems) {
    await prisma.portfolioItem.create({
      data: item,
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
