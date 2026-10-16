import { prisma } from '../src/configs/prisma-client.config';

const branches = [
  {
    name: 'Perpustakaan Nasional',
    location: 'Jakarta Pusat',
  },
  {
    name: 'Perpustakaan Soekarno',
    location: 'Jakarta Pusat',
  },
  {
    name: 'Perpustakaan Soeharto',
    location: 'Jakarta Barat',
  },
];

async function main() {
  await prisma.branch.createMany({ data: branches });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });