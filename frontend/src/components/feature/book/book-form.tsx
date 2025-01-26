'use client'

import { Button, TextField, Flex } from '@radix-ui/themes'

export function BookForm({ book, onSubmit }: any) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Flex direction="column" gap="3">
        <TextField.Root placeholder="Book Title" defaultValue={book?.title} />
        <TextField.Root placeholder="Author" defaultValue={book?.author} />
        <TextField.Root placeholder="ISBN" defaultValue={book?.isbn} />
        <TextField.Root 
          type="date" 
          placeholder="Published Date" 
          defaultValue={book?.publishedDate} 
        />
        
        <Button type="submit">
          {book ? 'Update Book' : 'Create Book'}
        </Button>
      </Flex>
    </form>
  )
}