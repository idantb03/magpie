"use client"
import { Card, Flex, Text, ScrollArea } from "@radix-ui/themes";

export function MostBorrowedBooks() {
  const books = [
    { title: "The Great Gatsby", borrowCount: 42 },
    { title: "To Kill a Mockingbird", borrowCount: 38 },
    { title: "1984", borrowCount: 35 },
  ];

  return (
    <Card size="3" variant="surface">
      <Text as="div" size="4" weight="bold" mb="4">
        Most Borrowed Books
      </Text>
      <ScrollArea className="h-[300px]">
        <Flex direction="column" gap="3">
          {books.map((book, index) => (
            <Flex key={index} justify="between">
              <Text size="2">{book.title}</Text>
              <Text size="2" weight="bold">{book.borrowCount}</Text>
            </Flex>
          ))}
        </Flex>
      </ScrollArea>
    </Card>
  );
} 