import prisma from './src/infrastructure/database/connection';

async function main() {
  const result = await prisma.user.deleteMany({});
  console.log('Deleted users:', result.count);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
