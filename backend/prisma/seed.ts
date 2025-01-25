import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.lending.deleteMany(),
    prisma.bookStatus.deleteMany(),
    prisma.book.deleteMany(),
    prisma.category.deleteMany(),
    prisma.member.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@library.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  const categories = await prisma.category.createMany({
    data: [
      { name: 'Fiction' },
      { name: 'Non-Fiction' },
      { name: 'Science' },
      { name: 'Technology' },
      { name: 'Business' },
    ],
  });

  const categoryIds = await prisma.category.findMany({
    select: { id: true },
  });

  const books = await Promise.all([
    prisma.book.create({
      data: {
        title: 'The Clean Coder',
        author: 'Robert C. Martin',
        isbn: '9780137081073',
        quantity: 5,
        categoryId: categoryIds[3].id, 
        createdBy: admin.id,
        publisher: 'Prentice Hall',
        publishYear: 2011,
        description: 'A guide to professional software development',
      },
    }),
    prisma.book.create({
      data: {
        title: 'Dune',
        author: 'Frank Herbert',
        isbn: '9780441172719',
        quantity: 3,
        categoryId: categoryIds[0].id, // Fiction
        createdBy: admin.id,
        publisher: 'Ace Books',
        publishYear: 1965,
        description: 'Science fiction masterpiece',
      },
    }),
  ]);

  // Create book status records
  await Promise.all(
    books.map((book) =>
      prisma.bookStatus.create({
        data: {
          bookId: book.id,
          availableQty: book.quantity,
          borrowedQty: 0,
        },
      })
    )
  );

  // Create members
  const members = await Promise.all([
    prisma.member.create({
      data: {
        userId: admin.id,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        joinedDate: new Date('2024-01-01'),
      },
    }),
    prisma.member.create({
      data: {
        userId: admin.id,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '0987654321',
        joinedDate: new Date('2024-01-15'),
      },
    }),
  ]);

  // Create lending records with different statuses and dates
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  const today = new Date();
  const inTwoWeeks = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

  await prisma.lending.createMany({
    data: [
      {
        bookId: books[0].id,
        memberId: members[0].id,
        borrowedDate: threeDaysAgo,
        dueDate: inTwoWeeks,
        status: 'BORROWED',
        createdBy: admin.id,
      },
      {
        bookId: books[1].id,
        memberId: members[1].id,
        borrowedDate: new Date('2024-01-15'),
        dueDate: new Date('2024-01-29'),
        returnDate: new Date('2024-01-28'),
        status: 'RETURNED',
        createdBy: admin.id,
      },
    ],
  });

  await prisma.bookStatus.update({
    where: { bookId: books[0].id },
    data: {
      availableQty: 4,
      borrowedQty: 1,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 