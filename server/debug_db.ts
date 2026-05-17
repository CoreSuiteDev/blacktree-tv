import prisma from './src/infrastructure/database/connection';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const users = await prisma.user.findMany({
    include: {
      accounts: true
    }
  });
  
  console.log('Database State:');
  users.forEach(user => {
    console.log(`User: ${user.email} (ID: ${user.id})`);
    console.log(`  Accounts: ${user.accounts.length}`);
    user.accounts.forEach(acc => {
      console.log(`    - Provider: ${acc.providerId}, Has Password: ${!!acc.password}`);
    });
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
