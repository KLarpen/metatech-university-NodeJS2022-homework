'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

async function main() {
  await prisma.role.createMany({
    data: [
      { name: 'admin' },
      { name: 'support' },
      { name: 'moderator' },
      { name: 'member' },
    ],
    skipDuplicates: true,
  });

  // Examples login/password
  // admin/123456
  // marcus/marcus
  // user/nopassword
  // iskandar/zulqarnayn

  const mainAccount = await prisma.account.upsert({
    where: { login: 'marcus' },
    update: {},
    create: {
      login: 'marcus',
      password:
        'dpHw0OUNBz76nuqrXZbeYQ==:wpvUVgi8Yp9rJ0yZyBWecaWP2EL/ahpxZY74KOVfhAYbAZSq6mWqjsQwtCvIPcSKZqUVpVb13JcSciB2fA+6Tg==',
    },
  });

  await prisma.account.createMany({
    data: [
      {
        login: 'admin',
        password:
          'ypMEd9FwvtlOjcvH94iICQ==:V6LnSOVwXzENxeLCJk59Toadea7oaA1IxYulAOtKkL9tBxjEPOw085vYalEdLDoe8xbrXQlhh7QRGzrSe8Bthw==',
      },
      {
        login: 'user',
        password:
          'r8zb8AdrlPSh5wNy6hqOxg==:HyO5rvOFLtwzU+OZ9qFi3ADXlVccDJWGSfUS8mVq43spJ6sxyliUdW3i53hOPdkFAtDn3EAQMttOlIoJap1lTQ==',
      },
      {
        login: 'iskandar',
        password:
          'aqX1O4bKXiwC/Jh2EKNIYw==:bpE4TARNg09vb2Libn1c00YRxcvoklB9zVSbD733LwQQFUuAm7WHP85PbZXwEbbeOVPIFHgflR4cvEmvYkr76g==',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.role.update({
    where: { name: 'admin' },
    data: {
      accounts: {
        connect: [{ login: 'admin' }, { accountId: mainAccount.accountId }],
      },
    },
  });
  await prisma.role.update({
    where: { name: 'support' },
    data: { accounts: { connect: [{ accountId: mainAccount.accountId }] } },
  });
  await prisma.role.update({
    where: { name: 'moderator' },
    data: { accounts: { connect: [{ login: 'iskandar' }] } },
  });
  await prisma.role.update({
    where: { name: 'member' },
    data: { accounts: { connect: [{ login: 'user' }] } },
  });

  const firstArea = await prisma.area.upsert({
    where: { name: 'Metarhia' },
    update: { ownerId: mainAccount.accountId },
    create: { name: 'Metarhia', ownerId: mainAccount.accountId },
  });

  const secondArea = await prisma.area.upsert({
    where: { name: 'Metaeducation' },
    update: { ownerId: mainAccount.accountId },
    create: { name: 'Metaeducation', ownerId: mainAccount.accountId },
  });

  for (const area of [firstArea, secondArea]) {
    await prisma.area.update({
      where: { areaId: area.areaId },
      data: {
        members: {
          connect: [
            { login: 'admin' },
            { accountId: mainAccount.accountId },
            { login: 'user' },
            { login: 'iskandar' },
          ],
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
