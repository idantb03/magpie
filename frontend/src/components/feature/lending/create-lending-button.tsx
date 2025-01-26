'use client'

import { Button, Dialog } from '@radix-ui/themes'
import { LendingForm } from './lending-form'

export function CreateLendingButton() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Lend Book</Button>
      </Dialog.Trigger>
      
      <Dialog.Content>
        <Dialog.Title>Lend a Book</Dialog.Title>
        <Dialog.Description>
          Fill in the details to lend a book to a borrower.
        </Dialog.Description>
        
        <LendingForm />
      </Dialog.Content>
    </Dialog.Root>
  )
} 