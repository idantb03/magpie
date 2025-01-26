'use client'

import { Button, Dialog } from '@radix-ui/themes'
import { BookForm } from './book-form'

export function CreateBookButton() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Add New Book</Button>
      </Dialog.Trigger>
      
      <Dialog.Content>
        <Dialog.Title>Add New Book</Dialog.Title>
        <Dialog.Description>
          Fill in the details to add a new book to the library.
        </Dialog.Description>
        
        <BookForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}